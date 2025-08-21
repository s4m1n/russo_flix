import { useState, useEffect } from "react";
import { WatchlistContext } from "./WatchlistContext";
import { useFirestore } from "../services/firestore";
import { useAuth } from "./useAuth";

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { addToWatchlist: addToFirestore, removeFromWatchlist: removeFromFirestore, getWatchlist, checkIfInWatchlist, clearWatchlist: clearFirestoreWatchlist } = useFirestore();

  // Load watchlist from Firestore when user changes
  useEffect(() => {
    const loadWatchlist = async () => {
      if (user?.uid) {
        try {
          setIsLoading(true);
          const firestoreWatchlist = await getWatchlist(user.uid);
          setWatchlist(firestoreWatchlist || []);
        } catch (error) {
          console.error('Error loading watchlist from Firestore:', error);
          setWatchlist([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setWatchlist([]);
        setIsLoading(false);
      }
    };

    loadWatchlist();
  }, [user, getWatchlist]);

  const addToWatchlist = async (movie) => {
    if (!user?.uid) {
      console.error('User not authenticated');
      return false;
    }

    try {
      await addToFirestore(user.uid, movie.id.toString(), movie);
      // Refresh watchlist from Firestore
      const updatedWatchlist = await getWatchlist(user.uid);
      setWatchlist(updatedWatchlist || []);
      return true;
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      return false;
    }
  };

  const removeFromWatchlist = async (movieId) => {
    if (!user?.uid) {
      console.error('User not authenticated');
      return false;
    }

    try {
      await removeFromFirestore(user.uid, movieId.toString());
      // Refresh watchlist from Firestore
      const updatedWatchlist = await getWatchlist(user.uid);
      setWatchlist(updatedWatchlist || []);
      return true;
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      return false;
    }
  };

  const isInWatchlist = async (movieId) => {
    if (!user?.uid) return false;
    try {
      return await checkIfInWatchlist(user.uid, movieId.toString());
    } catch (error) {
      console.error('Error checking watchlist:', error);
      return false;
    }
  };

  const clearWatchlist = async () => {
    if (!user?.uid) return false;
    try {
      await clearFirestoreWatchlist(user.uid);
      setWatchlist([]);
      return true;
    } catch (error) {
      console.error('Error clearing watchlist:', error);
      return false;
    }
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    clearWatchlist,
    watchlistCount: watchlist.length,
    isLoading
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};
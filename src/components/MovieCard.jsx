import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWatchlist } from "../context/useWatchlist";
import { useAuth } from "../context/useAuth";
import { useToast } from "../context/useToast";
import TrailerPopup from "./TrailerPopup";

const MovieCard = ({
  movie: { id, title, vote_average, poster_path, release_date },
}) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { user } = useAuth();
  const { showWarning, showSuccess } = useToast();
  const [isInList, setIsInList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverTimeout, setHoverTimeout] = useState(null);

  useEffect(() => {
    const checkWatchlistStatus = async () => {
      if (user?.uid) {
        try {
          const inList = await isInWatchlist(id);
          setIsInList(inList);
        } catch (error) {
          console.error("Error checking watchlist status:", error);
        }
      } else {
        setIsInList(false);
      }
    };

    checkWatchlistStatus();
  }, [id, user, isInWatchlist]);

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });

    const timeout = setTimeout(() => {
      setShowPopup(true);
    }, 500);

    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setShowPopup(false);
  };

  const handleWatchlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      showWarning("Please login to add movies to your watchlist");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      if (isInList) {
        const success = await removeFromWatchlist(id);
        if (success) {
          setIsInList(false);
          showSuccess(`"${title}" removed from your watchlist!`);
        }
      } else {
        const success = await addToWatchlist({
          id,
          title,
          vote_average,
          poster_path,
          release_date,
        });
        if (success) {
          setIsInList(true);
          showSuccess(`"${title}" added to your watchlist!`);
        }
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link
        to={`/movie/${id}`}
        className="movie-card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/no-movie.png"
          }
          alt={title}
        />

        <div className="mt-4">
          <h3>{title}</h3>

          <div className="content">
            <div className="rating">
              <p>⭐ {vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            </div>

            <span>•</span>
            <p className="year">
              {release_date ? release_date.split("-")[0] : "N/A"}
            </p>

            <div>
              <button
                onClick={handleWatchlistClick}
                disabled={isLoading}
                className={`watchlist-btn text-white w-full px-3 py-2 rounded-full flex items-center justify-center transition-colors text-sm font-bold cursor-pointer ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : isInList
                    ? "bg-gradient-to-r from-red-400 to-red-600 hover:from-red-700 hover:to-red-800"
                    : "bg-gradient-to-r from-purple-800 to-blue-800 hover:from-purple-900 hover:to-blue-900"
                }`}
                title={
                  isLoading
                    ? "Loading..."
                    : isInList
                    ? "Remove from Watchlist"
                    : "Add to Watchlist"
                }
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isInList ? "Removing..." : "Adding..."}</span>
                  </div>
                ) : isInList ? (
                  "- Remove"
                ) : (
                  "+ Watchlist"
                )}
              </button>
            </div>
          </div>
        </div>
      </Link>

      <TrailerPopup
        movie={{ id, title, vote_average, poster_path, release_date }}
        isVisible={showPopup}
        position={mousePosition}
      />
    </>
  );
};
export default MovieCard;

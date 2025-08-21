import { useAuth } from "../context/useAuth";
import { useWatchlist } from "../context/useWatchlist";
import MovieCard from "../components/MovieCard";

const Watchlist = () => {
  const { user } = useAuth();
  const { watchlist, clearWatchlist } = useWatchlist();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please Login</h2>
          <p className="text-gray-400">
            You need to be logged in to view your watchlist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">My Watchlist</h1>

        {watchlist.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">
                {watchlist.length} movie{watchlist.length !== 1 ? "s" : ""} in
                your watchlist
              </p>
              <button
                onClick={clearWatchlist}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors text-sm cursor-pointer font-bold"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {watchlist.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Your watchlist is empty
            </h3>
            <p className="text-gray-400 mb-6">
              Start adding movies to your watchlist by clicking the "+" button
              on movie cards.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-black rounded-2xl transition-colors font-bold"
            >
              Browse Movies
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;

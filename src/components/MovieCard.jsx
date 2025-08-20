import { Link } from "react-router-dom";

const MovieCard = ({
  movie: {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
  },
}) => {
  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement watchlist functionality
    console.log(`Added ${title} to watchlist`);
  };

  return (
    <div className="movie-card">
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
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>•</span>
          <p className="lang">{original_language}</p>

          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>

          <div className="movie-actions ml-4 flex gap-2">
            <Link
              to={`/movie/${id}`}
              className="details-btn bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors text-sm font-bold"
              title="View Details"
            >
              i
            </Link>
            <button
              onClick={handleWatchlistClick}
              className="watchlist-btn bg-[#AB8BFF] hover:bg-[#AB8BFF] text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors text-sm font-bold cursor-pointer"
              title="Add to Watchlist"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;

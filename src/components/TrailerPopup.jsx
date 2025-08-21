import { useState, useEffect } from "react";
import { API_BASE_URL, API_OPTIONS } from "../config/api";

const TrailerPopup = ({ movie, isVisible, position }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isVisible && movie?.id) {
      fetchMovieData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, movie?.id]);

  const fetchMovieData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/movie/${movie?.id}?append_to_response=videos`,
        API_OPTIONS
      );

      if (!response.ok) throw new Error("Failed to fetch movie data");

      const data = await response.json();
      setMovieDetails(data);

      const trailer = data.videos?.results?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      setTrailerKey(trailer?.key || null);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible || !movie) return null;

  const popupStyle = {
    position: "fixed",
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: "translate(-50%, -100%)",
    zIndex: 1000,
  };

  return (
    <div
      className="trailer-popup bg-dark-100 rounded-xl shadow-2xl border border-gray-700 p-4 w-200 max-w-sm"
      style={popupStyle}
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {trailerKey ? (
            <div className="relative mb-3">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                className="w-full h-60 rounded-lg"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`${movie.title} Trailer`}
              />
            </div>
          ) : (
            <div className="bg-gray-800 h-40 rounded-lg flex items-center justify-center mb-3">
              <p className="text-gray-400 text-sm">No trailer available</p>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-white font-bold text-lg line-clamp-2">
              {movie.title}
            </h3>

            {movieDetails && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-yellow-400 font-semibold">
                    ⭐ {movieDetails.vote_average?.toFixed(1) || "N/A"}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">
                    {movieDetails.release_date?.split("-")[0] || "N/A"}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">
                    {movieDetails.runtime
                      ? `${movieDetails.runtime}min`
                      : "N/A"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {movieDetails.genres?.slice(0, 3).map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-purple-400 text-white text-xs px-2 py-1 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TrailerPopup;

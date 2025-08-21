import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useWatchlist } from "../context/useWatchlist";
import { useAuth } from "../context/useAuth";
import { useToast } from "../context/useToast";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInList, setIsInList] = useState(false);
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { user } = useAuth();
  const { showWarning, showSuccess } = useToast();

  // Check if movie is in watchlist
  useEffect(() => {
    const checkWatchlistStatus = async () => {
      if (user?.uid && movie?.id) {
        try {
          const inList = await isInWatchlist(movie.id);
          setIsInList(inList);
        } catch (error) {
          console.error("Error checking watchlist status:", error);
        }
      } else {
        setIsInList(false);
      }
    };

    checkWatchlistStatus();
  }, [user, movie, isInWatchlist]);

  const fetchMovieDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/${id}?append_to_response=credits,videos`,
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setError("Failed to load movie details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <Link
          to="/"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen w-full text-white">
      <div
        className="min-h-screen flex flex-col p-8 rounded-2xl relative"
        style={{
          backgroundImage: movie.backdrop_path
            ? `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${BACKDROP_BASE_URL}${movie.backdrop_path})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow:
            "0px 12px 32px 0px #CECEFB05 inset, 0px 0px 100px 0px #AB8BFF4D",
        }}
      >
        {/* Back Arrow Button */}
        <Link
          to="/"
          className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
          title="Go Back"
        >
          <img src="/back-arrow.svg" alt="Back" className="w-6 h-6" />
        </Link>
        {/* Movie Header */}
        <div className="my-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="flex justify-center items-center gap-2 mb-4 text-gray-300">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            {movie.runtime && (
              <>
                <span className="text-gray-500">•</span>
                <span>{formatRuntime(movie.runtime)}</span>
              </>
            )}
            <span className="text-gray-500">•</span>
            <span className="flex items-center gap-1 text-yellow-400">
              <img src="/star.svg" alt="Rating" className="w-4 h-4" />
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10 (
              {movie.vote_count || 0})
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {movie.genres &&
              movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-opacity-10 bg-gray-100 text-white px-3 py-2 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            {/* Watchlist Button */}
            <div>
              <button
                onClick={async () => {
                  if (!user) {
                    showWarning("Please login to add movies to your watchlist");
                    return;
                  }

                  if (isWatchlistLoading) return;

                  setIsWatchlistLoading(true);
                  try {
                    if (isInList) {
                      const success = await removeFromWatchlist(movie.id);
                      if (success) {
                        setIsInList(false);
                        showSuccess(
                          `"${movie.title}" removed from your watchlist!`
                        );
                      }
                    } else {
                      const success = await addToWatchlist({
                        id: movie.id,
                        title: movie.title,
                        vote_average: movie.vote_average,
                        poster_path: movie.poster_path,
                        release_date: movie.release_date,
                      });
                      if (success) {
                        setIsInList(true);
                        showSuccess(
                          `"${movie.title}" added to your watchlist!`
                        );
                      }
                    }
                  } catch (error) {
                    console.error("Error updating watchlist:", error);
                  } finally {
                    setIsWatchlistLoading(false);
                  }
                }}
                disabled={isWatchlistLoading}
                className={`px-3 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center justify-center gap-2 min-w-[200px] ${
                  isWatchlistLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : isInList
                    ? "bg-gradient-to-r from-red-400 to-red-600 hover:from-red-700 hover:to-red-800 text-white"
                    : "bg-gradient-to-r from-purple-800 to-blue-800 hover:from-purple-900 hover:to-blue-900 text-white"
                }`}
                title={
                  isWatchlistLoading
                    ? "Loading..."
                    : isInList
                    ? "- Remove from Watchlist"
                    : "+ Add to Watchlist"
                }
              >
                {isWatchlistLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isInList ? "Removing..." : "Adding..."}</span>
                  </>
                ) : isInList ? (
                  "- Remove from Watchlist"
                ) : (
                  "+ Add to Watchlist"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Poster and Trailer Side by Side */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Movie Poster */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            {movie.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full max-w-[250px] lg:max-w-[300px] rounded-lg shadow-lg"
              />
            ) : (
              <img
                src="/no-movie.png"
                alt="No poster available"
                className="w-full max-w-[250px] lg:max-w-[300px] rounded-lg shadow-lg"
              />
            )}
          </div>

          {/* Trailer Section */}
          {movie.videos &&
            movie.videos.results &&
            movie.videos.results.length > 0 && (
              <div className="flex-grow">
                {/* <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">
                  Trailer
                </h2> */}
                <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${
                      movie.videos.results.find(
                        (video) =>
                          video.type === "Trailer" && video.site === "YouTube"
                      )?.key || movie.videos.results[0].key
                    }`}
                    title={`${movie.title} Trailer`}
                    className="w-full h-full"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                </div>
              </div>
            )}
        </div>

        {/* Movie Content */}
        <div className="mb-8">
          {/* Movie Info */}
          <div>
            {/* Overview Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Storyline</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Release date</h3>
                <p>
                  {movie.release_date
                    ? new Date(movie.release_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm mb-1">Countries</h3>
                <p>
                  {movie.production_countries
                    ? movie.production_countries
                        .map((country) => country.name)
                        .join(" • ")
                    : "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm mb-1">Status</h3>
                <p>{movie.status || "N/A"}</p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm mb-1">Language</h3>
                <p>
                  {movie.spoken_languages
                    ? movie.spoken_languages
                        .map((lang) => lang.english_name)
                        .join(" • ")
                    : "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm mb-1">Budget</h3>
                <p>
                  {movie.budget
                    ? `$${(movie.budget / 1000000).toFixed(1)} million`
                    : "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm mb-1">Revenue</h3>
                <p>
                  {movie.revenue
                    ? `$${(movie.revenue / 1000000).toFixed(0)} Million`
                    : "N/A"}
                </p>
              </div>

              {movie.tagline && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Tagline</h3>
                  <p>{movie.tagline}</p>
                </div>
              )}

              <div>
                <h3 className="text-gray-400 text-sm mb-1">
                  Production Companies
                </h3>
                <p>
                  {movie.production_companies
                    ? movie.production_companies
                        .map((company) => company.name)
                        .join(" • ")
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Cast Section */}
            {movie.credits &&
              movie.credits.cast &&
              movie.credits.cast.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Cast</h2>
                  <div className="flex flex-wrap gap-6">
                    {movie.credits.cast.slice(0, 5).map((actor) => (
                      <div key={actor.id} className="min-w-[150px]">
                        <p className="font-bold mb-1">{actor.name}</p>
                        <p className="text-gray-400 text-sm">
                          {actor.character}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;

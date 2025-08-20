import { useState, useEffect } from "react";
import Search from "./Search";
import Spinner from "./Spinner";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function Home() {
  const navigate = useNavigate();

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [trendingMovies, setTrendingMovies] = useState([]);

  const fetchMovies = async (query) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrendingMovies = async (timeWindow = "day") => {
    const endpoint = `${API_BASE_URL}/trending/all/${timeWindow}?api_key=${API_KEY}`;
    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    setTrendingMovies(data.results.slice(0, 10) || []);
  };

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <>
      <header>
        <img src="./hero.png" alt="Hero Banner" />
        <h1>
          Find <span className="text-gradient">Movies</span> You'll Enjoy
          Without the Hassle
        </h1>
      </header>

      {trendingMovies && trendingMovies.length > 0 && (
        <section className="trending">
          <h2>Global Top 10 Movies</h2>

          <ul>
            {trendingMovies.map((movie, index) => (
              <li
                key={movie.$id || `trending-${index}`}
                className="cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <p>{index + 1}</p>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : "/no-movie.png"
                  }
                  alt={movie.title || "Movie"}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <section className="all-movies">
        <h2 className="mt-[20px]">All Movies</h2>

        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <ul>
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default Home;

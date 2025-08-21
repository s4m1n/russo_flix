import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import TrendingMovieCard from "../components/TrendingMovieCard";
import { API_BASE_URL, API_KEY, API_OPTIONS } from "../config/api";

function Home() {
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [trendingMovies, setTrendingMovies] = useState([]);

  const fetchMovies = async (page = 1) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;
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
      setTotalPages(Math.min(data.total_pages || 1, 500)); // Limit to 500 pages for performance
      setCurrentPage(page);
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

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

          <TrendingMovieCard movies={trendingMovies} />
        </section>
      )}

      <section className="all-movies">
        <div className="flex justify-between items-center mt-[20px] mb-6">
          <h2>All Movies</h2>
          <div className="text-gray-400 text-sm">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <>
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </>
  );
}

export default Home;

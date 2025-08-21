import { useState, useEffect } from "react";
import Search from "../components/Search";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";

import { API_BASE_URL, API_OPTIONS } from "../config/api";

function SearchPage() {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (query, page = 1) => {
    if (!query.trim()) {
      setMovieList([]);
      setHasSearched(false);
      setCurrentPage(1);
      setTotalPages(1);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setHasSearched(true);

    try {
      const endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&page=${page}`;
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
      setTotalPages(Math.min(data.total_pages || 1, 500));
      setCurrentPage(page);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) {
      setCurrentPage(1);
    }
    fetchMovies(
      debouncedSearchTerm,
      debouncedSearchTerm !== searchTerm ? 1 : currentPage
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      fetchMovies(debouncedSearchTerm, currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <header className="text-center mb-8">
        <h1 className="mb-4">
          Search <span className="text-gradient">Movies</span>
        </h1>
        <p className="text-gray-300 text-lg">
          Discover your next favorite movie from thousands of titles
        </p>
      </header>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <section className="all-movies">
        {!hasSearched && !searchTerm && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              Start typing to search for movies...
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : errorMessage ? (
          <div className="text-center py-16">
            <p className="text-red-500 text-lg">{errorMessage}</p>
          </div>
        ) : hasSearched && movieList.length === 0 && searchTerm ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No movies found for "{searchTerm}". Try a different search term.
            </p>
          </div>
        ) : movieList.length > 0 ? (
          <>
            <div className="flex justify-between items-center mt-[20px] mb-6">
              <h2>Search Results for "{searchTerm}"</h2>
              <div className="text-gray-400 text-sm">
                Page {currentPage} of {totalPages}
              </div>
            </div>
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
        ) : null}
      </section>
    </div>
  );
}

export default SearchPage;

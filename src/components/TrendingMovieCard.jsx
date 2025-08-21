import { useNavigate } from "react-router-dom";

const TrendingMovieCard = ({ movies }) => {
  const navigate = useNavigate();

  return (
    <>
      <ul>
        {movies.map((movie, index) => (
          <li
            key={movie?.id || `trending-${index}`}
            className="cursor-pointer"
            onClick={() => navigate(`/movie/${movie?.id}`)}
          >
            <p>{index + 1}</p>
            <img
              src={
                movie?.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
                  : "/no-movie.png"
              }
              alt={movie?.title || "Movie"}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TrendingMovieCard;

import { useLocation } from "react-router";
import { NavLink, Outlet } from "react-router-dom";
import "../style.css";

function MovieDetailsPage() {
  const location = useLocation();
  const movie = location.state?.movie || {
    id: "defaultId",
    title: "Default Title",
  };

  return (
    <div>
      {" "}
      <NavLink to="/movies">
        <button className="button back">Back</button>
      </NavLink>{" "}
      <div className="movieDetail">
        {" "}
        <img
          className="image"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <span>Release Date:</span> {movie.release_date}
          </p>
          <p>
            <span>Rating:</span> {movie.vote_average}
          </p>
          <p>
            <span>Language:</span> {movie.original_language}
          </p>
        </div>
        <div className="componentsButtons">
          <NavLink to={`/movies/${movie.id}/reviews`} state={{ movie }}>
            <button className="button">Reviews</button>
          </NavLink>
          <NavLink to={`/movies/${movie.id}/cast`} state={{ movie }}>
            <button className="button">Cast</button>
          </NavLink>
          <Outlet />
        </div>
        <br />
      </div>
    </div>
  );
}

export default MovieDetailsPage;

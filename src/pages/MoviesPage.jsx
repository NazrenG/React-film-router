import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "../style.css";
import { NavLink } from "react-router-dom";
function MoviesPage() {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [page, setPage] = useState(1);
  const fetchMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=75d57e9716ab196a930bbcff01b2c422&page=${page}`
    );
    if (response.data.results) {
      setList(response.data.results);
    } else {
      setList([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies();

    setIsCheck(true);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, isCheck]);

  return (
    <div>
      <NavLink to="/">
        <button className="button back">Back</button>
      </NavLink>
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Search movies"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />{" "}
        <button type="submit" className="button">
          <FaSearch />
        </button>
      </form>
      <ul className="list">
        {list.map((item) => (
          <li className="card" key={item.id}>
            <NavLink to={`/movies/${item.id}`} state={{ movie: item }}>
              <div className="card_div">
                <img
                  className="card_img"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                />
                <h4>
                  {item.title} ({item.release_date})
                </h4>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
      <div
        className="pageButtons"
        style={isCheck ? { display: "block" } : { display: "none" }}
      >
        <button
          className="button"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button className="button" onClick={() => setPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default MoviesPage;

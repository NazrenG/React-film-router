import { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";
import { NavLink } from "react-router-dom";

function HomePage() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const data = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=75d57e9716ab196a930bbcff01b2c422&page=${page}`
      );
      if (response.data.results) {
        setList(response.data.results);
      } else {
        setList([]);
      }
    };
    data();
  }, [page]);

  return (
    <div>
      <div className="header">
        {" "}
        <NavLink to="/movies">
          <button className="button">Search movie</button>
        </NavLink>
        <h1>Popular Movies</h1>
      </div>
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
      <div className="pageButtons">
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

export default HomePage;

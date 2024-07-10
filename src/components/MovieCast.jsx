import axios from "axios";

import { useLocation } from "react-router";
import { useEffect, useState } from "react";

function MovieCast() {
  const [list, setList] = useState([]);

  const location = useLocation();
  const movie = location.state.movie;

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=75d57e9716ab196a930bbcff01b2c422`
      );
      if (data.cast) {
        setList(data.cast);
      } else {
        setList([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setList([]);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <ul className="list">
      {list.map((item) => (
        <li className="card" key={item.id}>
          <div className="card_div ">
            {item.profile_path && (
              <img
                className="card_img"
                src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                alt={item.profile_path}
              />
            )}
            <div>
              {" "}
              <h4>{item.original_name}</h4>
              <p>{item.character}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;

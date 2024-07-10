import axios from "axios";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

function MovieReviews() {
  const [list, setList] = useState([]);

  const location = useLocation();
  const movie = location.state.movie;

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=75d57e9716ab196a930bbcff01b2c422`
      );
      if (data.results) {
        setList(data.results);
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
    <ul className="review_list">
      {list.map((item) => (
        <li className="review_card" key={item.id}>
          <div className="card_div review">
            {item.author_details.avatar_path && (
              <img
                className="card_img"
                src={`https://image.tmdb.org/t/p/w500${item.author_details.avatar_path}`}
                alt={item.author}
              />
            )}
            <div>
              {" "}
              <h2>
                {item.author_details.name || item.author_details.username}
              </h2>
              <p>{item.content}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;

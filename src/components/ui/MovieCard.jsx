import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addWatchList, delWatchList } from "../../features/movies/moviesSlice";

const BASE_URL = "https://image.tmdb.org/t/p/original/";
export default function MovieCard({ movie, isWatchList = false }) {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <div className="image-container">
        <img src={BASE_URL + movie.poster_path} alt="" className="poster" />
      </div>
      <h1 className="title">{movie.original_title}</h1>
      <p className="desc">{movie.overview.substring(0, 100) + "..."}</p>
      <div className="removeWatchListDiv">
        <p className="release-date">Release Date: {movie.release_date}</p>
        <button className="delBtn" onClick={() => dispatch(delWatchList(movie))} style={{ display: isWatchList ? "flex" : "none" }}>
          Remove
        </button>
      </div>
      <div className="card-actions">
        <button onClick={() => dispatch(addWatchList(movie))}>Add To Watchlist</button>
        <Link to={"/details/" + movie.id}>
          <button>View Details</button>
        </Link>
      </div>
    </div>
  );
}

export { BASE_URL };

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addWatchList, delWatchList, getDetails } from "../features/movies/moviesSlice";
import { BASE_URL } from "./ui/MovieCard";

export default function Details() {
  const dispatch = useDispatch();
  const params = useParams();
  const { movieDetails, watchList } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getDetails(params.id));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="details-container">
      {!movieDetails ? (
        <h2 className="center">Loading...</h2>
      ) : (
        <>
          <div className="left">
            <img src={BASE_URL + movieDetails.poster_path} alt={movieDetails.title} className="movie-poster" />
          </div>
          <div className="right">
            <h1 className="title">{movieDetails.original_title}</h1>
            <p className="desc">{movieDetails.overview}</p>
            <div className="removeDetailsDiv">
              <p className="release-date">Release Date: {movieDetails.release_date}</p>
              <button className="delBtn" onClick={() => dispatch(delWatchList(movieDetails))} style={{ display: watchList.every((ele) => ele.id !== movieDetails.id) ? "none" : "flex" }}>
                Remove from Watchlist
              </button>
            </div>
            <button onClick={() => dispatch(addWatchList(movieDetails))}>Add to Watchlist</button>
          </div>
        </>
      )}
    </div>
  );
}

import React from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { clearWatchList, moviesListCreate } from "../features/movies/moviesSlice";

export default function Layout(props) {
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="navbar">
        <h1 className="logo" onClick={() => dispatch(moviesListCreate(1))}>
          Movkraft
        </h1>

        <div className="actions">
          <button
            onClick={() => {
              dispatch(clearWatchList());
            }}
          >
            Clear WatchList
          </button>
          <Link to="/">Home</Link>
          <Link to="/watchlist">Watchlist</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

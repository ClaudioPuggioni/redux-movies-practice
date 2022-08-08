import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { moviesListCreate } from "../features/movies/moviesSlice";
import Details from "./Details";
import Layout from "./Layout";
import MovieList from "./MovieList";
import Watchlist from "./Watchlist";

export default function Main() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(moviesListCreate());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MovieList />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="details/:id" element={<Details />} />
        </Route>
      </Routes>
    </div>
  );
}

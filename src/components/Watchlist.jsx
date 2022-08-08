import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./ui/MovieCard";

export default function Watchlist() {
  const watchList = useSelector((state) => state.movies.watchList);

  return <div className="list-container">{watchList.length === 0 ? <h1>No movies to watch yet...</h1> : watchList.map((movie, idx) => <MovieCard key={`watchList${idx}`} movie={movie} isWatchList={true} />)}</div>;
}

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moviesListCreate } from "../features/movies/moviesSlice";
import MovieCard from "./ui/MovieCard";

export default function MovieList() {
  let [pos, setPos] = useState(-77);
  const { moviesList, loading, error, currentPage } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const jumpInput = useRef();

  return (
    <div className="list-container">
      <div id="navControls">
        <button id="beforeBtn" onClick={() => (currentPage - 1 >= 1 ? dispatch(moviesListCreate(currentPage - 1)) : null)}></button>
        <button id="afterBtn" onClick={() => dispatch(moviesListCreate(currentPage + 1))}></button>

        <div
          id="jumpTo"
          onClick={() => {
            jumpInput.current.value = "";
            setPos(-10);
          }}
          style={{ right: pos }}
          onMouseLeave={() => setPos(-77)}
        >
          <div id="jumpToHeader">Jump To Page</div>
          <input
            ref={jumpInput}
            id="jumpToNum"
            type="number"
            step="1"
            placeholder="Num#"
            onKeyDown={(e) => {
              if (["Enter", "NumpadEnter"].includes(e.key)) {
                e.preventDefault();
                dispatch(moviesListCreate(e.target.value));
              }
            }}
            onChange={(e) => {
              if (e.target.value < 1) e.target.value = 1;
              if (e.target.value > 500) e.target.value = 500;
            }}
            min="1"
            max="500"
          />
        </div>
      </div>
      {loading && !error ? <h1>loading...</h1> : moviesList.map((movie, idx) => <MovieCard key={`movieList${idx}`} movie={movie} />)}
      {error !== null && <p>{error}</p>}
    </div>
  );
}

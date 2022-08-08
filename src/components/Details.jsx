import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './ui/MovieCard';

export default function Details() {
    const [movie, setMovie] = useState(null);
    const params = useParams();
    const API_URL = `https://api.themoviedb.org/3/movie/${params.id}?api_key=9b153f4e40437e115298166e6c1b997c`;
    

    let getData = () => {
        fetch(API_URL).then(data => data.json()).then(data => setMovie(data));
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className='details-container'>
            {movie === null
                ? <h2 className="center">Loading...</h2>
                :
                <>
                    <div className="left">
                        <img src={BASE_URL + movie.poster_path} alt={movie.title} className="movie-poster" />
                    </div>
                    <div className="right">
                        <h1 className="title">{movie.original_title}</h1>
                        <p className="desc">{movie.overview}</p>
                        <p className="release-date">Release Date: {movie.release_date}</p>
                        <button>Add to Watchlist</button>
                    </div>
                </>
            }
        </div>
    )
}

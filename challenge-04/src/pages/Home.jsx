import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { ArrowRight } from "react-bootstrap-icons";

import { fetchPopularMovies } from '../services/tmdb';
import Nav from "../components/Nav";
import Main from "../components/Main";

const Home = () => {
    /* init state */
    const [popularMovies, setPopularMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetchPopularMovies().then((result) => {
            setPopularMovies(result);
        })
    }, []);

    /* movie list */
    const MovieList = () => {
        /* condition selects whether searched movies or popular movies (default) */
        const filteredMovies = searchResults.length > 0 ? searchResults : popularMovies;
        /* movie item */
        return filteredMovies.map((movie, i) => {
            return (
                <div className="movie-wrapper" key={i}>
                    <Link to={`/detail-movie/${movie.id}`} key={i}>
                        <img className="movielist-img" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                    </Link>
                </div>
            )
        })
    };

    /* search handler */
    const handleSearchMovie = (results) => {
        setSearchResults(results);
    };

    return (
        <>
            <div className="app">
                {/* Home #1 */}
                <section className="app-header">
                    <Nav searchQuery={handleSearchMovie} />
                    <Main />             
                </section>
                {/* Home #2 */}
                <section className="app-body">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h2 className="text-start">Popular Movie</h2>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h4 className="text-end">See All Movies<ArrowRight className="icon-arrow"></ArrowRight></h4>
                        </div>
                    </div>
                    <div className="movie-container">
                        <MovieList />
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home;
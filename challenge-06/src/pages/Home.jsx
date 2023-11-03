import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { ArrowRight } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";

import Nav from "../components/Nav";
import Main from "../components/Main";
import Alt from "../components/Alt";
import Footer from "../components/Footer";
import { getMovies } from "../Redux/Actions/postActions";

const Home = () => {
    // To set the state of the store
    const dispatch = useDispatch();

    // Access the store to get posts and search results
    const { posts } = useSelector((state) => state.post);
    const { Search } = useSelector((state) => state.post);
    // Access the Redux store to check if the user is logged in
    const { isLoggedIn } = useSelector((state) => state.auth);
    
    // Initialize state for search results
    const [searchResults, setSearchResults] = useState([]);
    
    // Fetch movies from the server when the component mounts
    useEffect(() => {
        dispatch(getMovies());
    }, [dispatch]);

    // Define a function to render the list of movies
    const MovieList = () => {
        // Conditionally select between searched movies and popular movies (default)
        const filteredMovies = searchResults.length > 0 ? Search : posts;
        if (!filteredMovies) {
            return null;
        }
        // Render each movie item
        return filteredMovies.map((post, i) => {
            return (
                <div className="movie-wrapper" key={i}>
                    <Link to={`/detail-movie/${post.id}`} key={i}>
                        <img className="movielist-img" src={`https://image.tmdb.org/t/p/w500/${post.poster_path}`} />
                    </Link>
                </div>
            );
        });
    };

    // Define a function to handle movie search results
    const handleSearchMovie = (results) => {
        setSearchResults(results);
    };

    return (
        <>
            {isLoggedIn ? (
                <>
                    {/* Render content for logged-in users */}
                    <div className="app">
                        {/* Home #1 */}
                        <section className="app-header">
                            <Main />             
                            <Nav searchQuery={handleSearchMovie} />
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
                ) : (
                <>
                    {/* Render content for users who are not logged in */}
                    <div className="app">
                        {/* Home #1 */}
                        <section className="app-header">
                            <Alt />
                            <Nav searchQuery={handleSearchMovie} />
                        </section>
                    </div> 
                </>
            )}
            <section>
                <Footer />
            </section>
        </>
    )
}

export default Home;
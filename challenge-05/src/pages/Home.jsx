import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { ArrowRight } from "react-bootstrap-icons";

import { fetchPopularMovies } from '../services/Api';
import Nav from "../components/Nav";
import Main from "../components/Main";
import Alt from "../components/Alt";
import Footer from "../components/Footer";

const Home = () => {
    /* init state */
    const [popularMovies, setPopularMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const getToken = async () => {
            try {
                const token = localStorage.getItem("token");

                // show popular movies with token
                if (token) {
                    setIsLoggedIn(true);
                    fetchPopularMovies(token).then((result) => {
                        setPopularMovies(result);
                    })
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                  // If not valid token
                  if (error.response.status === 401) {
                    localStorage.removeItem("token");
                    // Temporary solution
                    return (window.location.href = "/");
                  }
        
                  toast.error(error.response.data.message);
                  return;
                }
                toast.error(error.message);
              }
        }
        
        getToken();
    }, []);

    /* movie list */
    const MovieList = () => {
        // condition selects whether searched movies or popular movies (default)
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
            {isLoggedIn ? (
                <>
                    {/* App after logged in as an user */}
                    <div className="app">
                        {/* Home #1 */}
                        <section className="app-header">
                            <Main token={localStorage.getItem("token")} />             
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
                    {/* App without login */}
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
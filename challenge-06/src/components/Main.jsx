import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getMovies } from "../Redux/Actions/postActions";

// Function to shuffle an array randomly
const shuffleArray = (array) => {
    // Create a shallow copy of the array
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements in the copy array
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

const Main = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.post);

    // Fetch movies from the server
    useEffect(() => {
        dispatch(getMovies());
    }, [dispatch]);

    // Shuffle the array of movies and select the first 3 for the carousel
    const shuffledPosts = shuffleArray(posts).slice(0,3);

    return (
        <>
            <Carousel className="carousel" controls={false}>
                {shuffledPosts.map((post, index) => (
                    <Carousel.Item className="carousel-item" key={index}>
                        <Link to={`/detail-movie/${post.id}`}>
                            <img
                                className="movie-img"
                                src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${post.poster_path}`}
                                alt={post.title}
                            />
                            <Carousel.Caption className="movie-caption">
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <h3 className="movie-caption-title">{post.title}</h3>
                                        <p className="movie-caption-overview">{post.overview}</p>
                                        <button className="btn-trailer" variant="danger">
                                            Watch Trailer
                                        </button>
                                    </div>
                                    <div className="col-sm-12 col-md-6"></div>
                                </div>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
};

export default Main;

import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

import { fetchPopularMovies } from "../services/tmdb";

/* randomizer */
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const Main = () => {
    /* init state */
    const [carouselItems, setCarouselItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchPopularMovies();
            const randomizedData = shuffleArray(data);
            setCarouselItems(randomizedData.slice(0, 3)); // Limit to 3 items
        }
        fetchData();
    }, []);

    return (
        <>
        <Carousel className="carousel" controls={false}>
            {carouselItems.map((movie, index) => (
                <Carousel.Item className="carousel-item" key={index}>
                    <Link to={`/detail-movie/${movie.id}`}>
                        <img
                            className="movie-img"
                            src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.poster_path}`}
                            alt={movie.title}
                        />
                    <Carousel.Caption className="movie-caption">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <h3 className="movie-caption-title">{movie.title}</h3>
                                <p className="movie-caption-overview">{movie.overview}</p>
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

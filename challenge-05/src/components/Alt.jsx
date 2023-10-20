import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

import { fetchPopularMoviesNoToken } from "../services/Api";

/* randomizer */
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const Alt = () => {
    /* init state */
    const [carouselItems, setCarouselItems] = useState([]);

    useEffect(() => {
        // randomize popular movies (api without token)
        async function fetchData() {
            const data = await fetchPopularMoviesNoToken();
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
                        <img
                            className="movie-img"
                            src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <Carousel.Caption className="movie-caption">
                            <h3>Please login or register first to see all movies.</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
};

export default Alt;

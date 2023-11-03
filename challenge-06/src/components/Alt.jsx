import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

import { fetchPopularMoviesNoToken } from "../services/Api";

// Function to shuffle an array randomly
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const Alt = () => {
    // Initialize state for carousel items
    const [carouselItems, setCarouselItems] = useState([]);

    // Fetch random popular movies (API without authentication)
    useEffect(() => {
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

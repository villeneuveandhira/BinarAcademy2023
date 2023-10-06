import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

import { fetchDetailMovie } from "../services/tmdb";

const Detail = () => {
    /* init state */
    const [detailMovie, setDetailMovie] = useState({});
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                /* fetch detail data with movie 'id'*/
                const data = await fetchDetailMovie(params.id);
                setDetailMovie(data);
            } catch (error) {
                alert(error);
            }
        }
        fetchData();
    }, [params]);

    return (
        <>
            <Carousel controls={false}>
                <Carousel.Item className="carousel-item">
                    <img
                        className="movie-img"
                        src={`https://image.tmdb.org/t/p/original${detailMovie?.backdrop_path}`}
                        alt={detailMovie.title}
                    />
                    <Carousel.Caption className="movie-caption">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <h2 className="movie-caption-title">{detailMovie?.title}</h2>
                                <p className="movie-caption-genre">
                                    {detailMovie?.genres &&
                                    detailMovie?.genres?.length > 0 &&
                                    detailMovie?.genres?.map((genre, i) => {
                                        return i === detailMovie?.genres.length - 1
                                            ? genre.name
                                            : `${genre.name}, `;
                                        })}
                                </p>
                                <p className="movie-caption-overview">{detailMovie?.overview}</p>
                                <p className="movie-rate">
                                    {detailMovie?.vote_average
                                        ? detailMovie.vote_average.toFixed(1)
                                        : "-"}
                                </p>
                                <button className="btn-trailer" variant="danger">
                                    Watch Trailer
                                </button>
                            </div>
                            <div className="col-sm-12 col-md-6"></div>
                            <Link to="/">
                                <button className="btn-home" variant="danger">
                                    Back to Home
                                </button>
                            </Link>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
}

export default Detail;
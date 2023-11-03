import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getPostDetails } from "../Redux/Actions/postActions";

const Detail = () => {
    // Access the Redux store to dispatch actions and get post details
    const dispatch = useDispatch();

    // Get the 'id' parameter from the route
    const {id} = useParams();
    
    // Access the Redux store to get post details
    const {postDetails} = useSelector((state) => state.post)

    // Fetch post details when the component mounts or 'id' changes
    useEffect(() => {
        dispatch(getPostDetails(id))
    }, [dispatch, id]);

    return (
        <>
            <Carousel controls={false}>
                <Carousel.Item className="carousel-item">
                    <img
                        className="movie-img"
                        src={`https://image.tmdb.org/t/p/original${postDetails?.backdrop_path}`}
                        alt={postDetails?.title}
                    />
                    <Carousel.Caption className="movie-caption">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <h2 className="movie-caption-title">{postDetails?.title}</h2>
                                <p className="movie-caption-genre">
                                    {postDetails?.genres &&
                                    postDetails?.genres?.length > 0 &&
                                    postDetails?.genres?.map((genre, i) => {
                                        return i === postDetails?.genres.length - 1
                                            ? genre.name
                                            : `${genre.name}, `;
                                        })}
                                </p>
                                <p className="movie-caption-overview">{postDetails?.overview}</p>
                                <p className="movie-rate">
                                    {postDetails?.vote_average
                                        ? postDetails.vote_average.toFixed(1)
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
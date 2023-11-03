import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from '../pages/Login';
import Register from "../pages/Register";
import Dashboard from "../pages/users/Dashboard";
import { logout, getMe } from "../Redux/Actions/authActions";
import { getMovieSearch } from "../Redux/Actions/postActions";

const Nav = ({ searchQuery }) => {
    // Access the Redux store to dispatch actions and get post details
    const dispatch = useDispatch();

    // Access the Redux store to check if the user is logged in
    const { isLoggedIn } = useSelector((state) => state.auth);

    // State to handle search input and popup visibility
    const [input, setInput] = useState('')
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);

    // Fetch user details when the component mounts
    useEffect(() => {
        dispatch(getMe(null, null, null));
    }, [dispatch]);

    // Fetch movie search results based on input changes
    useEffect(() => {
        dispatch(getMovieSearch(input))
    }, [dispatch, input]);
    
    // Define a function to handle movie search
    const search = (q) => {
        if (q.length > 0) {
            setInput(q);
            searchQuery(q);
        }
    };

    return (
        <nav className="navbar-wrapper">
            <div className="navbar-brand">
                <Link to="/">
                    <button>Movielist</button>
                </Link>
            </div>
            <input
                className="movie-search"
                placeholder="What do you want to watch?"
                type="text"
                onChange={({ target }) => search(target.value)}
            />
            <div className="button-wrapper">
                {isLoggedIn ? (
                    <>
                        <button
                            className="btn-login"
                            onClick={() => setShowDashboard(true)}
                        >User</button>
                        <Link
                            onClick={() => {
                                dispatch(logout(window.location.href = "/"))
                            }}
                        >
                            <button className="btn-register">Logout</button>
                        </Link>
                    </>
                    ) : (
                    <>
                        <button
                            className="btn-login"
                            onClick={() => setShowLogin(true)}
                        >Login</button>
                        <button
                            className="btn-register"
                            onClick={() => setShowRegister(true)}
                        >Register</button>
                    </>
                )}
            </div>
            {/* Popup Login/Register/Dashboard User */}
            {showLogin && (
                <div className="overlay">
                    <div className="popup">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <h3>Log In to Your Account</h3>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <button
                                    className="popup-close-button"
                                    onClick={() => setShowLogin(false)}
                                >X</button>
                            </div>
                        </div>
                        <Login />
                    </div>
                </div>
            )}
            {showRegister && (
                <div className="overlay">
                    <div className="popup">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <h3>Create Account</h3>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <button
                                    className="popup-close-button"
                                    onClick={() => setShowRegister(false)}
                                >X</button>
                            </div>
                        </div>
                        <Register />
                    </div>
                </div>
            )}
            {showDashboard && (
                <div className="overlay">
                    <div className="popup">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <h3>User</h3>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <button
                                    className="popup-close-button"
                                    onClick={() => setShowDashboard(false)}
                                >X</button>
                            </div>
                        </div>
                        <Dashboard />
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Nav;
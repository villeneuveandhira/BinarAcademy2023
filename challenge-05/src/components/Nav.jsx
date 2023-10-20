import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { searchMovie } from "../services/Api";
import Login from '../pages/Login';
import Register from "../pages/Register";
import NoTokenAccess from "../components/NoTokenAccess";
import Protected from "../components/Protected";
import Dashboard from "../pages/users/Dashboard";

const Nav = ({ searchQuery }) => {
    /* init state */
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (token) {
          setIsLoggedIn(true);
          setToken(token);
        }
    }, []);

    /* define search  */
    const search = async (q) => {
        if (q.length > 3) {
            try {
                const query = await searchMovie(q, token);
                searchQuery(query.data);
            } catch (error) {
                console.error("Search failed:", error);
            }
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
                                localStorage.removeItem("token");
                                setIsLoggedIn(false);
                                window.location.href = "/";
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
                        <NoTokenAccess>
                            <Login />
                        </NoTokenAccess>
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
                        <NoTokenAccess>
                            <Register />
                        </NoTokenAccess>
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
                        <Protected>
                            <Dashboard />
                        </Protected>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Nav;
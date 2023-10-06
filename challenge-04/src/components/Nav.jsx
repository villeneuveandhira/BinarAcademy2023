import { Link } from "react-router-dom";

import { searchMovie } from "../services/tmdb";

const Nav = ({ searchQuery }) => {
    /* define search  */
    const search = async (q) => {
        if (q.length > 3) {
            const query = await searchMovie(q);
            searchQuery(query.results);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <div className="navbar-brand">
                    <Link to="/">
                        <button>Movielist</button>
                    </Link>
                </div>
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="sidebar offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header mx-3">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel"></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item mx-3">
                                <input
                                    className="movie-search"
                                    placeholder="What do you want to watch?"
                                    type="text"
                                    onChange={({ target }) => search(target.value)}
                                />
                            </li>
                            <li className="nav-item mx-3">
                                <button className="btn-login">Login</button>
                            </li>
                            <li className="nav-item mx-3">
                                <button className="btn-register">Register</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
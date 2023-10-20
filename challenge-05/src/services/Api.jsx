import axios from 'axios';

/* searching */
export const searchMovie = async (query, token) => {
    try {
        const search = await axios.get(`${import.meta.env.VITE_API}/v1/search/movie?page=1&query=${query}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return search.data;
    } catch (error) {
        throw error;
    }
}

/* fetch popular movie's data from api */
export const fetchPopularMovies = async (token) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API}/v1/movie/popular`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

/* fetch detailed movie's data */
export const fetchDetailMovie = async (movieId, token) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API}/v1/movie/${movieId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

/* fetch popular movie's data from api without token (no login) */
export const fetchPopularMoviesNoToken = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?page=1&api_key=${import.meta.env.VITE_API_KEY}`);
        return response.data.results;
    } catch (error) {
        throw error;
    }
}
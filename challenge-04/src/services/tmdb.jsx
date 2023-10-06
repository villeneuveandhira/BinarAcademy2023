import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '11f42c620c92f8d694e22cd0cb1c08f9';

/* searching */
export const searchMovie = async (query) => {
    try {
        const search = await axios.get(`${baseUrl}/search/movie?query=${query}&page=1&api_key=${apiKey}`);
        return search.data;
    } catch (error) {
        throw error;
    }
}

/* fetch popular movie's data from api */
export const fetchPopularMovies = async () => {
    try {
        const response = await axios.get(`${baseUrl}/movie/popular?page=1&api_key=${apiKey}`);
        return response.data.results;
    } catch (error) {
        throw error;
    }
}

/* fetch detailed movie's data */
export const fetchDetailMovie = async (movieId) => {
    try {
        const response = await axios.get(
            `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}
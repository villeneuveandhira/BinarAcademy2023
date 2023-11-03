import axios from 'axios';

// Function to fetch popular movie data from an API without a login token
export const fetchPopularMoviesNoToken = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?page=1&api_key=${import.meta.env.VITE_API_KEY}`);
        return response.data.results;
    } catch (error) {
        // Handle any errors that occur during the API request
        throw error;
    }
}
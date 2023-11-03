import axios from "axios";
import { setPosts, setPostDetails, setSearch } from "../Reducer/postReducers";
// import { toast } from "react-toastify";

const token = localStorage.getItem("token");

// Function to get all the popular movies
export const getMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/movie/popular`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setPosts(response.data.data));
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   toast.error(error.response.data.message);
    //   return;
    // }
    // toast.error(error.message);
  }
};

// Function to get the details of a movie
export const getPostDetails = (id) => async (dispatch) => {
  try {

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/movie/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setPostDetails(response.data.data));
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   toast.error(error.response.data.message);
    //   return;
    // }
    // toast.error(error.message);
  }
};

export const getMovieSearch = (input) => async (dispatch) => {
  try {

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/search/movie?page=1&query=${input}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setSearch(response.data.data));
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   toast.error(error.response.data.message);
    //   return;
    // }
    // toast.error(error.message);
  }
};
/* eslint-disable no-param-reassign */
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL = process.env.REACT_APP_API_URL;
const instance = axios.create({ baseURL });
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return config;
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.log(error);
    return Promise.reject(error);
  }
);

const notify = (error) => {
  if (error) {
    toast.error(error.message, {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.success("Success!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

instance.interceptors.response.use(
  (response) => {
    notify();
    return response;
  },
  (error) => {
    notify(error);
    return Promise.reject(error);
  }
);

export default instance;

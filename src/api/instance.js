/* eslint-disable no-param-reassign */
import axios from "axios";

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

export default instance;

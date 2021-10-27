import axios from "./instance";

const register = (email, password, name) => {
  return axios.post("/users", {
    email,
    password,
    name,
  });
};

const getUser = () => axios.get("/auth/user");

const login = (email, password) => {
  return axios.post("/auth", {
    email,
    password,
  });
};

const logout = () => {
  localStorage.removeItem("token");
};

export default {
  register,
  getUser,
  login,
  logout,
};

import axios from "./inst";

const getUser = (userId) => {
  return axios.get(`/users/${userId}`);
};

export default { getUser };

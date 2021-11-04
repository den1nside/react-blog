/* eslint-disable camelcase */
import axios from "./inst";

const getUser = (userId) => {
  return axios.get(`/users/${userId}`);
};

const getAllUsers = (limit = 100, skip = 200) => {
  return axios.get("/users", { params: { limit, skip } });
};

const deleteUser = (userId) => {
  return axios.delete(`/users/${userId}`);
};

const editUser = (userId, name, extra_details, skills, profession, details) => {
  return axios.patch(`/users/${userId}`, {
    name,
    extra_details,
    skills,
    profession,
    details,
  });
};

const uploadAvatar = (userId, imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);
  return axios.put(`/users/upload/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default { getUser, getAllUsers, deleteUser, editUser };

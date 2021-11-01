import axios from "./inst";

const getAllPosts = (limit, skip, postedBy) => {
  return axios.get("/posts", { params: { postedBy, limit, skip } });
};

const addPost = (title, description, fullText) => {
  return axios.post("/posts", {
    title,
    description,
    fullText,
  });
};

const getSinglePost = (postId) => {
  return axios.get(`/posts/${postId}`);
};

const getImage = (imageId) => {
  return axios.get(`http://51.158.179.21${imageId}`);
};

export default {
  getAllPosts,
  addPost,
  getSinglePost,
  getImage,
};

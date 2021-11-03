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

const deletePost = (postId) => {
  return axios.delete(`/posts/${postId}`);
};

const editPost = (postId, title, description, fullText) => {
  return axios.patch(`/posts/${postId}`, {
    title,
    description,
    fullText,
  });
};

const likePost = (postId) => {
  return axios.put(`/posts/like/${postId}`);
};

const getSinglePost = (postId) => {
  return axios.get(`/posts/${postId}`);
};

const uploadImage = (postId, imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);
  return axios.put(`/posts/upload/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default {
  getAllPosts,
  addPost,
  getSinglePost,
  deletePost,
  editPost,
  likePost,
  uploadImage,
};

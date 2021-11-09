import axios from "./inst";

const getAllComments = (postId) => {
  return axios.get(`/comments/post/${postId}`);
};

const addComment = (postId, text, followedCommentId) => {
  return axios.post(`/comments/post/${postId}`, {
    postId,
    text,
    followedCommentId,
  });
};

const deleteComment = (commentId) => {
  return axios.delete(`/comments/${commentId}`);
};

const editComment = (commentId, text) => {
  return axios.patch(`/comments/${commentId}`, {
    text,
  });
};

const likeComment = (commentId) => {
  return axios.put(`/comments/like/${commentId}`);
};

export default {
  getAllComments,
  addComment,
  deleteComment,
  editComment,
  likeComment,
};

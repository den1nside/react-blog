import PostService from "../api/posts-service";
import { LIKE_POST } from "./types";

const likePost = (postId) => (dispatch) => {
  return PostService.lokePost(postId).then(
    () => {
      dispatch({
        type: LIKE_POST,
      });
      return Promise.resolve();
    },
    () => {
      return Promise.reject();
    }
  );
};

export default likePost;

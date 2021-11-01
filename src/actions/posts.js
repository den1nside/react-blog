import PostService from "../api/posts-service";

const addPost = (title, description, fullText) => () => {
  return PostService.addPost(title, description, fullText).then(
    () => {
      return Promise.resolve();
    },
    () => {
      return Promise.reject();
    }
  );
};

export default addPost;

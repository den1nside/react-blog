/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, createRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import PostService from "../../api/posts-service";
import AddPost from "../../components/addPost/AddPost";
import "./singlePost.css";

function SinglePost(props) {
  const [postData, setPostData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [postLikes, setPostsLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const history = useHistory();
  const { id } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const fileInput = createRef();

  useEffect(() => {
    const postId = props.match.params.post_id;
    PostService.getSinglePost(postId).then((res) => {
      setPostData(res.data);
      setPostsLikes(res.data.likes.length);
      if (res.data.likes.includes(id)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    });
    return postId;
    // eslint-disable-next-line react/destructuring-assignment
  }, [id, props.match.params.post_id]);

  const handleOnDelete = (postId) => {
    PostService.deletePost(postId).then(() => {
      history.push("/");
    });
  };

  const handleOnLike = (postId) => {
    PostService.likePost(postId);
    if (isLiked) {
      setPostsLikes(postLikes - 1);
    } else {
      setPostsLikes(postLikes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSubmit = () => {
    PostService.uploadImage(postData._id, fileInput.current.files[0]);
  };

  return postData ? (
    <div className="wrapper single-post">
      <div className="container">
        <div className="post">
          <div className="post-entry">
            <h1 className="post-title">{postData.title}</h1>
            {postData.image ? (
              <div className="post-image">
                <img
                  src={`${process.env.REACT_APP_IMAGE_SRC}${postData.image}`}
                  alt="img"
                />
              </div>
            ) : null}
            <h2 className="post-descr">{postData.description}</h2>
            <p className="post-fulltext">{postData.fullText}</p>
          </div>
          <div className="post-meta">
            <div className="post-author">
              Posted by anon {postData.postedBy}
            </div>
            <div className="post-date">Posted at {postData.dateCreated}</div>
          </div>
          <div className="post-services-wrapper">
            <button
              onClick={() => (isLoggedIn ? handleOnLike(postData._id) : null)}
              type="button"
              className="post-likes"
            >
              {isLiked ? "Unlike" : "Like"} {postLikes}
            </button>
            {id === postData.postedBy ? (
              <div className="post-services">
                <button
                  onClick={() => setShowEdit(!showEdit)}
                  type="button"
                  className="button button-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleOnDelete(postData._id)}
                  type="button"
                  className="button button-delete"
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
        {showEdit ? (
          <div className="edit-form">
            <form onSubmit={handleSubmit}>
              <input type="file" ref={fileInput} />
              <button className="button submit" type="submit">
                Submit
              </button>
            </form>
            <AddPost postId={postData._id} method={PostService.editPost} />
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <div>Loading... </div>
  );
}

export default SinglePost;

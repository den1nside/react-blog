/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, createRef, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import PostService from "../../api/posts-service";
import CommentService from "../../api/comment-service";
import AddPost from "../../components/addPost/AddPost";
import Comment from "../../components/Comment/Comment";
import "./singlePost.css";

function SinglePost(props) {
  const [postData, setPostData] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [postLikes, setPostLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const history = useHistory();
  const { id } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const fileInput = createRef();
  const {
    match: {
      params: { post_id },
    },
  } = props;

  useEffect(() => {
    PostService.getSinglePost(post_id).then((res) => {
      setPostData(res.data);
      setPostLikes(res.data.likes.length);
      if (res.data.likes.includes(id)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    });
    CommentService.getAllComments(post_id).then((res) => {
      setAllComments(res.data);
    });
    return post_id;
  }, [id, post_id]);

  const handleOnDelete = (postId) => {
    PostService.deletePost(postId).then(() => {
      history.push("/");
    });
  };

  const handleOnLike = (postId) => {
    PostService.likePost(postId);
    if (isLiked) {
      setPostLikes(postLikes - 1);
    } else {
      setPostLikes(postLikes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PostService.uploadImage(postData._id, fileInput.current.files[0]).then(
      () => {
        PostService.getSinglePost(post_id).then((res) => {
          setPostData(res.data);
          setPostLikes(res.data.likes.length);
        });
      }
    );
  };

  const postComments = useMemo(() => {
    return allComments.filter(
      (comment) => comment.followedCommentID === post_id
    );
  }, [allComments, post_id]);

  return postData ? (
    <div className="wrapper single-post">
      <div className="container">
        <div className="post">
          <div className="post-entry">
            <h1 className="post-title">{postData.title}</h1>
            {postData.image && (
              <div className="post-image">
                <img
                  src={`${process.env.REACT_APP_IMAGE_SRC}${postData.image}`}
                  alt="img"
                />
              </div>
            )}
            <h2 className="post-descr">{postData.description}</h2>
            <p className="post-fulltext">{postData.fullText}</p>
          </div>
          <div className="post-meta">
            <div className="post-author">Posted by {postData.postedBy}</div>
            <div className="post-date">Posted at {postData.dateCreated}</div>
          </div>
          <div className="post-services-wrapper">
            <button
              onClick={() => isLoggedIn && handleOnLike(postData._id)}
              type="button"
              className="post-likes"
            >
              {isLiked ? "Unlike" : "Like"} {postLikes}
            </button>
            {id === postData.postedBy && (
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
            )}
          </div>
        </div>
        {showEdit && (
          <div className="edit-form">
            <form onSubmit={handleSubmit}>
              <input type="file" ref={fileInput} />
              <button className="button submit" type="submit">
                Submit
              </button>
            </form>
            <AddPost
              postId={postData._id}
              method={PostService.editPost}
              setPostData={setPostData}
            />
          </div>
        )}
        <div className="post-comments">
          <h2 className="comments-title">Comments</h2>
          {postComments.map((comment) => {
            return (
              <Comment
                allComments={allComments}
                key={comment._id}
                {...comment}
              />
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading... </div>
  );
}

export default SinglePost;

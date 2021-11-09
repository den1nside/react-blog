/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import CommentService from "../../api/comment-service";
import "./comment.css";

function Comment({
  _id,
  text,
  dateCreated,
  commentedBy,
  likes,
  followedCommentID,
  allComments,
}) {
  const { id } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [commentLikes, setCommentLikes] = useState(likes.length);

  useEffect(() => {
    if (likes.includes(id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [id, likes]);

  const handleOnDelete = (commentId) => {
    CommentService.deleteComment(commentId);
  };

  const handleOnLike = (commentId) => {
    CommentService.likeComment(commentId);
    if (isLiked) {
      setCommentLikes(commentLikes - 1);
    } else {
      setCommentLikes(commentLikes + 1);
    }
    setIsLiked(!isLiked);
  };

  const replyComments = useMemo(() => {
    return allComments.filter((comment) => comment.followedCommentID === _id);
  }, [allComments, _id]);

  return (
    <>
      <div className="comment">
        <div className="comment-entry">
          <p className="comment-text">{_id}</p>
          <p className="comment-text">{followedCommentID}</p>
          <p className="comment-text">{text}</p>
        </div>
        <div className="comment-meta">
          <div className="comment-author">
            commented by {commentedBy || "anon"}
          </div>
          <div className="comment-date">commented at {dateCreated}</div>
        </div>
        <div className="post-services-wrapper">
          <button
            type="button"
            onClick={() => isLoggedIn && handleOnLike(_id)}
            className="post-likes"
          >
            {isLiked ? "Unlike" : "Like"} {commentLikes}
          </button>
          <div className="post-services">
            <button type="button" className="button button-reply">
              Reply
            </button>
            {id === commentedBy && (
              <>
                <button type="button" className="button button-edit">
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleOnDelete(_id)}
                  className="button button-delete"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="reply-comment">
        {replyComments.map((comment) => {
          return (
            <Comment allComments={allComments} key={comment._id} {...comment} />
          );
        })}
      </div>
    </>
  );
}

export default Comment;

import React from "react";
import { Link } from "react-router-dom";
import "./post.css";

function Post({ _id, title, description, dateCreated, postedBy, likes }) {
  return (
    <div className="post">
      <div className="post-entry">
        <Link to={`/posts/${_id}`}>
          <h2 className="post-title">{title}</h2>
        </Link>
        <p className="post-descr">{description}</p>
      </div>
      <div className="post-meta">
        <div className="post-author">Posted by {postedBy || "anon"}</div>
        <div className="post-date">Posted at {dateCreated}</div>
      </div>
      <div className="post-likes">Likes {likes.length}</div>
    </div>
  );
}

export default Post;

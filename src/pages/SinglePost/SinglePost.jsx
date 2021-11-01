import React, { useEffect, useState } from "react";
import PostService from "../../api/posts-service";
import "./singlePost.css";

function SinglePost(props) {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const id = props.match.params.post_id;
    PostService.getSinglePost(id).then((res) => {
      setPostData(res.data);
    }); // eslint-disable-next-line react/destructuring-assignment
  }, [props.match.params.post_id]);

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
          <button type="button" className="post-likes">
            Likes {postData.likes.length}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading... </div>
  );
}

export default SinglePost;

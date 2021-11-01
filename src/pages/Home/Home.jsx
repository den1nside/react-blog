import React, { useState, useEffect } from "react";
import "./home.css";
import { useSelector } from "react-redux";
import PaginatedPosts from "../../components/PaginatedPosts/PaginatedPosts";
import AddPost from "../../components/addPost/AddPost";
import getAllPostsOrdered from "../../utils/getAllPostsOrdered";

function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPostsOrdered().then(setAllPosts);
  }, []);

  const handleMyPosts = () => {
    getAllPostsOrdered(id).then(setAllPosts);
  };

  const handleAllPosts = () => {
    getAllPostsOrdered().then(setAllPosts);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="posts-toggle">
          <button
            type="button"
            onClick={handleAllPosts}
            className="button all-posts"
          >
            All posts
          </button>
          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleMyPosts}
              className="button my-posts"
            >
              My posts
            </button>
          ) : null}
        </div>
        <PaginatedPosts allPosts={allPosts} />
        {isLoggedIn ? (
          <AddPost />
        ) : (
          <div className="nologged-message">Please log in to leave a post</div>
        )}
      </div>
    </div>
  );
}

export default Home;

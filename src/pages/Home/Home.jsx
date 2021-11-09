import React, { useState, useEffect } from "react";
import "./home.css";
import { useSelector } from "react-redux";
import PaginatedPosts from "../../components/PaginatedPosts/PaginatedPosts";
import PostService from "../../api/posts-service";
import AddPost from "../../components/addPost/AddPost";
import getAllPostsOrdered from "../../utils/getAllPostsOrdered";

function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
    getAllPostsOrdered().then(setAllPosts);
  }, []);

  const handleMyPosts = () => {
    getAllPostsOrdered(id).then(setAllPosts);
  };

  const handleAllPosts = () => {
    getAllPostsOrdered().then(setAllPosts);
  };

  const handleOnSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnSortChange = (e) => {
    setSortKey(e.target.value);
  };
  return (
    <div className="wrapper">
      <div className="container">
        <div className="operations">
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
          <div className="search posts-search">
            <input
              type="text"
              value={search}
              placeholder="Search"
              onChange={handleOnSearchChange}
            />
            <select onChange={handleOnSortChange}>
              <option value="" hidden>
                Sort by
              </option>
              <option value="title">title</option>
              <option value="dateCreated">date</option>
            </select>
          </div>
        </div>
        <PaginatedPosts allPosts={allPosts} search={search} sortKey={sortKey} />
        {isLoggedIn ? (
          <AddPost method={PostService.addPost} setAllPosts={setAllPosts} />
        ) : (
          <div className="nologged-message">Please log in to leave a post</div>
        )}
      </div>
    </div>
  );
}

export default Home;

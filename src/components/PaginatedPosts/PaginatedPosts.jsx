import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Post from "../Post/Post";
import "./paginatedPosts.css";

const PaginatedPosts = ({ allPosts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts
    .slice(indexOfFirstPost, indexOfLastPost)
    .reverse();
  const pageCount = Math.ceil(allPosts.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <div className="entry">
        {currentPosts.map((post) => {
          return (
            <Post
              // eslint-disable-next-line no-underscore-dangle
              key={post._id}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...post}
            />
          );
        })}
      </div>
      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< prev"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default PaginatedPosts;

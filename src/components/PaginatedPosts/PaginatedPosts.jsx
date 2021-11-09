import React, { useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import Post from "../Post/Post";
import "./paginatedPosts.css";

const PaginatedPosts = ({ allPosts, search, sortKey }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = useMemo(() => {
    if (search) {
      return allPosts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return allPosts
      .slice(indexOfFirstPost, indexOfLastPost)
      .reverse()
      .sort((a, b) => {
        if (a[sortKey] > b[sortKey]) {
          return -1;
        }
        if (a[sortKey] < b[sortKey]) {
          return 1;
        }
        return 0;
      });
  }, [search, allPosts, indexOfFirstPost, indexOfLastPost, sortKey]);

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

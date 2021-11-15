import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PaginatedPosts from "../../components/PaginatedPosts/PaginatedPosts";
import PostService from "../../api/posts-service";
import AddPost from "../../components/AddPost";
import getAllPostsOrdered from "../../utils/getAllPostsOrdered";
import Button from "../../style/Button.styled";
import Wrapper from "../../style/Wrapper.styled";
import NotLoggedMessage from "../../style/NotLoggedMessage.styled";
import Container from "../../style/Container.styled";
import { Operations, PostsToggle, SearchWrapper } from "./Home.styled";
import Input from "../../style/Input.styled";

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
    <Wrapper>
      <Container>
        <Operations>
          <PostsToggle>
            <Button
              backgroundColor="transparent"
              type="button"
              onClick={handleAllPosts}
              fontSize="20px"
              backgroundHover="transparent"
              colorHover="gray"
            >
              All posts
            </Button>
            {isLoggedIn ? (
              <Button
                backgroundColor="transparent"
                type="button"
                onClick={handleMyPosts}
                fontSize="20px"
                backgroundHover="transparent"
                colorHover="gray"
              >
                My posts
              </Button>
            ) : null}
          </PostsToggle>
          <SearchWrapper>
            <Input
              type="text"
              marginRight="10px"
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
          </SearchWrapper>
        </Operations>
        <PaginatedPosts allPosts={allPosts} search={search} sortKey={sortKey} />
        {isLoggedIn ? (
          <AddPost method={PostService.addPost} setAllPosts={setAllPosts} />
        ) : (
          <NotLoggedMessage>Please log in to leave a post</NotLoggedMessage>
        )}
      </Container>
    </Wrapper>
  );
}

export default Home;

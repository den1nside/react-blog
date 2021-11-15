import React from "react";
import { Link } from "react-router-dom";
import { PostDate, PostDescr, PostMeta } from "./Post.styled";
import PostStyled from "../../style/Post.styled";
import Title from "../../style/Title.styled";

function Post({ _id, title, description, dateCreated, postedBy, likes }) {
  return (
    <PostStyled>
      <div>
        <Link to={`/posts/${_id}`}>
          <Title styled hover>
            {title}
          </Title>
        </Link>
        <PostDescr>{description}</PostDescr>
      </div>
      <PostMeta>
        <div>Posted by {postedBy || "anon"}</div>
        <PostDate>Posted at {dateCreated}</PostDate>
      </PostMeta>
      <div>Likes {likes.length}</div>
    </PostStyled>
  );
}

export default Post;

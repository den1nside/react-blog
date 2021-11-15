/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, createRef, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import PostService from "../../api/posts-service";
import CommentService from "../../api/comment-service";
import AddPost from "../../components/AddPost";
import AddComment from "../../components/addComment/addComment";
import Comments from "../../components/Comment/Comments";
import Wrapper from "../../style/Wrapper.styled";
import Container from "../../style/Container.styled";
import Title from "../../style/Title.styled";
import PostStyled from "../../style/Post.styled";
import Button from "../../style/Button.styled";
import { PostImage, ServicesWrapper } from "./SinglePost.styled";
import {
  PostDate,
  PostDescr,
  PostMeta,
} from "../../components/Post/Post.styled";
import NotLoggedMessage from "../../style/NotLoggedMessage.styled";

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
    <Wrapper>
      <Container>
        <PostStyled>
          <div>
            <Title styled>{postData.title}</Title>
            {postData.image && (
              <PostImage>
                <img
                  src={`${process.env.REACT_APP_IMAGE_SRC}${postData.image}`}
                  alt="img"
                />
              </PostImage>
            )}
            <PostDescr>{postData.description}</PostDescr>
            <p>{postData.fullText}</p>
          </div>
          <PostMeta>
            <div>Posted by {postData.postedBy}</div>
            <PostDate>Posted at {postData.dateCreated}</PostDate>
          </PostMeta>
          <ServicesWrapper>
            <Button
              styled
              width="fit-content"
              onClick={() => isLoggedIn && handleOnLike(postData._id)}
              type="button"
            >
              {isLiked ? "Unlike" : "Like"} {postLikes}
            </Button>
            {id === postData.postedBy && (
              <div>
                <Button
                  onClick={() => setShowEdit(!showEdit)}
                  type="button"
                  width="fit-content"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleOnDelete(postData._id)}
                  type="button"
                  width="fit-content"
                >
                  Delete
                </Button>
              </div>
            )}
          </ServicesWrapper>
        </PostStyled>
        {showEdit && (
          <div>
            <form onSubmit={handleSubmit}>
              <input type="file" ref={fileInput} />
              <Button width="fit-content" type="submit">
                Submit
              </Button>
            </form>
            <AddPost
              postId={postData._id}
              method={PostService.editPost}
              setPostData={setPostData}
            />
          </div>
        )}
        <div>
          <Title>Comments</Title>
          {postComments.map((comment) => {
            return (
              <Comments
                allComments={allComments}
                key={comment._id}
                {...comment}
                postId={post_id}
                setAllComments={setAllComments}
              />
            );
          })}
        </div>
        {isLoggedIn ? (
          <AddComment
            followedCommentID={post_id}
            postId={post_id}
            setAllComments={setAllComments}
            method={CommentService.addComment}
          />
        ) : (
          <NotLoggedMessage>Please log in to leave a post</NotLoggedMessage>
        )}
      </Container>
    </Wrapper>
  ) : (
    <div>Loading... </div>
  );
}

export default SinglePost;

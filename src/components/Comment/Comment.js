import styled from "styled-components";

export const CommentStyled = styled.div`
  background-color: ${(props) => props.theme.comment};
  margin-bottom: 20px;
  padding: 15px 15px 8px 15px;
  border-radius: 20px;
  .comment-text {
    margin-bottom: 10px;
  }
  .comment-meta {
    color: gray;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .reply-comment {
    margin-left: 50px;
  }
  .comment-meta {
    font-size: 14px;
  }
  .comment-date {
    text-align: end;
  }
`;

export const ReplyComment = styled.div`
  margin-left: 50px;
`;

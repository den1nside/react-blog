import styled from "styled-components";

const PostStyled = styled.div`
  background-color: ${(props) => props.theme.post};
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 20px;
  p {
    margin-bottom: 20px;
  }
`;

export default PostStyled;

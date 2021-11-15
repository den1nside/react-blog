import styled from "styled-components";

const TextArea = styled.textarea`
  background-color: ${(props) =>
    props.backgroundDark ? "#0d1117" : "#161b22"};
  color: #c9d1d9;
  border: none;
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  font-family: "Open Sans", sans-serif;
  min-height: 150px;
`;

export default TextArea;

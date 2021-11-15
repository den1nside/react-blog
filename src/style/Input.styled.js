import styled from "styled-components";

const Input = styled.input`
  padding: 10px;
  background-color: ${(props) =>
    props.backgroundDark ? "#0d1117" : "#161b22"};
  border: none;
  border-radius: 20px;
  width: 100%;
  color: #c9d1d9;
  margin-right: ${(props) => props.marginRight || "0"};
`;

export default Input;

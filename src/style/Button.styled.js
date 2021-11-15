import styled from "styled-components";

const Button = styled.button`
  margin-top: 5px;
  padding: 5px;
  background-color: ${(props) => (props.styled ? "#d1495b" : "transparent")};
  border: none;
  color: ${(props) => props.theme.fontColor};
  border-radius: 8px;
  cursor: pointer;
  width: ${(props) => props.width || "100%"};
  font-size: ${(props) => props.fontSize || "14px"};
  height: fit-content;

  &:hover {
    background-color: ${(props) =>
      props.styled ? "rgb(228, 40, 40)" : "transparent"};
    color: ${(props) => (props.styled ? "#c9d1d9" : "gray")};
  }
`;

export default Button;

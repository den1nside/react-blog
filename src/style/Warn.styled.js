import styled from "styled-components";

const Warn = styled.div`
  background-color: red;
  font-size: 14px;
  border-radius: 20px;
  width: fit-content;
  padding: 3px 10px;
  color: #c9d1d9;
  margin: 9px 0 5px 10px;
  font-weight: normal;

  &:before {
    content: "";
    position: absolute;
    bottom: 22px;
    left: 19px;
    border: 10px solid transparent;
    border-bottom: 10px solid red;
  }
`;

export default Warn;

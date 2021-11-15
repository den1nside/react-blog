import styled from "styled-components";

const PaginationStyled = styled.div`
  margin-bottom: 10px;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  a {
    font-size: 18px;
    margin-right: 10px;
    border: 1px solid;
    border-color: ${(props) => props.theme.fontColor};
    padding: 3px 11px;
    border-radius: 20px;
    color: ${(props) => props.theme.fontColor};
  }
  .disabled a,
  a:hover {
    border-color: gray;
    cursor: pointer;
    color: gray;
  }
  .selected a {
    border-color: #d1495b;
    color: #d1495b;
  }
`;

export default PaginationStyled;

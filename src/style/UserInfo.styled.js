import styled from "styled-components";

const UserInfo = styled.table`
  background-color: ${(props) => props.theme.post};
  border-radius: 20px;
  padding: 10px;
  display: inline-block;
  margin: 0 0 10px 10px;
  text-align: left;
  max-width: 500px;
  word-break: break-all;
  line-height: 25px;
`;

export default UserInfo;

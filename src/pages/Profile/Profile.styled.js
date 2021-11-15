import styled from "styled-components";

export const UserData = styled.div`
  h1 {
    text-align: center;
  }
  p {
    line-height: 30px;
  }
`;

export const UserDataWrapper = styled.div`
  background-color: ${(props) => props.theme.post};
  max-width: 500px;
  padding: 20px;
  border-radius: 10px;
  margin: 50px auto;
  form {
    margin-bottom: 10px;
  }
`;

export const UserServices = styled.div`
  text-align: end;
  margin-top: 10px;
`;

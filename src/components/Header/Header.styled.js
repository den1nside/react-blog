import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.header};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const LinkItem = styled.div`
  margin: 0 10px;

  &:hover {
    color: gray;
  }
`;

export const Links = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 50%;
`;

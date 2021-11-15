import styled from "styled-components";

export const PostTitle = styled.h1`
  text-align: center;
  margin-bottom: 10px;
  &:hover {
    color: gray;
    transition-duration: 0.1s;
  }
`;

export const PostDescr = styled.div`
  font-size: 18px;
  margin: 10px 0;
`;

export const PostMeta = styled.div`
  color: gray;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
`;

export const PostDate = styled.div`
  text-align: end;
`;

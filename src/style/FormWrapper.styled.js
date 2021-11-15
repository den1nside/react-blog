import styled from "styled-components";

const FormWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 300px;
  width: 300px;
  background-color: ${(props) => props.theme.post};
  padding: 20px;
  border-radius: 10px;
`;

export default FormWrapper;

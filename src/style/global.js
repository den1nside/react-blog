import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Open Sans", sans-serif;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.body};
}

ul {
  list-style-type: none;
}

a {
  text-decoration: none;
  color: ${(props) => props.theme.fontColor};
  font-weight: 600;
}

a:hover {
  color: none;
}

textarea,
input {
  background-color: ${(props) => props.theme.input} !important;
}

textarea:focus,
input:focus {
  outline: 1px solid rebeccapurple;
}
select,
option {
  background-color: ${(props) => props.theme.body};
  outline: none;
  border: none;
  color: ${(props) => props.theme.fontColor};
}
.Toastify__toast-icon {
  width: 12px !important;
}

.Toastify__toast {
  width: 109px !important;
  min-height: 28px !important;
  background-color: ${(props) => props.theme.post} !important;
  font-size: 15px !important;
  padding: 0 !important;
  color: ${(props) => props.theme.fontColor} !important;
}
.Toastify__toast-container--bottom-right {
  bottom: 0em !important; 
  right: -12em !important;
}
td {
  padding-left: 20px;
}
.password {
  padding: 10px;
  background-color: #0d1117;
  border: none;
  border-radius: 20px;
  width: 100%;
  color: #c9d1d9;
}

.toggle-button {
 position: relative;
 display: inline-block;
 width: 37px;
 height: 18px;
 margin: 10px 0 0 10px;
 vertical-align: top;
 background-color: #161b22;
 border: none;
 border-radius: 30px;
 outline: none;
 cursor: pointer;
 appearance: none;
}

.toggle-button::after {
  content: "";

  display: inline-block;
  position: absolute;

  width: 18px;
  height: 18px;
  background-color: blue;
  border-radius: 50%;

  transform: translateX(0);
}
.toggle-button:checked::after {
  transform: translateX(calc(100% + 4px));
  background-color: gray;  
}
.toggle-button:checked {
  background-color: #161b22;
}
`;

export default GlobalStyle;

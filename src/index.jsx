import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./store";
import App from "./components/App/App";
import "./style/global.css";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer />;
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

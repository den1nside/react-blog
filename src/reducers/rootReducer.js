import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import theme from "./theme";

export default combineReducers({
  auth,
  message,
  theme,
});

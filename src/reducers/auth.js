import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USER_SUCCESS,
  LOGOUT,
} from "../actions/types";

const token = localStorage.getItem("token");
const { email, id, name } = JSON.parse(localStorage.getItem("userData")) || {
  id: "",
  email: "",
  name: "",
};
const initialState = token
  ? { id, name, email, isLoggedIn: true }
  : { id: null, name: null, email: null, isLoggedIn: false };

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        // eslint-disable-next-line no-underscore-dangle
        id: payload._id,
        ...payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;

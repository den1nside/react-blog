import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USER_SUCCESS,
  LOGOUT,
} from "./types";
import { setToStorage } from "../utils/global";
import AuthService from "../api/auth-service";

export const register = (email, password, name) => (dispatch) => {
  return AuthService.register(email, password, name).then(
    () => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      return Promise.resolve();
    },
    () => {
      dispatch({
        type: REGISTER_FAIL,
      });

      return Promise.reject();
    }
  );
};

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (response) => {
      setToStorage("token", response.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve();
    },
    () => {
      dispatch({
        type: LOGIN_FAIL,
      });

      return Promise.reject();
    }
  );
};

export const getUser = () => (dispatch) => {
  return AuthService.getUser().then(
    (response) => {
      setToStorage(
        "userData",
        JSON.stringify({
          // eslint-disable-next-line no-underscore-dangle
          id: response.data._id,
          userName: response.data.name,
          email: response.data.email,
        })
      );
      dispatch({
        type: GET_USER_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve();
    },
    () => {
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

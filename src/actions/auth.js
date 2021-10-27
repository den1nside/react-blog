import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";
import { setToStorage } from "../utils/global";
import AuthService from "../api/auth-service";

export const register = (email, password, name) => (dispatch) => {
  return AuthService.register(email, password, name).then(
    () => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
      });

      return Promise.resolve();
    },
    (error) => {
      const { message } = error;

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
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
    (error) => {
      const { message } = error;

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

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

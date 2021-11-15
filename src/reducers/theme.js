import { DARK_THEME, LIGHT_THEME } from "../actions/types";

const theme = localStorage.getItem("theme");

const initialState = { theme };

const themeReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case DARK_THEME:
      localStorage.setItem("theme", "Dark");
      return { theme: "Dark" };

    case LIGHT_THEME:
      localStorage.setItem("theme", "Light");
      return { theme: "Light" };

    default:
      return state;
  }
};

export default themeReducer;

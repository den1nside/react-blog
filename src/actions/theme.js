import { DARK_THEME, LIGHT_THEME } from "./types";

export const setDarkTheme = () => ({
  type: DARK_THEME,
});

export const setLightTheme = () => ({
  type: LIGHT_THEME,
});

export const getFromStorage = (key) => {
  return localStorage.getItem(key) || null;
};

export const setToStorage = (keyName, key) => {
  localStorage.setItem(keyName, key);
};

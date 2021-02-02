import jwtDecode from "jwt-decode";

const authKey = "token";

export const getToken = () => {
  return localStorage.getItem(authKey);
};

export const getUser = () => {
  const token = getToken();
  return token ? jwtDecode(token) : null;
};

export const storeToken = (token) => {
  return localStorage.setItem(authKey, token);
};

export const removeToken = () => {
  return localStorage.removeItem(authKey);
};

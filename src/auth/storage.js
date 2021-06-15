import jwtDecode from "jwt-decode";
import moment from "moment";
const authKey = "token";

export const getToken = () => {
  return localStorage.getItem(authKey);
};

export const getUser = () => {
  const token = JSON.parse(getToken());
  if (token && moment().isAfter(token.expire)) {
    removeToken();
    return null;
  }
  return token ? jwtDecode(token.token) : null;
};

export const storeToken = (token) => {
  return localStorage.setItem(authKey, JSON.stringify(token));
};

export const removeToken = () => {
  return localStorage.removeItem(authKey);
};

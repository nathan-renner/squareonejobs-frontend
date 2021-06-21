import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
const authKey = "token";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export const getToken = () => {
  return localStorage.getItem(authKey);
};

export const getUser = () => {
  const token = JSON.parse(getToken());
  if (token && dayjs().isAfter(token.expire)) {
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

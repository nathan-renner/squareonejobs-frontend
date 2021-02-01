//import jwtDecode from "jwt-decode";

const authKey = "token";

export const getToken = () => {
  return localStorage.getItem(authKey);
};

export const getUser = () => {
  const token = getToken();
  return token ? token : null;
};

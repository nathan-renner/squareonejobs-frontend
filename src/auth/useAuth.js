import { useContext } from "react";
import jwtDecode from "jwt-decode";
import moment from "moment";

import AuthContext from "./context";
import { storeToken, removeToken } from "./storage";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const login = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    storeToken({
      token: authToken,
      expire: moment().add(3, "weeks"),
    });
  };

  const logout = async () => {
    setUser(null);
    removeToken();
  };

  return { user, login, logout };
};

export default useAuth;

import { useContext } from "react";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

import AuthContext from "./context";
import { storeToken, removeToken } from "./storage";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const login = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    storeToken({
      token: authToken,
      expire: dayjs().add(3, "weeks"),
    });
  };

  const logout = async () => {
    setUser(null);
    removeToken();
  };

  return { user, login, logout };
};

export default useAuth;

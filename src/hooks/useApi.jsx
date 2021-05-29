import { useState } from "react";
import useAuth from "./../auth/useAuth";

const useApi = (apiFunc) => {
  const { logout } = useAuth();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    console.log(response.status);
    if (response.status === 401) logout();

    setError(!response.ok);
    setData(response.data);
    return response;
  };

  return { data, error, loading, request };
};

export default useApi;

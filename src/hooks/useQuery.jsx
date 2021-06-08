import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const useQuery = () => {
  const location = useLocation();
  const [query, setQuery] = useState(queryString.parse(location.search));

  useEffect(() => {
    setQuery(queryString.parse(location.search));
  }, [location]);

  return query;
};

export default useQuery;

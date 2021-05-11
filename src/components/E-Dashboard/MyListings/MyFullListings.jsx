import React, { useEffect, useState } from "react";
import { getMyListings } from "../../../api/listings";
import useApi from "./../../../hooks/useApi";
import ActivityIndicator from "./../../ActivityIndicator";

function MyFullListings(props) {
  const [listings, setListings] = useState(false);
  const getMyListingsApi = useApi(getMyListings);

  const fetchJobs = async () => {
    const response = await getMyListingsApi.request("full");
    if (response.ok) setListings(response.data);
  };

  useEffect(() => {
    if (!listings && !getMyListings.error) fetchJobs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="my-listings-content">
      <ActivityIndicator visible={getMyListingsApi.loading} />
      my full listings
    </div>
  );
}

export default MyFullListings;

import React, { useEffect, useState } from "react";
import { getMyListings } from "../../../api/listings";
import useApi from "./../../../hooks/useApi";
import ActivityIndicator from "./../../ActivityIndicator";

function MyDrafts(props) {
  const [listings, setListings] = useState(false);
  const getMyListingsApi = useApi(getMyListings);

  const fetchJobs = async () => {
    const response = await getMyListingsApi.request("draft");
    if (response.ok) setListings(response.data);
  };

  useEffect(() => {
    if (!listings && !getMyListings.error) fetchJobs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="my-listings-content">
      <ActivityIndicator visible={getMyListingsApi.loading} />
      my drafts
    </div>
  );
}

export default MyDrafts;

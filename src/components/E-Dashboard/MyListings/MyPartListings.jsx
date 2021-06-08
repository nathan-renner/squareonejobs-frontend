import React, { useEffect, useState } from "react";
import { getMyListings } from "../../../api/listings";

import { ActivityIndicator, Card, ListingsList } from "../../common";

import useApi from "./../../../hooks/useApi";
import { useResponseModal } from "./../../../hooks/useResponseModal";

function MyPartListings(props) {
  const [listings, setListings] = useState(false);
  const getMyListingsApi = useApi(getMyListings);
  const { setModal } = useResponseModal();

  const fetchJobs = async () => {
    const response = await getMyListingsApi.request("part");
    if (response.ok) setListings(response.data);
    else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
  };

  useEffect(() => {
    if (!listings && !getMyListings.error) fetchJobs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="my-listings-content">
      <ActivityIndicator visible={getMyListingsApi.loading} />
      {listings && (
        <div>
          <Card
            style={{ marginTop: 0 }}
            data-aos="fade-up"
            data-aos-once={true}
            data-aos-delay="100"
          >
            <h2>Active Part Time Listings</h2>
            {listings.active.length > 0 ? (
              <ListingsList listings={listings.active} fetchJobs={fetchJobs} />
            ) : (
              <p style={{ marginBottom: 0 }}>No active positions</p>
            )}
          </Card>
          <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="200">
            <h2>Filled Part Time Listings</h2>
            {listings.filled.length > 0 ? (
              <ListingsList listings={listings.filled} fetchJobs={fetchJobs} />
            ) : (
              <p style={{ marginBottom: 0 }}>No filled positions</p>
            )}
          </Card>
          <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="200">
            <h2>Cancelled Part Time Listings</h2>
            {listings.cancelled.length > 0 ? (
              <ListingsList listings={listings.filled} fetchJobs={fetchJobs} />
            ) : (
              <p style={{ marginBottom: 0 }}>No cancelled listings</p>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

export default MyPartListings;

import React, { useEffect, useState } from "react";
import { getMyListings } from "../../../api/listings";
import Card from "../../Card";
import useApi from "./../../../hooks/useApi";
import ActivityIndicator from "./../../ActivityIndicator";
import ListingsList from "./../../ListingsList";

function MyDrafts(props) {
  const [listings, setListings] = useState(false);
  const getMyListingsApi = useApi(getMyListings);

  const fetchJobs = async () => {
    const response = await getMyListingsApi.request("day");
    if (response.ok) setListings(response.data);
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
            <h2>Drafts</h2>
            {listings.length > 0 ? (
              <ListingsList listings={listings} drafts fetchJobs={fetchJobs} />
            ) : (
              <p style={{ marginBottom: 0 }}>No drafts</p>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

export default MyDrafts;

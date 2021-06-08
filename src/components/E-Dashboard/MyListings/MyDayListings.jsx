import React, { useEffect, useState } from "react";
import { getMyListings } from "../../../api/listings";

import { ActivityIndicator, Card, ListingsList } from "../../common";
import ReferenceModal from "../Listings/ReferenceModal";

import useApi from "./../../../hooks/useApi";
import { useResponseModal } from "./../../../hooks/useResponseModal";

function MyDayListings(props) {
  const [listings, setListings] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const getMyListingsApi = useApi(getMyListings);
  const { setModal } = useResponseModal();

  const fetchJobs = async () => {
    const response = await getMyListingsApi.request("day");
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
      <ActivityIndicator
        visible={getMyListingsApi.loading && !getMyListingsApi.error}
      />
      <ReferenceModal
        visible={showRef}
        setVisible={setShowRef}
        id={showRef}
        title="Job completed!"
      />
      {listings && (
        <div>
          <Card
            style={{ marginTop: 0 }}
            data-aos="fade-up"
            data-aos-once={true}
            data-aos-delay="100"
          >
            <h2>Active Day Jobs</h2>
            {listings.active.length > 0 ? (
              <ListingsList
                listings={listings.active}
                setModal={setModal}
                setShowRef={setShowRef}
                fetchJobs={fetchJobs}
              />
            ) : (
              <p style={{ marginBottom: 0 }}>No active jobs</p>
            )}
          </Card>
          <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="200">
            <h2>Previous Day Jobs</h2>
            {listings.previous.length > 0 ? (
              <ListingsList
                listings={listings.previous}
                setModal={setModal}
                fetchJobs={fetchJobs}
              />
            ) : (
              <p style={{ marginBottom: 0 }}>No previous jobs</p>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

export default MyDayListings;

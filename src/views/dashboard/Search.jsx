import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import ReactPaginate from "react-paginate";

import Listing from "./Listing";
import Filters from "./../../components/Dashboard/Search/Filters";

import { searchListings } from "./../../api/listings";
import useApi from "../../hooks/useApi";
import ActivityIndicator from "./../../components/ActivityIndicator";
import JobCard from "../../components/Dashboard/Search/JobCard";
import useQuery from "../../hooks/useQuery";
import { useResponseModal } from "./../../hooks/useResponseModal";
import Zip from "./../../components/Dashboard/Search/Zip";

function Search(props) {
  const history = useHistory();
  const query = useQuery();
  const listingsApi = useApi(searchListings);
  const [selected, setSelected] = useState(false);
  const [start, setStart] = useState(query.start ? query.start : 0);
  const [filter, setFilter] = useState({
    c: query.c ? query.c : "",
    t: query.t ? query.t : "",
    r: query.r ? query.r : "25",
    d: query.d ? query.d : "",
    remote: query.remote ? query.remote === "true" : false,
    nodl: query.nodl ? query.nodl === "true" : false,
    zip: query.zip ? query.zip : "",
    lat: query.lat ? query.lat : false,
    lng: query.lng ? query.lng : false,
  });
  const [listings, setListings] = useState(false);
  const [count, setCount] = useState(false);
  const { setModal } = useResponseModal();

  const fetchListings = async () => {
    setSelected(false);
    const response = await listingsApi.request(queryString.stringify(query));
    if (response.ok) {
      setFilter({
        ...filter,
        zip: response.data.zip,
        lat: response.data.lat,
        lng: response.data.lng,
        r: !response.data.zip ? "3500" : filter.r,
      });
      setCount(response.data.count);
      setListings(response.data.listings);
    } else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
  };

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line
  }, [query]);

  const handleFilterChange = (value, type) => {
    const newFilter = { ...filter };

    if (type === "zip" && value !== filter.zip) {
      delete newFilter.lat;
      delete newFilter.lng;
    }

    value === "" ? delete newFilter[type] : (newFilter[type] = value);
    setFilter(newFilter);

    value === "" ? delete query[type] : (query[type] = value);

    if ((newFilter.lng && !query.lng) || newFilter.lng !== query.lng)
      query.lng = newFilter.lng;
    if ((newFilter.lat && !query.lat) || newFilter.lat !== query.lat)
      query.lat = newFilter.lat;

    const stringified = queryString.stringify(query);
    history.push(`/search?${stringified}`);
  };

  const handlePageChange = ({ selected: pageNum }) => {
    setStart(pageNum * 15);
    pageNum === 0 ? delete query.start : (query.start = pageNum * 15);

    console.log(start, pageNum, query.start);
    const stringified = queryString.stringify(query);
    history.push(`/search?${stringified}`);
  };

  return (
    <div className="search">
      <div className="search-header">
        <Zip zip={filter.zip} handleFilterChange={handleFilterChange} />
        <Filters filter={filter} handleFilterChange={handleFilterChange} />
      </div>
      <h3>Search results for: "{query.q && query.q}"</h3>
      <p>
        Page {Math.trunc(start / 15 + 1)} of {count} listings.
      </p>
      <ActivityIndicator visible={listingsApi.loading} />
      {listings.length > 0 ? (
        <>
          <div className="results-container">
            <div className="results">
              <JobCard
                listings={listings}
                setSelected={setSelected}
                selected={selected}
              />
              <ReactPaginate
                pageCount={Math.ceil(count / 15)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                nextLabel={">"}
                previousLabel={"<"}
                onPageChange={(e) => handlePageChange(e)}
                containerClassName={"pagination-container"}
                pageClassName={"pagination-page"}
                activeClassName={"pagination-active"}
                previousClassName={"pagination-page"}
                nextClassName={"pagination-page"}
              />
            </div>
            <div className="selected">
              {selected ? (
                <Listing id={selected} />
              ) : (
                <div style={{ textAlign: "center", marginTop: "2em" }}>
                  Click on a listing to view details.
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">No listings found for this search.</p>
      )}
      {/* {listingsApi.error && (
        <div className="error-container">
          <div>
            <h3>Error loading portfolio</h3>
            <Button label="retry" onClick={() => fetchListings()} />
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Search;

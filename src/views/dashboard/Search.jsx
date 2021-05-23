import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import ReactPaginate from "react-paginate";

import Listing from "./Listing";
import Filters from "./../../components/Dashboard/Search/Filters";

import { searchListings } from "./../../api/listings";
import useApi from "../../hooks/useApi";
import ActivityIndicator from "./../../components/ActivityIndicator";
import Button from "./../../components/Button";
import JobCard from "../../components/Dashboard/Search/JobCard";
import useQuery from "../../hooks/useQuery";
import { useResponseModal } from "./../../hooks/useResponseModal";

function Search(props) {
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();
  const listingsApi = useApi(searchListings);
  const [selected, setSelected] = useState(false);
  const [start, setStart] = useState(query.start ? query.start : 0);
  const [filter, setFilter] = useState({
    c: query.c ? query.c : "",
    t: query.t ? query.t : "",
    r: query.r ? query.c : "25",
    remote: query.remote ? query.remote === "true" : false,
    nodl: query.nodl ? query.nodl === "true" : false,
  });
  const [listings, setListings] = useState(false);
  const [count, setCount] = useState(false);
  const { setModal } = useResponseModal();

  const fetchListings = async () => {
    const response = await listingsApi.request(queryString.stringify(query));
    if (response.ok) {
      setListings(response.data.listings);
      setCount(response.data.count);
    } else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
  };

  useEffect(() => {
    if (!listingsApi.error && !listings) fetchListings();
    // eslint-disable-next-line
  }, [location]);

  const handleFilterChange = (value, type) => {
    const newFilter = { ...filter };

    value === "" ? delete newFilter[type] : (newFilter[type] = value);
    setFilter(newFilter);

    value === "" ? delete query[type] : (query[type] = value);

    const stringified = queryString.stringify(query);
    history.push(`/search?${stringified}`);
    fetchListings(stringified);
  };

  const handlePageChange = ({ selected: pageNum }) => {
    setStart(pageNum * 15);
    pageNum === 0 ? delete query.start : (query.start = pageNum * 15);

    console.log(start, pageNum, query.start);
    const stringified = queryString.stringify(query);
    history.push(`/search?${stringified}`);
    fetchListings(stringified);
  };

  return (
    <div className="search">
      <Filters filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Search results for: "{query.q && query.q}"</h3>
      <p>
        Page {Math.trunc(start / 15 + 1)} of {count} listings.
      </p>
      <ActivityIndicator visible={listingsApi.loading} />
      {listings && (
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
      )}
      {listingsApi.error && (
        <div className="error-container">
          <div>
            <h3>Error loading portfolio</h3>
            <Button label="retry" onClick={() => fetchListings()} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;

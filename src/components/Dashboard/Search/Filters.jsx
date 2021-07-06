import React from "react";

import categories from "../../../data/categories";

function Filters({ filter, handleFilterChange }) {
  const renderSwitch = (cat, trueText, falseText) => (
    <div
      className={`filter-btn ${!filter[cat] ? "notactive" : null}`}
      onClick={() => handleFilterChange(!filter[cat], cat)}
    >
      {filter[cat] ? trueText : falseText}
    </div>
  );

  const renderCats = () =>
    categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ));

  return (
    <div className="filters-container">
      <h3>Filters:</h3>
      <div className="filters">
        <select
          placeholder="Job Type"
          value={filter.t}
          onChange={(e) => handleFilterChange(e.target.value, "t")}
          className={
            filter.t === "" || filter.t === undefined ? "placeholder" : null
          }
        >
          <option value="">No Job Type</option>
          <option value="day">Day Jobs</option>
          <option value="part">Part Time</option>
          <option value="full">Full time</option>
        </select>
        <select
          placeholder="Date Posted"
          value={filter.d}
          onChange={(e) => handleFilterChange(e.target.value, "d")}
          className={
            filter.d === "" || filter.d === undefined ? "placeholder" : null
          }
        >
          <option value="">Date Posted</option>
          <option value="1">Last 24 Hours</option>
          <option value="7">Last Week</option>
          <option value="14">Last Two Weeks</option>
        </select>
        <select
          placeholder="Radius"
          value={filter.r}
          onChange={(e) => handleFilterChange(e.target.value, "r")}
          className={
            filter.r === "" || filter.r === undefined ? "placeholder" : null
          }
        >
          {/* <option value="">No radius</option> */}
          <option value="10">10 miles</option>
          <option value="25">25 miles</option>
          <option value="50">50 miles</option>
          <option value="3500">Nationwide</option>
        </select>
        <select
          placeholder="Category"
          value={filter.c}
          onChange={(e) => handleFilterChange(e.target.value, "c")}
          className={
            filter.c === "" || filter.c === undefined ? "placeholder" : null
          }
        >
          <option value="">No Category</option>
          {renderCats()}
        </select>
        {renderSwitch("remote", "Remote", "Not Remote")}
        {renderSwitch(
          "nodl",
          "Driver's License Not Required",
          "Driver's License Required"
        )}
      </div>
    </div>
  );
}

export default Filters;

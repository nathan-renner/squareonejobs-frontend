import React from "react";

function Filters({ filter, handleFilterChange }) {
  const renderSwitch = (cat, trueText, falseText) => (
    <div
      className={`filter-btn ${!filter[cat] ? "notactive" : null}`}
      onClick={() => handleFilterChange(!filter[cat], cat)}
    >
      {filter[cat] ? trueText : falseText}
    </div>
  );

  return (
    <>
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
            placeholder="Radius"
            value={filter.r}
            onChange={(e) => handleFilterChange(e.target.value, "r")}
            className={
              filter.r === "" || filter.r === undefined ? "placeholder" : null
            }
          >
            <option value="">No radius</option>
            <option value="10">10 miles</option>
            <option value="25">25 miles</option>
            <option value="50">50 miles</option>
            <option value="nationwide">Nationwide</option>
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
            <option value="Computer Sciences">Computer Sciences</option>
            <option value="Education">Education</option>
            <option value="Marketing">Marketing</option>
            <option value="Restaurant Services">Restaurant Services</option>
            <option value="Retail">Retail</option>
          </select>
          {renderSwitch("remote", "Remote", "Not Remote")}
          {renderSwitch(
            "nodl",
            "Driver's License Not Required",
            "Driver's License Required"
          )}
        </div>
      </div>
    </>
  );
}

export default Filters;

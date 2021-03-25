import React from "react";

function Filters({ filter, handleFilterChange }) {
  return (
    <>
      <div className="filters-container">
        <h3>Filters:</h3>
        <div className="filters">
          <select
            placeholder="Job Type"
            value={filter.jobType}
            onChange={(e) => handleFilterChange(e, "jobType")}
            className={filter.jobType === "" ? "placeholder" : null}
          >
            <option value="" hidden>
              Job Type
            </option>
            <option value="dayjobs">Day Jobs</option>
            <option value="parttime">Part Time</option>
            <option value="fulltime">Full time</option>
          </select>
          <select
            placeholder="Radius"
            value={filter.radius}
            onChange={(e) => handleFilterChange(e, "radius")}
            className={filter.radius === "" ? "placeholder" : null}
          >
            <option value="" hidden>
              Radius
            </option>
            <option value="10">10 miles</option>
            <option value="25">25 miles</option>
            <option value="50">50 miles</option>
            <option value="nationwide">Nationwide</option>
          </select>
          <select
            placeholder="Category"
            value={filter.category}
            onChange={(e) => handleFilterChange(e, "category")}
            className={filter.category === "" ? "placeholder" : null}
          >
            <option value="" hidden>
              Category
            </option>
            <option value="Computer Sciences">Computer Sciences</option>
            <option value="Education">Education</option>
            <option value="Marketing">Marketing</option>
            <option value="Restaurant Services">Restaurant Services</option>
            <option value="Retail">Retail</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Filters;

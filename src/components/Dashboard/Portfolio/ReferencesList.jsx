import React from "react";
import dayjs from "dayjs";

import { StarRating } from "../../common";

function ReferencesList({ references, small = false }) {
  return (
    <div className={`refs-container ${small ? "small" : null}`}>
      {references.map((ref, index) => (
        <div className="ref" key={ref._id}>
          {index !== 0 && <div className="divider" />}
          <div className="emp-container">
            <img src={ref.company.logo} alt={`${ref.company.name}'s logo`} />
            <h4>{`${ref.employer.firstName} ${ref.employer.lastName}`}</h4>
          </div>
          <h3>{ref.title}</h3>
          <p className="date">
            Published on {dayjs(ref.dateCreated).format("MMMM DD, YYYY")}
          </p>
          <StarRating rating={ref.rating} />
          <p className={`review ${small ? "small" : null}`}>{ref.review}</p>
        </div>
      ))}
    </div>
  );
}

export default ReferencesList;

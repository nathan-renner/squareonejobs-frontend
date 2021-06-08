import React from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";

import { Card } from "../../common";

function History({ history, ...props }) {
  const { previous, current } = history;
  return (
    <>
      <Card className="user-history" simple {...props}>
        {previous.length > 0 && (
          <div>
            <h2>Previously Hired</h2>
            {previous.map((job) => (
              <>
                <NavLink to={`/listing/${job._id}`} key={job._id}>
                  {job.details.position}
                </NavLink>
                <p>
                  {moment(job.details.startDateTime).format("MMM. DD, YYYY")}
                </p>
              </>
            ))}
          </div>
        )}
        {current.length > 0 && (
          <div>
            <h2>Current Applications</h2>
            {current.map((job) => (
              <>
                <NavLink to={`/listing/${job._id}`} key={job._id}>
                  {job.details.position}
                </NavLink>
                <p>
                  {moment(job.details.startDateTime).format("MMM. DD, YYYY")}
                </p>
              </>
            ))}
          </div>
        )}
      </Card>
      <hr />
    </>
  );
}

export default History;

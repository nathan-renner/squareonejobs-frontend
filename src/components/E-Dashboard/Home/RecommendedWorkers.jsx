import React from "react";
import { UserCardList } from "../../common";

function RecommendedWorkers({ workers, ...props }) {
  return (
    <div className="card" {...props}>
      <h2>Recommended Workers</h2>
      <div className="recommended-candidates">
        <UserCardList users={workers} applicant={false} />
      </div>
    </div>
  );
}

export default RecommendedWorkers;

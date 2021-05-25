import React from "react";

import defaultAvatar from "../../../assets/images/default-avatar.png";
import UserCardList from "../../UserCardList";

const candidates = [
  {
    applicant: {
      _id: 1,
      avatar: defaultAvatar,
      firstName: "John",
      lastName: "Smith",
    },
    dateCreated: new Date(),
  },
];

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

import React from "react";

import defaultAvatar from "../../../assets/images/default-avatar.png";
import UserCardList from "./../../UserCardList";

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

function RecommendedCandidates({ ...props }) {
  return (
    <div className="card" {...props}>
      <h2>Recommended Candidates</h2>
      <div className="recommended-candidates">
        <UserCardList users={candidates} />
      </div>
    </div>
  );
}

export default RecommendedCandidates;

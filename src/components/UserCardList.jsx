import React from "react";
import UserCard from "./UserCard";

function UserCardList({ candidates }) {
  return (
    <div className="user-grid">
      {candidates.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
}

export default UserCardList;

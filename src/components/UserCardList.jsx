import React from "react";
import UserCard from "./UserCard";

function UserCardList({ users, ...props }) {
  return (
    <div className="user-grid">
      {users.map((user, index) => (
        <UserCard key={index} user={user.applicant} {...props} />
      ))}
    </div>
  );
}

export default UserCardList;

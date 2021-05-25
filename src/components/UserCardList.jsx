import React from "react";
import UserCard from "./UserCard";

function UserCardList({ users, applicant = true, ...props }) {
  return (
    <div className="user-grid">
      {users.map((user, index) => (
        <UserCard
          key={index}
          user={applicant ? user.applicant : user}
          {...props}
        />
      ))}
    </div>
  );
}

export default UserCardList;

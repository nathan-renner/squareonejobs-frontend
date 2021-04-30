import React from "react";

import defaultAvatar from "../assets/images/default-avatar.png";

function UserCard({ user }) {
  return (
    <div className="user-card">
      <img
        src={user.avatar ? user.avatar : defaultAvatar}
        alt={`${user.firstName} ${user.lastName}'s avatar`}
      />
      <p>{`${user.firstName} ${user.lastName}`}</p>
    </div>
  );
}

export default UserCard;

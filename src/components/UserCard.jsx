import React from "react";
import { useHistory } from "react-router-dom";

import defaultAvatar from "../assets/images/default-avatar.png";
import Button from "./Button";

function UserCard({ user, onButtonClick = () => true, buttonLabel = false }) {
  const history = useHistory();

  const onClick = () => history.push(`/user/${user._id}`);

  return (
    <div className="user-card">
      <img
        src={user.avatar ? user.avatar : defaultAvatar}
        alt={`${user.firstName} ${user.lastName}'s avatar`}
        onClick={onClick}
      />
      <p onClick={onClick}>{`${user.firstName} ${user.lastName}`}</p>
      {buttonLabel && (
        <Button
          outline
          color="white"
          textColor="primary"
          className="btn-sm"
          label={buttonLabel}
          onClick={() =>
            onButtonClick(user._id, `${user.firstName} ${user.lastName}`)
          }
        />
      )}
    </div>
  );
}

export default UserCard;

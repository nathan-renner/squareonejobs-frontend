import React from "react";
import { useHistory } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import defaultAvatar from "../../assets/images/default-avatar.png";
import Button from "./Button";
import Icon from "./Icon";

function UserCard({ user, onButtonClick = () => true, buttonLabel = false }) {
  const history = useHistory();

  const onClick = () => history.push(`/user/${user._id}`);

  return (
    <div className="user-card">
      {user ? (
        <>
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
        </>
      ) : (
        <>
          <Icon
            Icon={FaUserCircle}
            sizeFactor={1}
            size={74}
            iconColor="medium"
            color="white"
            className="icon"
          />
          <p>User not found</p>
        </>
      )}
    </div>
  );
}

export default UserCard;

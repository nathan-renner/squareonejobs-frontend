import React from "react";

import Card from "../../Card";

import defaultAvatar from "../../../assets/images/default-avatar.png";

function Header({ user, ...props }) {
  const { avatar, firstName, lastName, details } = user;
  const { city, state } = details.address;

  return (
    <Card className="header" {...props}>
      <div className={`avatar-container`}>
        <img
          src={avatar ? `${avatar}?${Date.now()}` : defaultAvatar}
          alt="Avatar"
        />
      </div>
      <div className="details-container">
        <h2>{`${firstName} ${lastName}`}</h2>
        {city && state ? <p>{`${city}, ${state}`}</p> : null}
      </div>
    </Card>
  );
}

export default Header;

import React from "react";
import Card from "./../../Card";
import { MdModeEdit } from "react-icons/md";
import useAuth from "../../../auth/useAuth";

import defaultAvatar from "../../../assets/images/default-avatar.png";
import { NavLink } from "react-router-dom";

function Header(props) {
  const { user } = useAuth();

  return (
    <Card className="header" {...props}>
      <NavLink to="/account">
        <div className="control-icons">
          <MdModeEdit size={25} className="control-icon" />
        </div>
      </NavLink>
      <img src={defaultAvatar} alt="Avatar" />
      <h2>{`${user.firstName} ${user.lastName}`}</h2>
      <p>{user.email}</p>
      <p>Hoboken, NJ</p>
    </Card>
  );
}

export default Header;

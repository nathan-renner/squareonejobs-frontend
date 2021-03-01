import React from "react";
import Card from "./../../Card";
import { MdModeEdit } from "react-icons/md";

import defaultAvatar from "../../../assets/images/default-avatar.png";

function Header(props) {
  return (
    <Card className="header" {...props}>
      <MdModeEdit size={25} className="edit-icon" />
      <img src={defaultAvatar} alt="Avatar" />
      <h2>Bob Smith</h2>
      <p>bsmith@gmail.com</p>
      <p>Hoboken, NJ</p>
    </Card>
  );
}

export default Header;

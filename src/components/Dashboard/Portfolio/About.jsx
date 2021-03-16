import React, { useState } from "react";
import Card from "./../../Card";
import { MdModeEdit } from "react-icons/md";
import AboutModal from "./AboutModal";
import Modal from "./../../Modal";

function About({ portfolio, updateElement, ...otherProps }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Modal
        visible={isEditing}
        title="About"
        Content={AboutModal}
        componentProps={{ about: portfolio.about, updateElement, setIsEditing }}
      />
      <Card className="about" {...otherProps}>
        <div className="control-icons">
          <MdModeEdit
            size={25}
            className={`control-icon ${isEditing ? "active" : null}`}
            onClick={() => setIsEditing(true)}
          />
        </div>
        <h2>About</h2>
        <p>{portfolio.about}</p>
      </Card>
    </>
  );
}

export default About;

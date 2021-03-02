import React, { useState } from "react";
import Card from "./../../Card";
import { MdModeEdit } from "react-icons/md";
import AboutModal from "./AboutModal";
import Modal from "./../../Modal";

const portfolio = {
  about:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, reiciendis modi iusto enim ipsum veniam fuga ad quidem, recusandae id debitis rem quasi magni ut ex deleniti sapiente velit officia eligendi at praesentium laboriosam. Labore molestias ipsa debitis. Illum, aperiam.",
};

function About({ updateElement, ...otherProps }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing && (
        <Modal
          title="About"
          Content={AboutModal}
          componentProps={{ portfolio, updateElement, setIsEditing }}
        />
      )}
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

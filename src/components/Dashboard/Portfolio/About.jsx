import React from "react";
import Card from "./../../Card";
import { MdModeEdit } from "react-icons/md";

function About(props) {
  return (
    <Card className="about" {...props}>
      <MdModeEdit size={25} className="edit-icon" />
      <h2>About</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
        reiciendis modi iusto enim ipsum veniam fuga ad quidem, recusandae id
        debitis rem quasi magni ut ex deleniti sapiente velit officia eligendi
        at praesentium laboriosam. Labore molestias ipsa debitis. Illum,
        aperiam.
      </p>
    </Card>
  );
}

export default About;

import React from "react";
import { Button, TextInput } from "../../components";
import { MdPerson } from "react-icons/md";

function RegisterSlide3({ index, setIndex, slideWidth }) {
  return (
    <div className="slide" style={{ width: slideWidth }}>
      <div className="content">
        <h2 className="auth-title">3</h2>
        <TextInput LeftIcon={MdPerson} placeholder="E.g. Bob Smith" />
      </div>
      <Button label="Next" onClick={() => setIndex(index + 1)} />
      <p>Already have an account?</p>
    </div>
  );
}

export default RegisterSlide3;

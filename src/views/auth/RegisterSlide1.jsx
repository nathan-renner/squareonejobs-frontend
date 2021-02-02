import React from "react";
import { Button, Icon, TextInput } from "../../components";
import { MdArrowBack, MdPerson } from "react-icons/md";
import { NavLink } from "react-router-dom";

function RegisterSlide1({ slideWidth, onNext, onBack }) {
  return (
    <div className="slide" style={{ width: slideWidth }}>
      <div className="content">
        <Icon
          Icon={MdArrowBack}
          size={30}
          color={"background"}
          iconColor={"medium"}
          onClick={onBack}
          className="icon-back"
        />
        <h2 className="auth-title">What's your full name?</h2>
        <TextInput LeftIcon={MdPerson} placeholder="E.g. Bob Smith" />
        <Button label="Next" onClick={onNext} />
        <NavLink to="/auth/login" className="help-text">
          Already have an account?
        </NavLink>
      </div>
    </div>
  );
}

export default RegisterSlide1;

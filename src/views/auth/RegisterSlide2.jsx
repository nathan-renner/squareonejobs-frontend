import React, { useState } from "react";
import { Button, Icon, TextInput } from "../../components";
import {
  MdArrowBack,
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

function RegisterSlide2({ slideWidth, onNext, onBack }) {
  const [passVisible, setPassVisible] = useState(false);

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
        <h2 className="auth-title">Register your email</h2>
        <TextInput LeftIcon={MdEmail} placeholder="Email" />
        <TextInput
          type={passVisible ? "text" : "password"}
          name={passVisible ? "text" : "password"}
          LeftIcon={MdLock}
          placeholder="Password"
          RightIcon={passVisible ? MdVisibilityOff : MdVisibility}
          rightIconSize={30}
          rightIconOnClick={() => setPassVisible(!passVisible)}
        />
        <Button label="Next" onClick={onNext} />
        <NavLink to="/auth/login" className="help-text">
          Already have an account?
        </NavLink>
      </div>
    </div>
  );
}

export default RegisterSlide2;

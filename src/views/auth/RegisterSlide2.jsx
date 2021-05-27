import React, { useState } from "react";
import {
  MdArrowBack,
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useFormikContext } from "formik";

import { Icon } from "../../components";
import { ErrorMessage, FormField, SubmitButton } from "../../components/forms";

function RegisterSlide2({ slideWidth, error, onBack }) {
  const { values, handleSubmit } = useFormikContext();
  const [passVisible, setPassVisible] = useState(false);

  return (
    <div className="slide" style={{ width: slideWidth }}>
      <div
        className="content"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      >
        <Icon
          Icon={MdArrowBack}
          size={30}
          color={"background"}
          iconColor={"medium"}
          onClick={onBack}
          className="icon-back"
          style={{ left: `${slideWidth}px` }}
        />
        <h3 className="auth-title">
          Hi, {values["name"].substr(0, values["name"].indexOf(" "))}!
          <br />
          Register your email
        </h3>
        <FormField
          name="email"
          LeftIcon={MdEmail}
          placeholder="Email"
          size="sm"
        />
        <FormField
          type={passVisible ? "text" : "password"}
          name="password"
          LeftIcon={MdLock}
          placeholder="Password"
          RightIcon={passVisible ? MdVisibilityOff : MdVisibility}
          rightIconSize={30}
          rightIconOnClick={() => setPassVisible(!passVisible)}
          size="sm"
        />
        <ErrorMessage error={error} visible={error} />
        <SubmitButton label="Next" />
        <NavLink to="/auth/login" className="help-text">
          Already have an account?
        </NavLink>
      </div>
    </div>
  );
}

export default RegisterSlide2;

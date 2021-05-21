import React from "react";
import { NavLink } from "react-router-dom";
import { useFormikContext } from "formik";
import { MdArrowBack, MdPerson } from "react-icons/md";

import { Button, Icon } from "../../components";
import { FormField } from "../../components/forms";

function RegisterSlide1({ slideWidth, onNext, onBack }) {
  const { values, errors } = useFormikContext();
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
        <h3 className="auth-title">What's your full name?</h3>
        <FormField
          name="name"
          LeftIcon={MdPerson}
          placeholder="E.g. Bob Smith"
          size="sm"
        />
        <Button
          label="Next"
          onClick={!values["name"] || errors["name"] ? null : onNext}
        />
        <NavLink to="/auth/login" className="help-text">
          Already have an account?
        </NavLink>
      </div>
    </div>
  );
}

export default RegisterSlide1;

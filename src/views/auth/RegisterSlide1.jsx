import React from "react";
import { NavLink } from "react-router-dom";
import { useFormikContext } from "formik";
import { MdArrowBack, MdPerson } from "react-icons/md";

import { Button, Icon, GoogleButton } from "../../components/common";
import { ErrorMessage, FormField } from "../../components/forms";

function RegisterSlide1({ slideWidth, onNext, onBack, responseGoogle, error }) {
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
        <h3 className="auth-title no-bottom">
          Sign up <br />
          What's your full name?
        </h3>
        <NavLink to="/auth/login" className="help-text bottom">
          Already have an account?
        </NavLink>
        <FormField
          name="name"
          LeftIcon={MdPerson}
          placeholder="E.g. Bob Smith"
          size="sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              return !values["name"] || errors["name"] ? null : onNext();
            }
          }}
        />
        <ErrorMessage error={error} visible={error} />
        <Button
          label="Next"
          onClick={!values["name"] || errors["name"] ? null : onNext}
        />
        <hr />
        <GoogleButton response={responseGoogle} login={false} />
      </div>
    </div>
  );
}

export default RegisterSlide1;

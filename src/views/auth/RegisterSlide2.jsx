import React, { useState } from "react";
import {
  MdArrowBack,
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { useFormikContext } from "formik";

import { Icon } from "../../components/common";
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
        <FormField name="email" LeftIcon={MdEmail} label="Email" />
        <FormField
          type={passVisible ? "text" : "password"}
          name="password"
          LeftIcon={MdLock}
          label="Password"
          RightIcon={passVisible ? MdVisibilityOff : MdVisibility}
          rightIconOnClick={() => setPassVisible(!passVisible)}
        />
        <div className="google-text">
          By creating an account you agree to the SquareOneJobs{" "}
          <a
            href="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/legal/SquareOneJobs+Terms+and+Conditions.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/legal/SquareOneJobs+Privacy+Policy.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
        </div>
        <ErrorMessage error={error} visible={error} />
        <SubmitButton label="Next" />
      </div>
    </div>
  );
}

export default RegisterSlide2;

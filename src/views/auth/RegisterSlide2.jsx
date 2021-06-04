import React, { useState } from "react";
import {
  MdArrowBack,
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
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
        <div className="google-text">
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noreferrer"
          >
            Terms of Service
          </a>{" "}
          apply.
        </div>
        <ErrorMessage error={error} visible={error} />
        <SubmitButton label="Next" />
      </div>
    </div>
  );
}

export default RegisterSlide2;

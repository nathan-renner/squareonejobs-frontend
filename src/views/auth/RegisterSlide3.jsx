import React from "react";
import { Button } from "../../components/common";
import ErrorMessage from "./../../components/forms/ErrorMessage";

function RegisterSlide3({ slideWidth, onResendLink, error }) {
  return (
    <div className="slide" style={{ width: slideWidth }}>
      <div className="content">
        <h3 className="auth-title">Verify Email</h3>
        <p className="auth-description">
          We've sent you an email. Follow the instructions in the email to
          verify your account.
        </p>
        <Button label="Resend link" onClick={onResendLink} />
        <ErrorMessage error={error} visible={error} />
      </div>
    </div>
  );
}

export default RegisterSlide3;

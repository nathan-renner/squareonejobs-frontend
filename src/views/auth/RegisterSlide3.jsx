import React from "react";
import { Button } from "../../components";
import ErrorMessage from "./../../components/forms/ErrorMessage";

function RegisterSlide3({ slideWidth, onResendLink, error }) {
  return (
    <div className="slide" style={{ width: slideWidth }}>
      <div className="content">
        <h2 className="auth-title">Verify Email</h2>
        <p className="auth-description">
          We've sent you an email. Follow the instructions to verify your
          account.
        </p>
        <Button label="Resend link" onClick={onResendLink} />
        <ErrorMessage error={error} visible={error} />
      </div>
    </div>
  );
}

export default RegisterSlide3;

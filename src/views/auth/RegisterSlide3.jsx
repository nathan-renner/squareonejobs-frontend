import React from "react";
import { Button } from "../../components";

function RegisterSlide3({ slideWidth }) {
  const onResendEmail = () => {};

  return (
    <div className="slide" style={{ width: slideWidth }}>
      <div className="content">
        <h2 className="auth-title">Verify Email</h2>
        <p className="auth-description">
          We've sent you an email. Follow the instructions to verify your
          account.
        </p>
        <Button label="Resend link" onClick={onResendEmail} />
      </div>
    </div>
  );
}

export default RegisterSlide3;

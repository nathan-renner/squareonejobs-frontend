import React, { useState } from "react";

import { Button, Card } from "../../components/common";

import useApi from "../../hooks/useApi";
import { resendLinkEmployer } from "./../../api/auth";
import { useLocation } from "react-router-dom";

function PostJob3(props) {
  const resendLinkApi = useApi(resendLinkEmployer);
  const [error, setError] = useState(false);
  const { state: prevState } = useLocation();

  const handleResendLink = async () => {
    const email = { email: prevState.email };

    const result = await resendLinkApi.request(email);
    if (!result.ok) {
      if (result.data) setError(result.data);
      else setError("An unexpected error occurred.");
    }
  };

  return (
    <>
      <Card className="auth-container extended postjob">
        <h1>Verify Email</h1>
        <p className="subtitle">
          We've sent you an email. Follow the instructions in the email to
          verify your account.
        </p>
        <div>
          <Button
            label="Resend link"
            onClick={handleResendLink}
            buttonStyle={{ marginLeft: "50%", transform: "translateX(-50%)" }}
          />
        </div>
        {error && (
          <p style={{ textAlign: "center", color: "#ff5252" }}>{error}</p>
        )}
      </Card>
    </>
  );
}

export default PostJob3;

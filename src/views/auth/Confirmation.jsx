import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Lottie from "lottie-react";

import Success from "../../assets/animations/success.json";
import Failed from "../../assets/animations/failed.json";

import { ActivityIndicator, Button, Card } from "../../components/common";

import {
  confirmEmail,
  resendLink,
  confirmEmailEmployer,
  resendLinkEmployer,
} from "../../api/auth";
import useApi from "../../hooks/useApi";

function Confirmation() {
  const [confirmed, setConfirmed] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [error, setError] = useState(false);
  const { userId, code, isEmployer } = useParams();
  const confirmationApi = useApi(
    isEmployer ? confirmEmailEmployer : confirmEmail
  );
  const resendLinkApi = useApi(isEmployer ? resendLinkEmployer : resendLink);

  useEffect(() => {
    const sendEmail = async () => {
      const result = await confirmationApi.request(userId, code);
      if (!result.ok) return setError(result.data);
      else setConfirmed(true);
    };
    if (!confirmed && !confirmationApi.loading && !confirmationApi.error)
      sendEmail();
  });

  const handleResendLink = async () => {
    const id = { userId };
    const result = await resendLinkApi.request(id);
    if (!result.ok) {
      if (result.data) setError(result.data);
      else {
        setError("An unexpected error occurred.");
      }
      return;
    } else {
      setLinkSent(true);
      setError(false);
    }
  };

  return (
    <Card className="auth-container">
      <ActivityIndicator
        visible={confirmationApi.loading || resendLinkApi.loading}
      />
      <div className="single-slide-container">
        {(confirmed || linkSent) && !error && (
          <>
            <Lottie
              animationData={Success}
              loop={true}
              autoplay={true}
              style={{ height: 200, width: 200 }}
            />
            <h2 className="auth-title">
              {confirmed ? "Email Confirmed!" : "Link Resent!"}
            </h2>
            <p className="auth-description">
              {confirmed
                ? "Login to your account to get started!"
                : "Follow the instructions in the email you received."}
            </p>
            <NavLink
              onClick={(e) => (!confirmed ? e.preventDefault() : null)}
              to="/auth/login"
              className="login-button"
            >
              <Button
                label={confirmed ? "Login" : "Resend link"}
                onClick={confirmed ? () => true : handleResendLink}
              />
            </NavLink>
          </>
        )}
        {error && (
          <>
            <Lottie
              animationData={Failed}
              loop={true}
              autoplay={true}
              style={{ height: 200, width: 200 }}
            />
            <h2 className="auth-title">Confirmed Failed</h2>
            <p className="auth-description">Resend the email and try again!</p>
            <Button label="Resend link" onClick={handleResendLink} />
          </>
        )}
      </div>
    </Card>
  );
}

export default Confirmation;

import React from "react";
import GoogleLogin from "react-google-login";
import GoogleIcon from "./../icons/GoogleIcon";

function GoogleButton({ response = () => true, login = true }) {
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
      render={(renderProps) => (
        <div
          className="google-button"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <GoogleIcon width={18} height={18} />
          <p>{login ? "Log in with Google" : "Sign up with Google"}</p>
        </div>
      )}
      buttonText="Login"
      onSuccess={response}
      onFailure={response}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default GoogleButton;

import React from "react";
import Register from "./../views/auth/Register";

function Auth(props) {
  return (
    <div className="auth">
      <div className="navbar">nav</div>
      <div className="content-container">
        <Register />
      </div>
    </div>
  );
}

export default Auth;

import React from "react";

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <p className="error-text">{error}</p>;
}

export default ErrorMessage;

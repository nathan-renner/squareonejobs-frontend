import React from "react";

function ErrorMessage({ error, visible, className }) {
  if (!visible || !error) return null;

  return <p className={`error-text ${className}`}>{error}</p>;
}

export default ErrorMessage;

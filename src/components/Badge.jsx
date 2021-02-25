import React from "react";

function Badge({ color = "#51cc8e", text }) {
  return (
    <div className="badge">
      <p>{text}</p>
    </div>
  );
}

export default Badge;

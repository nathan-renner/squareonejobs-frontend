import React from "react";

function ProgressBar({
  height = 20,
  width = "100%",
  color = "#51cc8e",
  completed = 0,
}) {
  const container = {
    height,
    width,
    border: `1.4px solid ${color}`,
    borderRadius: height / 2,
    overflow: "hidden",
  };
  const progress = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: color,
  };

  return (
    <div style={container}>
      <div style={progress} />
    </div>
  );
}

export default ProgressBar;

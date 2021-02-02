import React from "react";

function Icon({
  Icon: Component,
  size = 24,
  color = "medium",
  iconColor = "white",
  onClick,
  className,
}) {
  return (
    <div
      className={`bg-${color} ${className}`}
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...{ onClick }}
    >
      <Component size={size * 0.6} className={`text-${iconColor}`} />
    </div>
  );
}

export default Icon;

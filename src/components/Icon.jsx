import React from "react";

function Icon({
  Icon: Component,
  size = 24,
  color = "medium",
  iconColor = "white",
  onClick = () => true,
  className = "",
  style = {},
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
        flexShrink: 0,
        ...style,
      }}
      {...{ onClick }}
    >
      <Component size={size * 0.6} className={`text-${iconColor}`} />
    </div>
  );
}

export default Icon;

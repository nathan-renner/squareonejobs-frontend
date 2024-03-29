import React from "react";

function Icon({
  Icon: Component,
  size = 24,
  sizeFactor = 0.6,
  color = "medium",
  iconColor = "white",
  onClick = () => true,
  className = "",
  style = {},
}) {
  return (
    <div
      className={`icon bg-${color} ${className}`}
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        display: "grid",
        placeItems: "center",
        ...style,
      }}
      {...{ onClick }}
    >
      <Component size={size * sizeFactor} className={`text-${iconColor}`} />
    </div>
  );
}

export default Icon;

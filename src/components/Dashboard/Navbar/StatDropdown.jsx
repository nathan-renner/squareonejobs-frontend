import React from "react";

function StatDropdown({ hover, setHover, data }) {
  const { name, title, subtitle, Icon, stat } = data;
  return (
    <div
      className={`nav-dropdown stat-dropdown ${name} ${
        hover ? "active" : null
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h3>{title}</h3>
      <p className="subtitle">{subtitle}</p>
      <div className="icon-container">
        <Icon className="icon-lg" />
        <p className="stat-text">{stat}</p>
      </div>
    </div>
  );
}

export default StatDropdown;

import React from "react";

function StatDropdown({ visible, data }) {
  const { name, title, subtitle, Icon, stat } = data;
  return (
    <div
      className={`nav-dropdown stat-dropdown ${name} ${
        visible ? "active" : null
      }`}
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

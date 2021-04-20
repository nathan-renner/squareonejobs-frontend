import React from "react";
import moment from "moment";
import StreakIcon from "./../../icons/StreakIcon";

function StreakDropdown({ visible, streak }) {
  const icons = [1, 2, 3, 4, 5, 6, 7];

  const renderIcons = () => {
    const today = moment();
    let day = moment().subtract(4, "days");
    let styleIcon, styleText, styleDay;
    return icons.map((i, index) => {
      day = day.add(1, "day");
      styleDay = "day-text ";
      if (day.format("D") === today.format("D")) {
        styleIcon = "day-icon active ";
        styleText = "day-text active ";
        styleDay = styleDay + "text-orange";
      } else if (day.diff(today, "days") > 0) {
        styleIcon = "day-icon";
        styleText = "day-text";
      } else if (Math.round(today.diff(day, "days", true)) < streak) {
        styleIcon = "day-icon active ";
        styleText = "day-text active ";
      } else {
        styleIcon = "day-icon";
        styleText = "day-text";
      }

      return (
        <div className="icon-container" key={index}>
          <div className={styleIcon}>
            <p className={styleText}>{day.format("dd")}</p>
          </div>
          <p className={styleDay}>{day.format("D")}</p>
        </div>
      );
    });
  };

  return (
    <div
      className={`nav-dropdown streak-dropdown ${visible ? "active" : null}`}
    >
      <div className="header">
        <h3>Daily Streak</h3>
        <p className="subtitle">
          Log in and earn points every day to build your streak
        </p>
        <div className="stat">
          <StreakIcon height={60} width={60} />
          <p>{streak}</p>
        </div>
      </div>
      <div className="icons-container">{renderIcons()}</div>
    </div>
  );
}

export default StreakDropdown;

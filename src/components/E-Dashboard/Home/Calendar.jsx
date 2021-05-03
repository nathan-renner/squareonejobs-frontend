import React, { useState } from "react";
import Calendar from "react-calendar";

function CalendarCard({ ...props }) {
  const [value, onChange] = useState(new Date());

  return (
    <div className="card" style={{ padding: "10px" }} {...props}>
      <Calendar
        className="custom-react-calendar"
        calendarType={"US"}
        value={value}
        onChange={onChange}
        onClickDay={(value, event) => console.log("Clicked day: ", value)}
        onClickMonth={(value, event) => console.log("Clicked mohtn: ", value)}
      />
    </div>
  );
}

export default CalendarCard;

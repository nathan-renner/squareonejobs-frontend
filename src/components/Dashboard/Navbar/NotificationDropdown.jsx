import React from "react";
import { FaBullhorn } from "react-icons/fa";
import moment from "moment";

import FakeImg from "../../../assets/images/icon-dark.png";
import Icon from "./../../Icon";

const newNotifs = [
  {
    id: 1,
    dateCreated: moment().add(1, "second"),
    clicked: false,
    notificationType: "Announcement",
    linkId: 1,
    message:
      "This is the message! congrats, you've got a message! Nice message!",
    image: FakeImg,
  },
  {
    id: 2,
    dateCreated: moment().add(4, "hours"),
    clicked: true,
    notificationType: "Announcement",
    linkId: 1,
    message:
      "This is the message! congrats, you've got a message! Nice message!",
    image: "",
  },
];

const earlierNotifs = [
  {
    id: 1,
    dateCreated: moment().add(6, "hours"),
    clicked: false,
    notificationType: "Announcement",
    linkId: 1,
    message:
      "This is the message! congrats, you've got a message! Nice message!",
    image: "",
  },
  {
    id: 2,
    dateCreated: moment().add(12, "days"),
    clicked: false,
    notificationType: "Announcement",
    linkId: 1,
    message:
      "This is the message! congrats, you've got a message! Nice message!",
    image: "",
  },
];

function NotificationDropdown({ notifHover, setNotifHover }) {
  const renderNotifs = (notifs) => {
    return notifs.map((notif) => (
      <div
        key={notif.id}
        onClick={() => console.log(notif.message)}
        className="notif-container"
      >
        <div className="left">
          {notif.image ? (
            <>
              <img src={notif.image} alt="announcement" />
              <Icon
                Icon={FaBullhorn}
                className="icon-sm"
                color="secondary"
                size={15}
              />
            </>
          ) : (
            <Icon
              Icon={FaBullhorn}
              className="icon-md"
              color="secondary"
              size={40}
            />
          )}
        </div>
        <div className="details-container">
          <p className={`msg-text ${notif.clicked ? "clicked" : null}`}>
            {notif.message}
          </p>
          <p className={`date-text ${notif.clicked ? "clicked" : null}`}>
            {moment().from(notif.dateCreated)}
          </p>
        </div>
        {!notif.clicked && <div className="new-msg-circle" />}
      </div>
    ));
  };

  return (
    <div
      className={`nav-dropdown notif-dropdown ${notifHover ? "active" : null}`}
      onMouseEnter={() => setNotifHover(true)}
      onMouseLeave={() => setNotifHover(false)}
    >
      <h3>Notifications</h3>
      <div>
        <h3>New</h3>
        {renderNotifs(newNotifs)}
      </div>
      <div>
        <h3>Earlier</h3>
        {renderNotifs(earlierNotifs)}
      </div>
    </div>
  );
}

export default NotificationDropdown;

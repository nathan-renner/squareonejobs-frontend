import React, { useEffect, useState } from "react";
import { FaBullhorn } from "react-icons/fa";
import moment from "moment";

import FakeImg from "../../../assets/images/icon-dark.png";
import Icon from "./../../Icon";
import useApi from "./../../../hooks/useApi";
import { getNotifications } from "../../../api/users";
import ActivityIndicator from "./../../ActivityIndicator";

// const newNotifs = [
//   {
//     id: 1,
//     dateCreated: moment().add(1, "second"),
//     clicked: false,
//     notificationType: "Announcement",
//     linkId: 1,
//     message:
//       "This is the message! congrats, you've got a message! Nice message!",
//     image: FakeImg,
//   },
//   {
//     id: 2,
//     dateCreated: moment().add(4, "hours"),
//     clicked: true,
//     notificationType: "Announcement",
//     linkId: 1,
//     message:
//       "This is the message! congrats, you've got a message! Nice message!",
//     image: "",
//   },
// ];

// const earlierNotifs = [
//   {
//     id: 1,
//     dateCreated: moment().add(6, "hours"),
//     clicked: false,
//     notificationType: "Announcement",
//     linkId: 1,
//     message:
//       "This is the message! congrats, you've got a message! Nice message!",
//     image: "",
//   },
//   {
//     id: 2,
//     dateCreated: moment().add(12, "days"),
//     clicked: false,
//     notificationType: "Announcement",
//     linkId: 1,
//     message:
//       "This is the message! congrats, you've got a message! Nice message!",
//     image: "",
//   },
// ];

function NotificationDropdown({ visible }) {
  const [notifications, setNotifications] = useState(false);
  const getNotificationsApi = useApi(getNotifications);

  const fetchNotifications = async () => {
    const response = await getNotificationsApi.request();
    if (response.ok) setNotifications(response.data);
  };

  useEffect(() => {
    if (visible && !notifications) fetchNotifications();
  }, [visible]);

  const renderNotifs = (notifs) => {
    return notifs.map((notif) => (
      <div
        key={notif._id}
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
    <div className={`nav-dropdown notif-dropdown ${visible ? "active" : null}`}>
      <h3>Notifications</h3>
      <ActivityIndicator visible={getNotificationsApi.loading} />
      {notifications && (
        <>
          <div>
            <h3>New</h3>
            {notifications.new.length === 0 ? (
              <p style={{ fontSize: ".9em" }}>No new notifications.</p>
            ) : (
              <>{renderNotifs(notifications.new)} </>
            )}
          </div>
          <div>
            <h3>Earlier</h3>
            {renderNotifs(notifications.earlier)}
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationDropdown;

import React, { useEffect, useState } from "react";
import { FaBullhorn } from "react-icons/fa";
import moment from "moment";

import Icon from "./../../Icon";
import useApi from "./../../../hooks/useApi";
import { getNotifications } from "../../../api/users";
import ActivityIndicator from "./../../ActivityIndicator";
import { useResponseModal } from "./../../../hooks/useResponseModal";

function NotificationDropdown({ visible }) {
  const [notifications, setNotifications] = useState(false);
  const { setModal } = useResponseModal();
  const getNotificationsApi = useApi(getNotifications);

  const fetchNotifications = async () => {
    const response = await getNotificationsApi.request();
    if (response.ok) setNotifications(response.data);
    else {
      setModal({
        type: "error",
        header: "Something went wrong.",
        body: response.data,
      });
    }
  };

  useEffect(() => {
    if (visible && !notifications) fetchNotifications();
    //eslint-disable-next-line
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
            {moment(notif.dateCreated).fromNow()}
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
            {notifications.earlier.length === 0 ? (
              <p style={{ fontSize: ".9em" }}>No new notifications.</p>
            ) : (
              <>{renderNotifs(notifications.earlier)} </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationDropdown;

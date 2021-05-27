import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaBullhorn } from "react-icons/fa";
import { BiSpreadsheet } from "react-icons/bi";
import { MdFeedback, MdPerson, MdCreditCard, MdWarning } from "react-icons/md";
import moment from "moment";

import useApi from "./../../../hooks/useApi";

import Icon from "./../../Icon";
import ActivityIndicator from "./../../ActivityIndicator";

import { getNotifications, updateClicked } from "../../../api/notifications";
import { useResponseModal } from "./../../../hooks/useResponseModal";

function NotificationDropdown({ visible, closeDropdown }) {
  const history = useHistory();
  const [notifications, setNotifications] = useState(false);
  const { setModal } = useResponseModal();
  const getNotificationsApi = useApi(getNotifications);
  const updateClickedApi = useApi(updateClicked);

  const fetchNotifications = async () => {
    const response = await getNotificationsApi.request();
    if (response.ok) setNotifications(response.data);
    else
      setModal({
        type: "error",
        header: "Something went wrong.",
        body: response.data,
      });
  };

  useEffect(() => {
    if (visible && !notifications) fetchNotifications();
    //eslint-disable-next-line
  }, [visible]);

  const getDetails = (type, id) => {
    if (type === "listing") {
      return {
        route: `/listing/${id}`,
        color: "secondary",
        Icon: BiSpreadsheet,
      };
    } else if (type === "reminder") {
      return {
        route: `/listing/${id}`,
        color: "orange",
        Icon: FaBullhorn,
      };
    } else if (type === "user") {
      return {
        route: `/user/${id}`,
        color: "secondary",
        Icon: MdPerson,
      };
    } else if (type === "feedback") {
      return {
        route: "/portfolio",
        color: "yellow",
        Icon: MdFeedback,
      };
    } else if (type === "payment") {
      return {
        route: "/payments",
        color: "primary",
        Icon: MdCreditCard,
      };
    } else if (type === "announcement") {
      return {
        route: false,
        color: "orange",
        Icon: FaBullhorn,
      };
    } else if (type === "other") {
      return {
        route: false,
        color: "medium",
        Icon: MdWarning,
      };
    }
    // else if (type === "company")
    //   return `company/${id}`;
  };

  const handleRouteClick = async (route, id, clicked) => {
    if (!clicked) await updateClickedApi.request(id);
    closeDropdown();
    return route && history.push(route);
  };

  const renderNotifs = (notifs) => {
    return notifs.map((notif) => {
      const {
        route,
        color,
        Icon: notifIcon,
      } = getDetails(notif.type, notif.linkId);
      return (
        <div
          key={notif._id}
          onClick={() => handleRouteClick(route, notif._id, notif.clicked)}
          className="notif-container"
        >
          <div className="left">
            {notif.image ? (
              <>
                <img src={notif.image} alt="announcement" />
                <Icon
                  Icon={notifIcon}
                  className="icon-sm"
                  color={color}
                  size={15}
                />
              </>
            ) : (
              <Icon
                Icon={notifIcon}
                className="icon-md"
                color={color}
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
      );
    });
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
              <p style={{ fontSize: ".9em", marginBottom: 0 }}>
                No new notifications.
              </p>
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

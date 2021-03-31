import React, { useRef } from "react";
import * as Yup from "yup";
import { MdModeEdit } from "react-icons/md";

import Form from "./../../forms/Form";
import FormField from "./../../forms/FormField";

import defaultAvatar from "../../../assets/images/default-avatar.png";
import Icon from "./../../Icon";

const schema = {
  firstName: Yup.string().required().label("First Name").min(1).max(64),
  lastName: Yup.string().required().label("Last Name").min(1).max(64),
};

function HeaderEditModal({ user }) {
  const uploadRef = useRef(null);
  const selectAvatar = () => {
    uploadRef.current.click();
  };

  return (
    <div className="header-modal">
      <h2>Edit your profile</h2>
      <Form>
        <div className="avatar-container" onClick={selectAvatar}>
          <input ref={uploadRef} type="file" accept="image/png,image/jpeg" />

          <img
            src={user.avatar ? user.avatar : defaultAvatar}
            alt={
              user.avatar
                ? `${user.firstName} ${user.lastName}'s avatar`
                : "default avatar"
            }
          />
          <Icon
            className="edit-icon"
            Icon={MdModeEdit}
            size={35}
            color="secondary"
            iconColor="white"
          />
        </div>
        {/* <FormField name="firstName" />
        <FormField name="lastName" />
        <FormField name="streetAddress" />
        <FormField name="city" />
        <FormField name="state" />
        <FormField name="zip" />
        <FormField name="birthday" /> */}
      </Form>
    </div>
  );
}

export default HeaderEditModal;

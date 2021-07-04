import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { MdCameraAlt, MdModeEdit } from "react-icons/md";

import { Card, Icon } from "../../common";
import { Form, FormField, FormDate } from "./../../forms";
import EditControls from "./EditControls";

import useApi from "./../../../hooks/useApi";
import { updateAccount } from "./../../../api/users";
import { useResponseModal } from "./../../../hooks/useResponseModal";

import defaultAvatar from "../../../assets/images/default-avatar.png";

const schema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name").min(1).max(64),
  lastName: Yup.string().required().label("Last Name").min(1).max(64),
  birthday: Yup.date().label("Birthday"),
  street: Yup.string().label("Street"),
  city: Yup.string().label("City"),
  state: Yup.string().label("State"),
  zip: Yup.string().label("Zip code").min(5).max(5),
});

function Header({
  portfolio,
  setLoading,
  setProgress,
  setUploadVisible,
  updateAccountDetails,
  edit = true,
  ...props
}) {
  const { avatar, firstName, lastName, email, details } = portfolio.userDetails;
  const { street, city, state, zip } = details.address;
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const uploadRef = useRef(null);
  const updateAccountApi = useApi(updateAccount);
  const { setModal } = useResponseModal();

  const cancelEditing = () => {
    const result = window.confirm(
      "Are you sure you want to discard your changes?"
    );
    if (result) {
      setFile(null);
      setImagePreview(null);
      uploadRef.current.value = null;
      setIsEditing(false);
    }
  };

  const selectImage = () => {
    uploadRef.current.click();
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let newFile = e.target.files[0];

    reader.onloadend = () => {
      setFile(newFile);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(newFile);
  };

  const handleSubmit = async ({
    firstName,
    lastName,
    birthday,
    street,
    city,
    state,
    zip,
  }) => {
    setProgress(0);
    setUploadVisible(true);
    const updatedData = {
      firstName,
      lastName,
      details: {
        birthday,
        address: {
          street,
          city,
          state,
          zip,
        },
      },
    };

    const json = JSON.stringify(updatedData);
    const formData = new FormData();
    formData.append("data", json);

    if (file !== null) formData.append("avatar", file);
    console.log(file);
    const response = await updateAccountApi.request(formData, (progress) =>
      setProgress(progress)
    );
    if (response.ok) {
      updateAccountDetails(response.data);
      setIsEditing(false);
    } else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
  };

  return (
    <Card className="header" {...props}>
      {edit && (
        <div className="control-icons" onClick={() => setIsEditing(true)}>
          <MdModeEdit
            size={25}
            className={`control-icon ${isEditing ? "active" : null}`}
          />
        </div>
      )}
      <div
        className={`avatar-container ${isEditing ? "editing" : null}`}
        onClick={isEditing ? selectImage : () => true}
      >
        <input
          ref={uploadRef}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          hidden
        />
        <img
          src={
            isEditing && imagePreview
              ? imagePreview
              : avatar
              ? avatar
              : defaultAvatar
          }
          alt="Avatar"
        />
        {isEditing && (
          <Icon
            className="edit-icon"
            Icon={MdCameraAlt}
            size={35}
            color="secondary"
            iconColor="white"
          />
        )}
      </div>
      {isEditing ? (
        <Form
          initialValues={{
            firstName,
            lastName,
            birthday: details.birthday,
            street,
            city,
            state,
            zip,
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <h2 className="edit-title">Overview</h2>
          <FormField name="firstName" label="First name" />
          <FormField name="lastName" label="Last name" />
          <FormDate name="birthday" label="Birthday" />
          <h2 className="edit-title">Address</h2>
          <FormField name="street" label="Street Address" />
          <FormField name="city" label="City" />
          <FormField name="state" label="State" />
          <FormField name="zip" label="Zip Code" />
          <EditControls onCancel={cancelEditing} />
        </Form>
      ) : (
        <div className="details-container">
          <h2 onClick={() => cancelEditing()}>{`${firstName} ${lastName}`}</h2>
          <p>{email}</p>
          {city && state ? <p>{`${city}, ${state}`}</p> : null}
        </div>
      )}
    </Card>
  );
}

export default Header;

import React, { useState } from "react";
import * as Yup from "yup";

import { Card, ResponseModal } from "../../components/common";
import { Form, FormField, SubmitButton } from "../../components/forms";

import useApi from "./../../hooks/useApi";
import { changePassword } from "./../../api/passwords";
import { useHistory } from "react-router";

const schema = Yup.object().shape({
  current: Yup.string().required().label("Current Password"),
  new: Yup.string().required().min(8).max(1024).label("New Password"),
  newConfirm: Yup.string()
    .required()
    .min(8)
    .max(1024)
    .oneOf([Yup.ref("new"), null], "Does not match new password!")
    .label("Confirm New Password"),
});

function ChangePassword(props) {
  const history = useHistory();
  const changePasswordApi = useApi(changePassword);
  const [modal, setModal] = useState(false);

  const handleSubmit = async (i) => {
    const data = { current: i.current, new: i.new };
    const response = await changePasswordApi.request(data);
    if (response.ok)
      setModal({
        type: "success",
        header: "Password Updated",
        onClick: () => history.goBack(),
      });
    else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
        onClick: () => setModal(false),
      });
  };
  return (
    <>
      <ResponseModal
        visible={modal}
        type={modal.type}
        header={modal.header}
        body={modal.body}
        onButtonClick={modal.onClick}
      />
      <Card className="change-password">
        <h2>Change Password</h2>
        <Form
          validationSchema={schema}
          initialValues={{ current: "", new: "", newConfirm: "" }}
          onSubmit={handleSubmit}
        >
          <FormField
            name="current"
            size="sm"
            label="Current Password"
            type="password"
          />
          <FormField
            name="new"
            size="sm"
            label="New Password"
            type="password"
          />
          <FormField
            name="newConfirm"
            size="sm"
            label="Confirm New Password"
            type="password"
          />
          <SubmitButton
            label="Change Password"
            style={{ marginLeft: 0, marginBottom: 0 }}
          />
        </Form>
      </Card>
    </>
  );
}

export default ChangePassword;

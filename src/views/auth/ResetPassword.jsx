import React, { useState } from "react";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";

import { Card } from "../../components";
import { Form, FormField, SubmitButton } from "../../components/forms";
import ResponseModal from "../../components/ResponseModal";
import useApi from "./../../hooks/useApi";
import { resetPassword } from "./../../api/passwords";
import ActivityIndicator from "./../../components/ActivityIndicator";

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

function ResetPassword(props) {
  const history = useHistory();
  const { userId, code } = useParams();
  const [modal, setModal] = useState(false);
  const resetPasswordApi = useApi(resetPassword);

  const handleSubmit = async (i) => {
    const data = { current: i.current, new: i.new };
    console.log(data, userId, code);
    const response = await resetPasswordApi.request(data, userId, code);
    console.log(response.data);
    if (response.ok)
      setModal({
        type: "success",
        header: "Password Updated",
        onClick: () => history.replace("/auth/login"),
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
      <ActivityIndicator visible={resetPasswordApi.loading} />
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

export default ResetPassword;

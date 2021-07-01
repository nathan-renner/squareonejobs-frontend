import React, { useState } from "react";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";

import {
  ActivityIndicator,
  Card,
  ResponseModal,
} from "../../components/common";

import { Form, FormFieldLine, SubmitButton } from "../../components/forms";
import useApi from "./../../hooks/useApi";
import { resetPassword } from "./../../api/passwords";
import { useResponseModal } from "./../../hooks/useResponseModal";

const schema = Yup.object().shape({
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
  const { setModal } = useResponseModal();
  const resetPasswordApi = useApi(resetPassword);

  const handleSubmit = async (i) => {
    const data = { new: i.new };

    const response = await resetPasswordApi.request(data, userId, code);

    if (response.ok)
      setModal({
        header: "Password Updated",
        onButtonClick: () => {
          setModal(false);
          history.replace("/auth/login");
        },
      });
    else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
        onButtonClick: () => setModal(false),
      });
  };

  return (
    <>
      <ActivityIndicator visible={resetPasswordApi.loading} />
      <Card className="change-password">
        <h2>Reset Password</h2>
        <Form
          validationSchema={schema}
          initialValues={{ new: "", newConfirm: "" }}
          onSubmit={handleSubmit}
        >
          <FormFieldLine name="new" label="New Password" type="password" />
          <FormFieldLine
            name="newConfirm"
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

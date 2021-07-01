import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import { sendEmail } from "../../api/passwords";

import { ActivityIndicator, Card } from "../../components/common";
import { Form, FormFieldLine, SubmitButton } from "../../components/forms";

import useApi from "./../../hooks/useApi";
import { useResponseModal } from "./../../hooks/useResponseModal";

const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function ForgotPassword(props) {
  const { state: prevEmail } = useLocation();
  const sendEmailApi = useApi(sendEmail);
  const { setModal } = useResponseModal();

  const handleSubmit = async ({ email }) => {
    const data = { email };

    const response = await sendEmailApi.request(data);
    if (response.ok)
      setModal({
        type: "success",
        header: "Email sent",
        onClick: () => setModal(false),
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
    <Card className="auth-container forgot-password">
      <ActivityIndicator visible={sendEmailApi.loading} />
      <div>
        <h1>Forgot Password</h1>
        <p className="subtitle">
          Enter your email below and follow the instructions in the email you
          received.
        </p>
        <Form
          initialValues={{ email: prevEmail ? prevEmail : "" }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <FormFieldLine name="email" label="Email" />
          <SubmitButton label="send" />
        </Form>
      </div>
    </Card>
  );
}

export default ForgotPassword;

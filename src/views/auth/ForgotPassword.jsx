import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import { sendEmail } from "../../api/passwords";

import { Card } from "../../components";
import { Form, FormField, SubmitButton } from "../../components/forms";
import ResponseModal from "../../components/ResponseModal";
import ActivityIndicator from "./../../components/ActivityIndicator";
import useApi from "./../../hooks/useApi";

const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function ForgotPassword(props) {
  const { state: prevEmail } = useLocation();
  const sendEmailApi = useApi(sendEmail);
  const [modal, setModal] = useState(false);

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
      <ResponseModal
        visible={modal}
        type={modal.type}
        header={modal.header}
        body={modal.body}
        onButtonClick={modal.onClick}
      />
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
          <FormField name="email" size="sm" placeholder="Email" />
          <SubmitButton label="send" />
        </Form>
      </div>
    </Card>
  );
}

export default ForgotPassword;

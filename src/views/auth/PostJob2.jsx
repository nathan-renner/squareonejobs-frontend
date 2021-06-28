import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";
import { MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import _ from "underscore";

import { Button, Card, UploadScreen } from "../../components/common";
import { FormField, SubmitButton } from "../../components/forms";

import useApi from "../../hooks/useApi";
import useAuth from "./../../auth/useAuth";
import { registerEmployer } from "../../api/employers";

const schema = Yup.object().shape({
  name: Yup.string()
    .required()
    .label("Full name")
    .trim()
    .matches(/^(.*\s+.*)+$/, "Must enter first and last name")
    .max(128),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password").min(8).max(1024),
  position: Yup.string().label("Position").min(1).max(128).required(),
});

function PostJob2(props) {
  const history = useHistory();
  const { state: data } = useLocation();
  const { login } = useAuth();
  const [passVisible, setPassVisible] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const registerEmployerApi = useApi(registerEmployer);
  const recaptchaRef = useRef();

  const handleSubmit = async (i) => {
    const token = await recaptchaRef.current.executeAsync();
    if (token) {
      setProgress(0);
      setUploadVisible(true);
      const index = i.name.indexOf(" ");
      i.firstName = i.name.substr(0, index);
      i.lastName = i.name.substr(index + 1);

      const info = { ...i, ...data };

      let finalData;
      if (info.companyId) {
        finalData = _.pick(info, [
          "firstName",
          "lastName",
          "email",
          "password",
          "position",
          "companyId",
        ]);
      } else
        finalData = _.omit(info, [
          "companyId",
          "companyLogo",
          "imagePreview",
          "name",
        ]);

      const json = JSON.stringify(finalData);
      const formData = new FormData();
      formData.append("data", json);

      if (!info.companyId) formData.append("logo", i.companyLogo);

      const response = await registerEmployerApi.request(formData, (progress) =>
        setProgress(progress)
      );
      if (response.ok) {
        login(response.headers["x-auth-token"]);
        history.push("/");
      }
    }
  };
  return (
    <>
      <Card className="auth-container extended postjob">
        <h1>Almost there!</h1>
        <p className="subtitle">Now, a bit about you.</p>
        <div className="company-form">
          <Formik
            initialValues={
              data
                ? {
                    name: "",
                    email: "",
                    password: "",
                    position: "",
                    ...data,
                  }
                : {
                    name: "",
                    email: "",
                    password: "",
                    position: "",
                  }
            }
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ values, handleSubmit }) => (
              <div onKeyDown={(e) => e.key === "Enter" && handleSubmit()}>
                <FormField name="name" size="sm" label="Full Name" />
                <FormField name="position" size="sm" label="Position" />
                <FormField name="email" size="sm" label="Email" />
                <FormField
                  name="password"
                  size="sm"
                  label="Password"
                  type={passVisible ? "text" : "password"}
                  LeftIcon={MdLock}
                  RightIcon={passVisible ? MdVisibilityOff : MdVisibility}
                  rightIconSize={30}
                  rightIconOnClick={() => setPassVisible(!passVisible)}
                />
                <div className="google-text">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms of Service
                  </a>{" "}
                  apply.
                </div>
                <div className="logo-input"></div>
                <div className="success-button">
                  <Button
                    label="back"
                    color="white"
                    outline
                    textColor="primary"
                    onClick={() =>
                      history.push("/auth/postjob", { ...data, ...values })
                    }
                  />
                  <SubmitButton label="Submit" />
                </div>
              </div>
            )}
          </Formik>
        </div>
      </Card>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
      />
    </>
  );
}

export default PostJob2;

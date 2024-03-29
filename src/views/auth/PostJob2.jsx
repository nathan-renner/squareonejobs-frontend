import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";
import {
  MdPerson,
  MdEmail,
  MdLock,
  MdAssignment,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import _ from "underscore";

import { Button, Card, UploadScreen } from "../../components/common";
import { FormField, SubmitButton } from "../../components/forms";

import useApi from "../../hooks/useApi";
import { registerEmployer } from "../../api/employers";
import { useResponseModal } from "./../../hooks/useResponseModal";

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .label("Full name")
    .trim()
    .matches(/^(.*\s+.*)+$/, "Must enter first and last name")
    .max(128),
  email: Yup.string().email().required("Required").label("Email"),
  password: Yup.string()
    .required("Required")
    .label("Password")
    .min(8)
    .max(1024),
  position: Yup.string().label("Position").min(1).max(128).required("Required"),
});

function PostJob2(props) {
  const history = useHistory();
  const { state: data } = useLocation();
  const { setModal } = useResponseModal();
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
        //login(response.headers["x-auth-token"]);
        history.push("/auth/postjob-3", { email: finalData.email });
      } else
        setModal({
          type: "error",
          header: "Something went wrong.",
          body: response.data,
        });
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
                <FormField name="name" label="Full Name" LeftIcon={MdPerson} />
                <FormField
                  name="position"
                  label="Position"
                  LeftIcon={MdAssignment}
                />
                <FormField name="email" label="Email" LeftIcon={MdEmail} />
                <FormField
                  name="password"
                  label="Password"
                  type={passVisible ? "text" : "password"}
                  LeftIcon={MdLock}
                  RightIcon={passVisible ? MdVisibilityOff : MdVisibility}
                  rightIconOnClick={() => setPassVisible(!passVisible)}
                />
                <div className="google-text">
                  By creating an account you agree to the SquareOneJobs{" "}
                  <a
                    href="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/legal/SquareOneJobs+Terms+and+Conditions.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/legal/SquareOneJobs+Privacy+Policy.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
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

import React, { useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  MdArrowBack,
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";

import {
  ActivityIndicator,
  Card,
  GoogleButton,
  Icon,
} from "../../components/common";
import {
  ErrorMessage,
  SubmitButton,
  FormField,
} from "./../../components/forms";

import useApi from "../../hooks/useApi.jsx";
import useAuth from "../../auth/useAuth";
import { login, loginWithGoogle } from "../../api/auth";
import { useEffect } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

function Login() {
  const history = useHistory();
  const auth = useAuth();
  const loginApi = useApi(login);
  const loginWithGoogleApi = useApi(loginWithGoogle);
  const [passVisible, setPassVisible] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [token, setToken] = useState(false);
  const recaptchaRef = useRef();

  useEffect(() => {
    const getToken = async () => {
      const rtoken = await recaptchaRef.current.executeAsync();
      setToken(rtoken);
    };
    getToken();
  }, []);

  const handleSignIn = async ({ email, password }) => {
    if (token) {
      const result = await loginApi.request(email, password);
      if (!result.ok) return setLoginFailed(true);
      setLoginFailed(false);
      auth.login(result.data);
      history.push("/");
    }
  };

  const handleSignInWithGoogle = async (response) => {
    if (token && !response.error) {
      const result = await loginWithGoogleApi.request(response.tokenId);
      if (!result.ok) return setLoginFailed(true);
      setLoginFailed(false);
      auth.login(result.data);
      history.push("/");
    }
  };

  return (
    <>
      <Card className="login-page">
        <div className="header">
          <Icon
            Icon={MdArrowBack}
            size={30}
            color={"background"}
            iconColor={"medium"}
            onClick={() => history.goBack()}
            className="icon-back"
          />
          <h3 className="auth-title">Login</h3>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSignIn}
          validationSchema={validationSchema}
        >
          {({ handleSignIn, values }) => (
            <div
              className="content"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSignIn();
                }
              }}
            >
              <FormField name="email" label="Email" LeftIcon={MdEmail} />
              <FormField
                type={passVisible ? "text" : "password"}
                name="password"
                LeftIcon={MdLock}
                label="Password"
                RightIcon={passVisible ? MdVisibilityOff : MdVisibility}
                rightIconOnClick={() => setPassVisible(!passVisible)}
              />
              <ErrorMessage
                error="Invalid email and/or password."
                visible={loginFailed}
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
              <div>
                <SubmitButton label="Login" className="login-button" />
              </div>
              <NavLink
                to={{
                  pathname: "/auth/forgot-password",
                  state: values.email !== "" && values.email,
                }}
                className="help-text"
              >
                Forgot Password?
              </NavLink>
            </div>
          )}
        </Formik>
        <div className="divider" />
        <div className="other-logins">
          <GoogleButton response={handleSignInWithGoogle} />
        </div>
        <NavLink to="/auth/register" className="help-text">
          Don't have an account?
        </NavLink>
      </Card>
      <ActivityIndicator visible={loginApi.loading} />
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
      />
    </>
  );
}

export default Login;

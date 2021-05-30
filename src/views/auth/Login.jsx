import React, { useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import * as Yup from "yup";
import {
  MdArrowBack,
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

import { Card, Icon } from "../../components";
import {
  ErrorMessage,
  FormField,
  SubmitButton,
} from "./../../components/forms";

import useApi from "../../hooks/useApi.jsx";
import { login } from "../../api/auth";
import useAuth from "../../auth/useAuth";
import ActivityIndicator from "./../../components/ActivityIndicator";
import { Formik } from "formik";
import GoogleButton from "../../components/GoogleButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

function Login() {
  const slideRef = useRef();
  const history = useHistory();
  const auth = useAuth();
  const loginApi = useApi(login);
  const [passVisible, setPassVisible] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await loginApi.request(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.login(result.data);
    history.push("/");
  };

  const responseGoogle = (response) => {
    if (!response.error) {
      const { profileObj: user } = response;
      const data = {
        email: user.email,
        password: user.googleId,
      };
      handleSubmit(data);
    }
  };

  return (
    <Card className="auth-container">
      <ActivityIndicator visible={loginApi.loading} />
      <div className="single-slide-container" ref={slideRef}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, values }) => (
            <div
              className="content"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            >
              <Icon
                Icon={MdArrowBack}
                size={30}
                color={"background"}
                iconColor={"medium"}
                onClick={() => history.goBack()}
                className="icon-back"
              />
              <h3 className="auth-title">Login</h3>
              <FormField
                name="email"
                LeftIcon={MdEmail}
                placeholder="Email"
                size="sm"
              />
              <div>
                <FormField
                  type={passVisible ? "text" : "password"}
                  name="password"
                  LeftIcon={MdLock}
                  placeholder="Password"
                  RightIcon={passVisible ? MdVisibilityOff : MdVisibility}
                  rightIconSize={30}
                  rightIconOnClick={() => setPassVisible(!passVisible)}
                  size="sm"
                />
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
              <ErrorMessage
                error="Invalid email and/or password."
                visible={loginFailed}
              />
              <SubmitButton label="Login" className="login-button" />
            </div>
          )}
        </Formik>
        <GoogleButton response={responseGoogle} />
        <NavLink to="/auth/register" className="help-text bottom">
          Don't have an account?
        </NavLink>
      </div>
    </Card>
  );
}

export default Login;

import React, { useEffect, useRef, useState } from "react";
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
  Form,
  FormField,
  SubmitButton,
} from "./../../components/forms";

import useApi from "../../hooks/useApi.jsx";
import { login } from "../../api/auth";
import useAuth from "../../auth/useAuth";
import ActivityIndicator from "./../../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

function Login() {
  const slideRef = useRef();
  const history = useHistory();
  const auth = useAuth();
  const loginApi = useApi(login);
  const [slideWidth, setSlideWidth] = useState();
  const [passVisible, setPassVisible] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  useEffect(() => {
    const width = slideRef.current.clientWidth;
    setSlideWidth(width);
  }, [slideRef]);

  const handleSubmit = async ({ email, password }) => {
    const result = await loginApi.request(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.login(result.data);
    history.push("/");
  };

  return (
    <Card className="auth-container">
      <ActivityIndicator visible={loginApi.loading} />
      <div className="slide-view" ref={slideRef}>
        <div className="slide-container">
          <Form
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <div className="slide" style={{ width: slideWidth }}>
              <div className="content">
                <Icon
                  Icon={MdArrowBack}
                  size={30}
                  color={"background"}
                  iconColor={"medium"}
                  onClick={() => history.goBack()}
                  className="icon-back"
                />
                <h2 className="auth-title">Login</h2>
                <FormField
                  name="email"
                  LeftIcon={MdEmail}
                  placeholder="Email"
                />
                <FormField
                  type={passVisible ? "text" : "password"}
                  name="password"
                  LeftIcon={MdLock}
                  placeholder="Password"
                  RightIcon={passVisible ? MdVisibilityOff : MdVisibility}
                  rightIconSize={30}
                  rightIconOnClick={() => setPassVisible(!passVisible)}
                />
                <ErrorMessage
                  error="Invalid email and/or password."
                  visible={loginFailed}
                />
                <SubmitButton label="Login" />
                <NavLink to="/auth/register" className="help-text">
                  Don't have an account?
                </NavLink>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Card>
  );
}

export default Login;

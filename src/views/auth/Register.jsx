import React, { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { ActivityIndicator, Card } from "../../components/common";
import { Form } from "../../components/forms";

import RegisterSlide1 from "./RegisterSlide1";
import RegisterSlide2 from "./RegisterSlide2";
import RegisterSlide3 from "./RegisterSlide3";

import useApi from "./../../hooks/useApi";
import useAuth from "../../auth/useAuth";
import { register } from "./../../api/users";
import { resendLink } from "../../api/auth";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .label("Full name")
    .trim()
    .matches(/^(.*\s+.*)+$/, "Must enter first and last name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

function Register(props) {
  const slideRef = useRef();
  const registerApi = useApi(register);
  const resendLinkApi = useApi(resendLink);
  const history = useHistory();
  const auth = useAuth();
  const [slideWidth, setSlideWidth] = useState();
  const [index, setIndex] = useState(0);
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const recaptchaRef = useRef();

  useEffect(() => {
    const width = slideRef.current.clientWidth;
    setSlideWidth(width);
  }, [slideRef]);

  const translateX = {
    transform: `translateX(${-1 * slideWidth * index}px)`,
  };

  const onBack = () => setIndex(index - 1);
  const onNext = () => setIndex(index + 1);

  const handleResendLink = async () => {
    const email = { email: data.email };

    const result = await resendLinkApi.request(email);
    if (!result.ok) {
      if (result.data) setError(result.data);
      else {
        setError("An unexpected error occurred.");
      }
      return;
    }
  };

  const responseGoogle = (response) => {
    if (!response.error) {
      const { profileObj: user } = response;
      const data = {
        email: user.email,
        firstName: user.givenName,
        lastName: user.familyName,
        password: user.googleId,
        avatar: user.imageUrl,
        withGoogle: true,
      };

      requestRegister(data, true);
    }
  };

  const handleSubmit = async (data) => {
    const index = data.name.indexOf(" ");
    data.firstName = data.name.substr(0, index);
    data.lastName = data.name.substr(index + 1);

    const userInfo = { ...data };
    delete userInfo.name;
    setData(userInfo);

    await requestRegister(userInfo);

    onNext();
  };

  const requestRegister = async (data, withGoogle = false) => {
    const token = await recaptchaRef.current.executeAsync();
    if (token) {
      const result = await registerApi.request(data);
      if (!result.ok) {
        if (result.data) setError(result.data);
        else {
          setError("An unexpected error occurred.");
        }
        return;
      } else {
        setError(false);
        if (withGoogle) {
          auth.login(result.data);
          history.push("/");
        }
      }
    }
  };

  return (
    <Card className="auth-container">
      <ActivityIndicator visible={registerApi.loading || resendLink.loading} />
      <div className="slide-view" ref={slideRef}>
        <Form
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={registerSchema}
        >
          <div className="slide-container" style={translateX}>
            <RegisterSlide1
              {...{ slideWidth, onNext }}
              onBack={() => history.goBack()}
              responseGoogle={responseGoogle}
              error={error}
            />
            <RegisterSlide2 {...{ slideWidth, onBack, error }} />
            <RegisterSlide3
              {...{ slideWidth, error }}
              onResendLink={handleResendLink}
            />
          </div>
        </Form>
      </div>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
      />
    </Card>
  );
}

export default Register;

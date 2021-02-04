import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { Card } from "../../components";
import { Form } from "../../components/forms";
import RegisterSlide1 from "./RegisterSlide1";
import RegisterSlide2 from "./RegisterSlide2";
import RegisterSlide3 from "./RegisterSlide3";
import ActivityIndicator from "./../../components/ActivityIndicator";
import useApi from "./../../hooks/useApi";
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
  const [slideWidth, setSlideWidth] = useState();
  const [index, setIndex] = useState(0);
  const [data, setData] = useState();
  const [error, setError] = useState(false);

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
    console.log(email);
    const result = await resendLinkApi.request(email);
    if (!result.ok) {
      if (result.data) setError(result.data);
      else {
        setError("An unexpected error occurred.");
      }
      return;
    }
  };

  const handleSubmit = async (data) => {
    const index = data.name.indexOf(" ");
    data.firstName = data.name.substr(0, index);
    data.lastName = data.name.substr(index + 1);

    const userInfo = { ...data };
    delete userInfo.name;
    setData(userInfo);

    const result = await registerApi.request(userInfo);
    if (!result.ok) {
      if (result.data) setError(result.data);
      else {
        setError("An unexpected error occurred.");
      }
      return;
    }

    onNext();
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
            />
            <RegisterSlide2 {...{ slideWidth, onBack, error }} />
            <RegisterSlide3
              {...{ slideWidth, error }}
              onResendLink={handleResendLink}
            />
          </div>
        </Form>
      </div>
    </Card>
  );
}

export default Register;

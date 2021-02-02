import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { Card } from "../../components";
import { Form } from "../../components/forms";
import RegisterSlide1 from "./RegisterSlide1";
import RegisterSlide2 from "./RegisterSlide2";
import RegisterSlide3 from "./RegisterSlide3";

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
  const history = useHistory();
  const [slideWidth, setSlideWidth] = useState();
  const [index, setIndex] = useState(0);
  const [error] = useState(false);

  useEffect(() => {
    const width = slideRef.current.clientWidth;
    setSlideWidth(width);
  }, [slideRef]);

  const translateX = {
    transform: `translateX(${-1 * slideWidth * index}px)`,
  };

  const onBack = () => setIndex(index - 1);
  const onNext = () => setIndex(index + 1);

  const handleSubmit = (data) => {
    const index = data.name.indexOf(" ");
    data.firstName = data.name.substr(0, index);
    data.lastName = data.name.substr(index + 1);

    delete data.name;

    console.log(data);

    //const result = await registerApi.request(userInfo);

    // if (!result.ok) {
    //   if (result.data) setError(result.data.error);
    //   else {
    //     setError("An unexpected error occurred.");
    //     console.log(result);
    //   }
    //   return;
    // }

    // Send verification email on back end when user is created

    onNext();
  };

  return (
    <Card className="auth-container">
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
            <RegisterSlide3 {...{ slideWidth }} />
          </div>
        </Form>
      </div>
    </Card>
  );
}

export default Register;

import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { Card } from "../../components";
import RegisterSlide1 from "./RegisterSlide1";
import RegisterSlide2 from "./RegisterSlide2";
import RegisterSlide3 from "./RegisterSlide3";
import RegisterSlide4 from "./RegisterSlide4";

function Register(props) {
  const slideRef = useRef();
  const history = useHistory();
  const [slideWidth, setSlideWidth] = useState();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const width = slideRef.current.clientWidth;
    setSlideWidth(width);
  }, [slideRef]);

  const translateX = {
    transform: `translateX(${-1 * slideWidth * index}px)`,
  };

  const onBack = () => setIndex(index - 1);
  const onNext = () => setIndex(index + 1);

  return (
    <Card className="auth-container">
      <div className="slide-view" ref={slideRef}>
        <div className="slide-container" style={translateX}>
          <RegisterSlide1
            {...{ index, setIndex, slideWidth, onNext }}
            onBack={() => history.goBack()}
          />
          <RegisterSlide2
            {...{ index, setIndex, slideWidth, onBack, onNext }}
          />
          <RegisterSlide3
            {...{ index, setIndex, slideWidth, onBack, onNext }}
          />
          <RegisterSlide4 {...{ index, setIndex, slideWidth, onBack }} />
        </div>
      </div>
    </Card>
  );
}

export default Register;

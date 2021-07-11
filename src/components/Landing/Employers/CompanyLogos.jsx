import React, { useEffect, useRef, useState } from "react";

import useOnScreen from "../../../hooks/useOnScreen";

function CompanyLogos(props) {
  const [count, setCount] = useState(1);
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    let timeout;
    if (isVisible) {
      timeout = setTimeout(() => {
        count === 11 ? setCount(1) : setCount(count + 1);
      }, 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });

  const getPos = (num) => {
    return `${((count + num) % 11) + 1}`;
  };

  return (
    <section className="bg-white logo-carousel" ref={ref}>
      <div className="carousel-container">
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(6)}
          src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Employers/companyLogos/apple.jpg"
          alt="Apple Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(7)}
          src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Employers/companyLogos/fedex.jpg"
          alt="FedEx Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(8)}
          src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Employers/companyLogos/pepsi.jpg"
          alt="Pepsi Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(9)}
          src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Employers/companyLogos/at_t.jpg"
          alt="A T and T Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(10)}
          src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Employers/companyLogos/goodwill.jpg"
          alt="Goodwill Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(11)}
          src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Employers/companyLogos/general-mills.jpg"
          alt="General Mills Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(1)}
          src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Employers/companyLogos/american-airlines.jpg"
          alt="American Airlines Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(2)}
          src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Employers/companyLogos/home-depot.jpg"
          alt="The Home Depot Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(3)}
          src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Employers/companyLogos/ibm.jpg"
          alt="IBM Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(4)}
          src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Employers/companyLogos/microsoft.jpg"
          alt="Microsoft Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(5)}
          src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Employers/companyLogos/intel.jpg"
          alt="Intel Logo"
        />
      </div>
      <h3>
        These companies are growing rapidly because of employees like our users.
      </h3>
    </section>
  );
}

export default CompanyLogos;

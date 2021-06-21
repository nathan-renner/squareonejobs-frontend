import React, { useEffect, useRef, useState } from "react";
import Apple from "../../../assets/images/companyLogos/apple.jpg";
import Fedex from "../../../assets/images/companyLogos/fedex.jpg";
import Pepsi from "../../../assets/images/companyLogos/pepsi.jpg";
import At_t from "../../../assets/images/companyLogos/at_t.jpg";
import AmericanAirlines from "../../../assets/images/companyLogos/american-airlines.jpg";
import GeneralMills from "../../../assets/images/companyLogos/general-mills.jpg";
import Goodwill from "../../../assets/images/companyLogos/goodwill.jpg";
import HomeDepot from "../../../assets/images/companyLogos/home-depot.jpg";
import Ibm from "../../../assets/images/companyLogos/ibm.jpg";
import Microsoft from "../../../assets/images/companyLogos/microsoft.jpg";
import Intel from "../../../assets/images/companyLogos/intel.jpg";
import useOnScreen from "../../../hooks/useOnScreen";

function CompanyLogos(props) {
  const [count, setCount] = useState(1);
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    isVisible &&
      setTimeout(() => {
        count === 11 ? setCount(1) : setCount(count + 1);
      }, 2000);
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
          src={Apple}
          alt="Apple Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(7)}
          src={Fedex}
          alt="FedEx Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(8)}
          src={Pepsi}
          alt="Pepsi Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(9)}
          src={At_t}
          alt="A T and T Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(10)}
          src={Goodwill}
          alt="Goodwill Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(11)}
          src={GeneralMills}
          alt="General Mills Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(1)}
          src={AmericanAirlines}
          alt="American Airlines Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(2)}
          src={HomeDepot}
          alt="The Home Depot Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(3)}
          src={Ibm}
          alt="IBM Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(4)}
          src={Microsoft}
          alt="Microsoft Logo"
        />
        <img
          loading="lazy"
          className="carousel-item "
          data-item={getPos(5)}
          src={Intel}
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

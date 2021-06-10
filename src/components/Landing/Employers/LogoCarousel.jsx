import React, { useEffect, useState } from "react";
import Apple from "../../../assets/images/companyLogos/apple.png";
import Fedex from "../../../assets/images/companyLogos/fedex.png";
import Pepsi from "../../../assets/images/companyLogos/pepsi.png";
import At_t from "../../../assets/images/companyLogos/at_t.png";
import AmericanAirlines from "../../../assets/images/companyLogos/american-airlines.png";
import GeneralMills from "../../../assets/images/companyLogos/general-mills.png";
import Goodwill from "../../../assets/images/companyLogos/goodwill.png";
import HomeDepot from "../../../assets/images/companyLogos/home-depot.png";
import Ibm from "../../../assets/images/companyLogos/ibm.png";
import Microsoft from "../../../assets/images/companyLogos/microsoft.png";
import Intel from "../../../assets/images/companyLogos/intel.png";

function LogoCarousel(props) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      count === 11 ? setCount(1) : setCount(count + 1);
    }, 2000);
  });

  const getPos = (num) => {
    return `${((count + num) % 11) + 1}`;
  };

  return (
    <section className="bg-white logo-carousel">
      <div className="carousel-container">
        <img
          className="carousel-item "
          data-item={getPos(6)}
          src={Apple}
          alt="Apple Logo"
        />
        <img
          className="carousel-item "
          data-item={getPos(7)}
          src={Fedex}
          alt="FedEx Logo"
        />
        <img
          className="carousel-item "
          data-item={getPos(8)}
          src={Pepsi}
          alt="Pepsi Logo"
        />
        <img
          className="carousel-item "
          data-item={getPos(9)}
          src={At_t}
          alt="A T and T Logo"
        />
        <img
          className="carousel-item "
          data-item={getPos(10)}
          src={Goodwill}
          alt="Goodwill Logo"
        />
        <img
          className="carousel-item "
          data-item={getPos(11)}
          src={GeneralMills}
          alt="General Mills Logo"
        />
        <img
          className="carousel-item "
          data-item={getPos(1)}
          src={AmericanAirlines}
          alt="American Airlines Logo"
        />
        <img
          className="carousel-item "
          data-item={getPos(2)}
          src={HomeDepot}
          alt="The Home Depot Logo"
        />
        <img
          className="carousel-item "
          data-item={getPos(3)}
          src={Ibm}
          alt="IBM Logo"
        />
        <img
          className="carousel-item "
          data-item={getPos(4)}
          src={Microsoft}
          alt="Microsoft Logo"
        />
        <img
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

export default LogoCarousel;

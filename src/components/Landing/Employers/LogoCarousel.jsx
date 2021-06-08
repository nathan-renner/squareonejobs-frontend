import React from "react";
import Apple from "../../../assets/images/companyLogos/apple.png";
import Fedex from "../../../assets/images/companyLogos/fedex.png";
import Pepsi from "../../../assets/images/companyLogos/pepsi.png";

function LogoCarousel(props) {
  return (
    <section className="bg-white logo-carousel">
      <div className="carousel-container container-sm">
        <img className="carousel-item" src={Apple} alt="Apple Logo" />
        <img className="carousel-item" src={Fedex} alt="FedEx Logo" />
        <img className="carousel-item" src={Pepsi} alt="Pepsi Logo" />
      </div>
      <h3>
        These companies are growing rapidly because of employees like our users.
      </h3>
    </section>
  );
}

export default LogoCarousel;

import React, { useState } from "react";
import Navbar from "./../../components/Landing/Navbar";
import Footer from "./../../components/Landing/Footer";
import { Button } from "./../../components/common";

const content = [
  {
    name: "Starter",
    price: 149,
    list: [
      "1 listings per month",
      "5 day jobs per month*",
      "View applicant’s profiles and previous references",
    ],
  },
  {
    name: "Plus",
    price: 349,
    list: [
      "5 listings per month",
      "15 day jobs per month*",
      "View applicant’s profiles and previous references",
      "Access profiles of up to 50 additional users",
    ],
  },
  {
    name: "Premium",
    price: 599,
    list: [
      "12 listings per month",
      "Unlimited day jobs",
      "View applicant’s profiles and previous references",
      "Access entire database of user profiles",
    ],
  },
];

function Pricing(props) {
  const [active, setActive] = useState(1);
  return (
    <div className="landing pricing-page">
      <Navbar className="navbar-light" fixed />
      <div className="container-sm">
        <div className="header">
          <h1>Pricing</h1>
          <p>
            Our comprehensive payment plans allow our services to be accessbile
            to any size company
          </p>
        </div>
        <div className="cards">
          {content.map((item, i) => (
            <div
              className={`price-card ${active === i ? "active" : null}`}
              key={i}
              onClick={() => setActive(i)}
            >
              <h2>{item.name}</h2>
              <div className="circle">
                <div>
                  <h3>
                    <span>$</span>
                    {item.price}
                  </h3>
                  <p>/month</p>
                </div>
              </div>
              <div className="list">
                {item.list.map((it, index) => (
                  <p key={index}>{it}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="action">
          <h3>Selected plan: {content[active].name}</h3>
          <Button label="get started" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Pricing;

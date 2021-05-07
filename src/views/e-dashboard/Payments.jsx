import React from "react";

import PaymentsCard from "./../../components/Dashboard/Payments/PaymentsCard";
import HeaderCard from "./../../components/Dashboard/Payments/HeaderCard";

const payments = [
  {
    _id: 1,
    amount: 40,
    paymentDate: new Date(2021, 2, 1),
    company: "Amazon",
    status: "processing",
  },
  {
    _id: 2,
    amount: 60,
    paymentDate: new Date(2021, 2, 2),
    company: "Walmart",
    status: "complete",
  },
];

function Payments(props) {
  return (
    <div className="payments-page">
      <HeaderCard data-aos="fade-up" data-aos-once={true} />
      <PaymentsCard
        payments={payments}
        data-aos="fade-up"
        data-aos-once={true}
        data-aos-delay="100"
      />
    </div>
  );
}

export default Payments;

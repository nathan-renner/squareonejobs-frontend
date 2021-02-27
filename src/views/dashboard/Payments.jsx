import React from "react";

import PaymentsCard from "./../../components/Payments/PaymentsCard";
import HeaderCard from "./../../components/Payments/HeaderCard";

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
  // {
  //   _id: 3,
  //   amount: 60,
  //   paymentDate: new Date(2021, 2, 2),
  //   company: "Walmart",
  //   status: "complete",
  // },
  // {
  //   _id: 4,
  //   amount: 60,
  //   paymentDate: new Date(2021, 2, 2),
  //   company: "Walmart",
  //   status: "complete",
  // },
  // {
  //   _id: 5,
  //   amount: 60,
  //   paymentDate: new Date(2021, 2, 2),
  //   company: "Walmart",
  //   status: "complete",
  // },
  // {
  //   _id: 6,
  //   amount: 60,
  //   paymentDate: new Date(2021, 2, 2),
  //   company: "Walmart",
  //   status: "complete",
  // },
  // {
  //   _id: 7,
  //   amount: 60,
  //   paymentDate: new Date(2021, 2, 2),
  //   company: "Walmart",
  //   status: "complete",
  // },
  // {
  //   _id: 8,
  //   amount: 60,
  //   paymentDate: new Date(2021, 2, 2),
  //   company: "Walmart",
  //   status: "complete",
  // },
  // {
  //   _id: 9,
  //   amount: 60,
  //   paymentDate: new Date(2021, 2, 2),
  //   company: "Walmart",
  //   status: "complete",
  // },
];

function Payments(props) {
  return (
    <div className="payments-page">
      <HeaderCard />
      <PaymentsCard payments={payments} />
    </div>
  );
}

export default Payments;

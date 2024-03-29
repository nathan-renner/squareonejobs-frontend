import React from "react";
import NumberFormat from "react-number-format";
import dayjs from "dayjs";

import { Card } from "../../common";

function PaymentsCard({ payments, ...otherProps }) {
  return (
    <Card {...otherProps}>
      <h2>Payment History</h2>
      {payments.map((payment) => (
        <div className="payment" key={payment._id}>
          <div className={`status ${payment.status}`} />
          <NumberFormat
            decimalScale={2}
            fixedDecimalScale={true}
            value={payment.amount}
            displayType={"text"}
            prefix={"$"}
            allowNegative={false}
            renderText={(value) => <h3>{value}</h3>}
          />
          <div className="details">
            <p
              className={payment.status === "processing" ? "processing" : null}
            >
              {payment.status === "processing" && "Processing - "}
              {dayjs(payment.paymentDate).format("MMM DD, YYYY")}
            </p>
            <p>{payment.company}</p>
          </div>
        </div>
      ))}
    </Card>
  );
}

export default PaymentsCard;

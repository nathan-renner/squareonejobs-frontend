import React from "react";
import NumberFormat from "react-number-format";
import moment from "moment";

import Card from "../../Card";

function PaymentsCard({ payments, ...otherProps }) {
  return (
    <Card {...otherProps}>
      <h2>Recent Payments</h2>
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
              {moment(payment.paymentDate).format("MMM DD, YYYY")}
            </p>
            <p>{payment.company}</p>
          </div>
        </div>
      ))}
    </Card>
  );
}

export default PaymentsCard;

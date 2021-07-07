import React from "react";
import NumberFormat from "react-number-format";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";

import { Card } from "../../common";

function PaymentCards({ payments, ...otherProps }) {
  const history = useHistory();
  return (
    <Card {...otherProps}>
      <h2>Payment History</h2>
      {payments.map((payment) => (
        <div
          className="payment"
          key={payment._id}
          onClick={() => history.push(`/listing/${payment.listingId}`)}
        >
          <div className={`status ${payment.status}`} />
          <NumberFormat
            decimalScale={2}
            fixedDecimalScale={true}
            value={payment.amount / 100}
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
            <p>For: {payment.position}</p>
          </div>
        </div>
      ))}
    </Card>
  );
}

export default PaymentCards;

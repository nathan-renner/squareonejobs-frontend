import React from "react";
import Card from "./../Card";
import { MdCreditCard } from "react-icons/md";

function HeaderCard(props) {
  return (
    <Card simple className="header" {...props}>
      <h2>Total Earnings</h2>
      <p className="earnings">$100.00</p>
      <Card>
        <h2>Linked Accounts</h2>
        <div className="account">
          <MdCreditCard size={40} color={"#1d8cf8"} />
          <div>
            <p>Bank of America</p>
            <p>Checking ****7483</p>
          </div>
        </div>
      </Card>
    </Card>
  );
}

export default HeaderCard;

import React from "react";
import Card from "./../../Card";
import { MdCreditCard } from "react-icons/md";

function HeaderCard(props) {
  return (
    <div>
      <Card className="header" {...props}>
        <h2>Linked Accounts</h2>
        <div className="account">
          <MdCreditCard size={40} color={"#1d8cf8"} />
          <div>
            <p>Bank of America</p>
            <p>Checking ****7483</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default HeaderCard;

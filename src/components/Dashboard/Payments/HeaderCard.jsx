import React from "react";
import { MdCreditCard } from "react-icons/md";

import { Card } from "../../common";

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

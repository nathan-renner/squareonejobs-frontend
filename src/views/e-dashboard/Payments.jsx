import React, { useEffect, useState } from "react";

import useApi from "hooks/useApi";
import { retrievePaymentIntents } from "api/payments";
import { useResponseModal } from "hooks/useResponseModal";
import { ActivityIndicator } from "components/common";
import PaymentCards from "components/E-Dashboard/Payments/PaymentCards";

function Payments(props) {
  const getPaymentsApi = useApi(retrievePaymentIntents);
  const { setModal } = useResponseModal();
  const [payments, setPayments] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      const response = await getPaymentsApi.request();
      if (response.ok) setPayments(response.data);
      else
        setModal({
          type: "error",
          header: "Error loading payments",
          body: response.data,
        });
    };
    if (!payments && !getPaymentsApi.loading) fetchPayments();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="payments-page">
      <ActivityIndicator visible={getPaymentsApi.loading} />
      {payments && (
        <PaymentCards
          payments={payments}
          data-aos="fade-up"
          data-aos-once={true}
          data-aos-delay="100"
        />
      )}
    </div>
  );
}

export default Payments;

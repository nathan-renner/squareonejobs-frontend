import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { loadStripe } from "@stripe/stripe-js";

import { postListing } from "./../../../api/listings";
import { useResponseModal } from "./../../../hooks/useResponseModal";
import useApi from "./../../../hooks/useApi";

import { ActivityIndicator, Button, Card } from "../../../components/common";
import { FormField } from "./../../../components/forms";
import { MdPerson } from "react-icons/md";
import {
  Elements,
  CardElement,
  useStripe,
  //useElements,
} from "@stripe/react-stripe-js";

const formStyle = {
  base: {
    iconColor: "#c4f0ff",
    color: "#fff",
    fontWeight: "500",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1em",
    fontSmoothing: "antialiased",
    ":-webkit-autofill": {
      color: "#fce883",
    },
    "::placeholder": {
      color: "#87BBFD",
    },
    padding: 30,
  },
  invalid: {
    color: "#9e2146",
  },
};

const schema = Yup.object().shape({
  name: Yup.string()
    .required()
    .label("Full name")
    .trim()
    .matches(/^(.*\s+.*)+$/, "Must enter first and last name")
    .max(128),
  companyName: Yup.string(),
  street: Yup.string().label("Street"),
  city: Yup.string().label("City"),
  state: Yup.string().label("State"),
  zip: Yup.string().label("Zip code").min(5).max(5),
});

const PaymentForm = () => {
  const postListingApi = useApi(postListing);
  const { setModal } = useResponseModal();
  const history = useHistory();
  const { state: listing } = useLocation();
  const stripe = useStripe();
  // const elements = useElements();

  // const payWithStripe = async () => {
  //   if (!stripe || !elements) return;

  //   const cardElement = elements.getElement(CardElement);

  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: "card",
  //     card: cardElement,
  //   });

  //   if (error) {
  //     console.log("[error]", error);
  //   } else {
  //     console.log("[PaymentMethod]", paymentMethod);
  //   }
  // };

  const handleSubmit = async () => {
    //await payWithStripe();
    const response = await postListingApi.request(listing);
    if (response.ok) {
      history.push("/my-listings");
    } else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
        buttonText: "retry",
        onClick: handleSubmit,
        onCancel: () => setModal(false),
      });
  };

  return (
    <div className="post-listing">
      <ActivityIndicator visible={postListingApi.loading} />
      <h1>Payment</h1>
      <Card>
        <h2>Overview</h2>
        <p>Type: {listing.type}</p>
        <p>Position: {listing.details.position}</p>
        {listing.type === "day" && <p>Wage: {listing.details.wage}</p>}
      </Card>
      <Card>
        <h2>Billing Info</h2>
        <Formik
          validationSchema={schema}
          initialValues={{
            name: "",
            companyName: "hello",
            street: "",
            city: "",
            state: "",
            zip: "",
          }}
        >
          {() => (
            <>
              <FormField
                name="name"
                label="Full Name (First and Last)"
                LeftIcon={MdPerson}
              />
              <FormField name="companyName" label="Company Name" disabled />
              <FormField name="street" label="Street Address" />
              <FormField name="city" label="City" />
              <div className="split">
                <FormField name="state" label="State" />
                <FormField name="zip" label="Zip Code" />
              </div>
            </>
          )}
        </Formik>
      </Card>
      <Card>
        <h2>Payment Info</h2>
        <CardElement
          options={{
            style: formStyle,
          }}
        />
      </Card>
      <div className="nav-controls">
        <Button
          outline
          textColor="primary"
          color="transparent"
          label="Back"
          onClick={() => history.goBack()}
        />
        <Button
          label="Confirm and Post Job"
          onClick={handleSubmit}
          disabled={!stripe}
        />
      </div>
    </div>
  );
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function Payment(props) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default Payment;

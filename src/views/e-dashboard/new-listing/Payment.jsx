import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import NumberFormat from "react-number-format";
import dayjs from "dayjs";

import { postListing } from "./../../../api/listings";
import { useResponseModal } from "./../../../hooks/useResponseModal";
import useApi from "./../../../hooks/useApi";

import {
  ActivityIndicator,
  Button,
  Card,
  TextInput,
} from "../../../components/common";
import { FormField, FormDropdown } from "./../../../components/forms";
import states from "../../../data/states";
import { getCompany } from "./../../../api/companies";
import SubmitButton from "./../../../components/forms/SubmitButton";
import useAuth from "./../../../auth/useAuth";
import {
  createPaymentIntent,
  createSubscription,
  getPromo,
  updatePaymentIntent,
} from "./../../../api/payments";

const formStyle = {
  base: {
    iconColor: "#808080",
    fontFamily: "Montserrat, sans-serif",
    "::placeholder": {
      color: "#808080",
    },
  },
};
const schema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .label("Full name")
    .trim()
    .matches(/^(.*\s+.*)+$/, "Must enter first and last name")
    .max(128),
  companyName: Yup.string(),
  street: Yup.string().label("Street").required("Required"),
  apt: Yup.string().label("Apt, suite, unit, floor, etc."),
  city: Yup.string().label("City").required("Required"),
  state: Yup.string()
    .label("State")
    .required("Required")
    .oneOf(states, "Must be listed"),
  zip: Yup.string()
    .label("Zip code")
    .min(5, "Must be a valid zip code")
    .max(5, "Must be a valid zip code")
    .required("Required"),
  cardName: Yup.string()
    .required("Required")
    .label("Full name")
    .trim()
    .matches(/^(.*\s+.*)+$/, "Must enter first and last name")
    .max(128),
});

const PaymentForm = () => {
  const postListingApi = useApi(postListing);
  const getPromoApi = useApi(getPromo);
  const getCompanyApi = useApi(getCompany);
  const createPaymentIntentApi = useApi(createPaymentIntent);
  const createSubscriptionApi = useApi(createSubscription);
  const updatePaymentIntentApi = useApi(updatePaymentIntent);

  const { user } = useAuth();
  const { setModal } = useResponseModal();
  const history = useHistory();
  const { state: listing } = useLocation();
  const stripe = useStripe();
  const elements = useElements({
    fonts: [
      {
        cssSrc:
          "https://fonts.googleapis.com/css2?family=Montserrat&display=swap",
      },
    ],
  });

  const [company, setCompany] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [promo, setPromo] = useState({
    code: null,
    error: false,
    discount: false,
  });
  const [promoInput, setPromoInput] = useState("");
  const [paymentIntent, setPaymentIntent] = useState(false);
  const { details: l } = listing;

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await getCompanyApi.request();
      if (response.ok) setCompany(response.data);
      else
        setModal({
          type: "error",
          header: "Something went wrong while getting company",
          body: response.body,
          onButtonClick: () => {
            setModal(false);
            fetchCompany();
          },
          buttonText: "Try again",
        });
    };
    if (!company && !getCompanyApi.loading) fetchCompany();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const createIntent = async () => {
      const intentData = {
        priceId: listing.type.priceId,
      };
      const response = await createPaymentIntentApi.request(intentData);
      if (response.ok) {
        setPaymentIntent(response.data);
      } else
        setModal({
          type: "error",
          header: "Something went wrong",
          body: "Please refresh the page.",
        });
    };
    if (listing.type.name === "Day Listing") createIntent();
    //eslint-disable-next-line
  }, []);

  const checkPromo = async (code) => {
    const response = await getPromoApi.request({
      promo: code,
    });

    if (response.ok) {
      setPromo(response.data);
    } else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: "Please refresh the page.",
      });
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const payWithStripe = async (i) => {
    if (!stripe || !elements) return;
    setProcessing(true);

    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: i.name,
        email: user.email,
        address: {
          line1: i.street,
          line2: i.apt ? i.apt : undefined,
          city: i.city,
          state: i.state,
          country: "US",
          postal_code: i.zip,
        },
      },
    });
    let payload = null;
    if (listing.type.name === "Day Listing") {
      payload = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
        receipt_email: user.email,
        payment_method: paymentMethod.paymentMethod.id,
      });
    } else {
      payload = await createSubscriptionApi.request({
        paymentMethodId: paymentMethod.paymentMethod.id,
        priceId: listing.type.priceId,
        promotion_code: promo.promoId ? promo.promoId : null,
      });
    }

    if (payload.error) {
      setModal({
        type: "error",
        header: "Payment Failed",
        body: payload.error.message,
      });
      setProcessing(false);
      return false;
    } else {
      setProcessing(false);
      setSucceeded(true);
      return payload;
    }
  };

  const handleSubmit = async (i) => {
    const payload = await payWithStripe(i);

    if (payload) {
      const response = await postListingApi.request({
        ...listing,
        type:
          listing.type.name === "Day Listing"
            ? "day"
            : listing.type.name === "Part Time Listing"
            ? "part"
            : "full",
        payment:
          listing.type.name === "Day Listing"
            ? {
                id: paymentIntent.paymentIntendId,
                client_secret: payload.paymentIntent.client_secret,
                invoiceId: payload.paymentIntent.invoice,
              }
            : {
                id: payload.subscriptionId,
                invoiceId: payload.invoiceId,
              },
      });
      if (response.ok) {
        history.push("/my-listings");
        setModal({
          header: "Payment Successful",
          body: "Your listing is now live! Click into the options on the Listing view for other actions.",
          onButtonClick: () => {
            setModal(false);
          },
          buttonText: "OK",
        });
      } else
        setModal({
          type: "error",
          header: "Something went wrong",
          body: response.data,
          onCancel: () => setModal(false),
        });
    }
  };

  return (
    <div className="post-listing payment">
      <ActivityIndicator
        visible={
          postListingApi.loading ||
          getCompanyApi.loading ||
          createPaymentIntentApi.loading ||
          processing
        }
      />
      {postListingApi.loading ||
      getCompanyApi.loading ||
      createPaymentIntentApi.loading ? (
        <div />
      ) : (
        <Formik
          enableReinitialize
          validationSchema={schema}
          initialValues={{
            name: `${company.firstName} ${company.lastName}`,
            companyName: company.name,
            street: "",
            apt: "",
            city: "",
            state: "",
            zip: "",
            cardName: "",
            promo: "",
          }}
          onSubmit={handleSubmit}
        >
          {() => (
            <>
              <Card>
                <h1>Payment</h1>
                <h2>Billing Address</h2>
                <FormField
                  name="name"
                  label="Full Name (First and Last)"
                  type="name"
                  disabled={succeeded}
                />
                <FormField
                  name="companyName"
                  type="organization"
                  label="Company Name"
                  disabled
                />
                <FormField
                  name="street"
                  type="address-line1"
                  label="Street Address"
                  disabled={succeeded}
                />
                <FormField
                  name="apt"
                  type="address-line2"
                  label="Apt, suite, unit, floor, etc."
                  disabled={succeeded}
                />
                <div className="flex-row loc">
                  <FormField
                    name="city"
                    label="City"
                    disabled={succeeded}
                    noMarginBottom
                  />
                  <FormDropdown
                    name="state"
                    label="State"
                    items={states}
                    width={"8em"}
                    type="address-level1"
                    disabled={succeeded}
                    noMarginBottom
                  />
                  <FormField
                    name="zip"
                    label="Zip Code"
                    pattern="[0-9]{5}"
                    type="postal-code"
                    width={"10em"}
                    disabled={succeeded}
                    noMarginBottom
                  />
                </div>
                <h2 className="title">Payment Method</h2>
                <p className="subtitle">
                  All tranactions are secure and encrypted.
                </p>
                <FormField
                  name="cardName"
                  label="Name on card"
                  disabled={succeeded}
                />
                <CardElement
                  options={{
                    style: formStyle,
                    disabled: succeeded,
                  }}
                  onChange={handleChange}
                />
                {listing.type.name !== "Day Listing" && (
                  <>
                    <h2 className="title" style={{ marginBottom: "1em" }}>
                      Promo Code
                    </h2>
                    <p
                      className="promo"
                      onClick={() => setShowPromo(!showPromo)}
                    >
                      {showPromo ? "-" : "+"} Promo Code
                    </p>
                    {showPromo && (
                      <div className="promo-container">
                        <TextInput
                          value={promoInput}
                          label="Enter Promo Code (optional)"
                          controlled
                          onChange={(e) => setPromoInput(e.target.value)}
                          onBlur={(e) => checkPromo(e.target.value)}
                          error={promo.error}
                        />
                        {promo.promo && !promo.error && (
                          <p>
                            Applied Promos: <i>{promo.promo}</i>
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}
                {error && <p className="card-error">{error}</p>}
                <h2 style={{ marginBottom: "2em" }}>Review Items</h2>
                <div className="flex-row">
                  <img src={company.logo} alt={`${company.name}'s Logo`} />
                  <div className="listing-details">
                    <p className="pos">{l.position}</p>
                    <p>{dayjs(l.startDateTime).format("MMM DD, YYYY")}</p>
                    {listing.type.name === "Day Listing" && (
                      <p>
                        {dayjs(l.startDateTime).format("h:mm a") +
                          " - " +
                          dayjs(l.endDateTime).format("h:mm a")}
                      </p>
                    )}
                    <p>{`${l.location.street}, ${l.location.city}, ${l.location.state} ${l.location.zip}`}</p>
                  </div>
                </div>
                <hr />
                <div className="charges">
                  <div className="charge">
                    <p>Day Listing</p>
                    <NumberFormat
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={listing.type.price}
                      displayType={"text"}
                      prefix={"$"}
                      renderText={(value) => <p>{value}</p>}
                    />
                  </div>
                  {/* {listing.type === "day" && (
                    <div className="charge">
                      <p>Wage</p>
                      <NumberFormat
                        decimalScale={2}
                        fixedDecimalScale={true}
                        value={paymentIntent.totals.wage / 100}
                        displayType={"text"}
                        prefix={"$"}
                        renderText={(value) => <p>{value}</p>}
                      />
                    </div>
                  )} */}
                </div>
                <hr />
                <div />
                <div className="charges final">
                  {promo.discount && (
                    <div className="charge">
                      <p>Promo Code</p>
                      <p>{`${promo.discount}% off`}</p>
                    </div>
                  )}
                  <div className="charge">
                    <p>Subtotal</p>
                    <NumberFormat
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={
                        promo.discount
                          ? listing.type.price -
                            listing.type.price * (promo.discount / 100)
                          : listing.type.price
                      }
                      displayType={"text"}
                      prefix={"$"}
                      renderText={(value) => <p>{value}</p>}
                    />
                  </div>
                  {/* <div className="charge">
                    <p>Transaction Fee</p>
                    <NumberFormat
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={
                        paymentIntent &&
                        paymentIntent.totals.transactionFee / 100
                      }
                      displayType={"text"}
                      prefix={"$"}
                      renderText={(value) => <p>{value}</p>}
                    />
                  </div> */}

                  {/* <div className="charge">
                    <p>Taxes</p>
                    <NumberFormat
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={paymentIntent.totals.taxes / 100}
                      displayType={"text"}
                      prefix={"$"}
                      renderText={(value) => <p>{value}</p>}
                    />
                  </div> */}
                  <div className="charge total">
                    <p>Total</p>
                    <NumberFormat
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={
                        promo.discount
                          ? listing.type.price -
                            listing.type.price * (promo.discount / 100)
                          : listing.type.price
                      }
                      displayType={"text"}
                      prefix={"$"}
                      renderText={(value) => (
                        <p>
                          <span>USD </span>
                          {value}
                        </p>
                      )}
                    />
                  </div>
                </div>
                <hr />
                <div className="nav-controls">
                  <Button
                    outline
                    textColor="primary"
                    color="transparent"
                    label="Back"
                    onClick={() => history.goBack()}
                  />
                  <SubmitButton
                    label="Pay and Post Job"
                    disabled={!stripe || processing || disabled || succeeded}
                  />
                </div>
              </Card>
            </>
          )}
        </Formik>
      )}
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

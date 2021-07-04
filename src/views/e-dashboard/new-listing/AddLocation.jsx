import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormField, FormDropdown } from "./../../../components/forms";
import { Button } from "./../../../components/common";

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const schema = Yup.object().shape({
  street: Yup.string().label("Street").required("Required"),
  city: Yup.string().label("City").required("Required"),
  state: Yup.string()
    .label("State")
    .oneOf(states, "Must be a state listed")
    .required("Required"),
  zip: Yup.string()
    .label("Zip")
    .min(5, "Must be a valid zip code")
    .max(5, "Must be a valid zip code")
    .required("Required"),
});

function AddLocation({ handleSubmit }) {
  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={schema}
      initialValues={{
        street: "",
        city: "",
        state: "",
        zip: "",
      }}
    >
      {({ handleSubmit }) => (
        <>
          <hr style={{ marginTop: "2em" }} />
          <div style={{ paddingTop: "1em", paddingBottom: "1em" }}>
            <FormField name="street" label="Address" />
            <FormField name="city" label="City" />
            <div className="flex-row">
              <FormDropdown
                name="state"
                label="State"
                items={states}
                width={"8em"}
              />
              <FormField
                name="zip"
                label="Zip Code"
                pattern="[0-9]{5}"
                width={"10em"}
              />
            </div>
            <Button
              label="Add location"
              onClick={handleSubmit}
              buttonStyle={{ margin: 0 }}
            />
          </div>
          <hr />
        </>
      )}
    </Formik>
  );
}

export default AddLocation;

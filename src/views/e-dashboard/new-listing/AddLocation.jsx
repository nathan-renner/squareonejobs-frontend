import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { FormField, FormDropdown } from "./../../../components/forms";
import { Button } from "./../../../components/common";
import states from "../../../data/states";

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

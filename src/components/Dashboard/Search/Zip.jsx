import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "./../../forms/FormField";
import { MdSearch } from "react-icons/md";

const schema = Yup.object().shape({
  zip: Yup.string()
    .required()
    .label("Zip Code")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),
});

function Zip({ zip, handleFilterChange }) {
  const handleSubmit = ({ zip: z }) => {
    handleFilterChange(z, "zip");
  };

  return (
    <div className="filters-container zip">
      <h3>Zip Code:</h3>
      <Formik
        enableReinitialize={true}
        initialValues={{ zip }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <div
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(values);
              }
            }}
          >
            <FormField
              name="zip"
              size="sm"
              backgroundColor="foreground"
              placeholder="E.g. 07030"
              RightIcon={MdSearch}
              rightIconOnClick={handleSubmit}
              containerStyle={{ boxShadow: "0px 3px 5px rgba(black, 0.1)" }}
            />
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Zip;

import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { MdSearch } from "react-icons/md";

import FormField from "./../../forms/FormField";

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
              label="Zip Code"
              RightIcon={MdSearch}
              rightIconOnClick={handleSubmit}
            />
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Zip;

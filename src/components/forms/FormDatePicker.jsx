import React, { useState } from "react";
import moment from "moment";
import { useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import TextInput from "./../TextInput";
import ErrorMessage from "./ErrorMessage";

import "react-datepicker/dist/react-datepicker.css";

function FormDatePicker({ name, placeholder }) {
  const [date, setDate] = useState();
  const {
    values,
    errors,
    setFieldTouched,
    setFieldValue,
    touched,
  } = useFormikContext();

  const Input = ({ value, onClick }) => {
    return (
      <TextInput
        containerStyle={{ width: "100%" }}
        value={values[name] ? moment(values[name]).format("MM/DD/YYYY") : ""}
        placeholder={placeholder}
        onClick={onClick}
        onChange={() => true}
        onBlur={() => setFieldTouched(name)}
      />
    );
  };

  return (
    <div>
      <DatePicker
        placeholderText={placeholder}
        selected={date}
        onChange={(date) => {
          setDate(date);
          setFieldValue(name, date);
        }}
        customInput={<Input />}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
}

export default FormDatePicker;

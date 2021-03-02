import React, { useState } from "react";
import { useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import TextInput from "./../TextInput";
import ErrorMessage from "./ErrorMessage";

import "react-datepicker/dist/react-datepicker.css";

function FormDatePicker({ name, placeholder }) {
  const [date, setDate] = useState();
  const { errors, setFieldTouched, touched } = useFormikContext();

  const Input = ({ value, onClick }) => {
    return (
      <TextInput
        containerStyle={{ width: "100%" }}
        value={value}
        placeholder={placeholder}
        onClick={onClick}
        onBlur={() => setFieldTouched(name)}
      />
    );
  };

  return (
    <div>
      <DatePicker
        placeholderText={placeholder}
        selected={date}
        onChange={(date) => setDate(date)}
        customInput={<Input />}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
}

export default FormDatePicker;

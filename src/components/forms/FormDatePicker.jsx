import React, { useState } from "react";
import moment from "moment";
import _ from "lodash";
import { useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import TextInput from "./../TextInput";
import ErrorMessage from "./ErrorMessage";

import "react-datepicker/dist/react-datepicker.css";

function FormDatePicker({
  name,
  placeholder,
  showTimeSelect = false,
  ...otherProps
}) {
  const [date, setDate] = useState();
  const { values, errors, setFieldTouched, setFieldValue, touched } =
    useFormikContext();

  const years = _.range(1940, moment(new Date()).add(1, "years").year());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const Input = ({ value, onClick }) => {
    return (
      <TextInput
        containerStyle={{ marginTop: 5, marginBottom: 5 }}
        value={
          values[name]
            ? showTimeSelect
              ? moment(values[name]).format("MM/DD/YYYY h:mm a")
              : moment(values[name]).format("MM/DD/YYYY")
            : null
        }
        placeholder={placeholder}
        onClick={onClick}
        onChange={() => true}
        onBlur={() => setFieldTouched(name)}
        {...otherProps}
      />
    );
  };

  return (
    <>
      <DatePicker
        placeholderText={placeholder}
        selected={date}
        onChange={(date) => {
          setDate(date);
          setFieldValue(name, date);
        }}
        customInput={<Input />}
        showTimeSelect={showTimeSelect}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            <select
              value={moment(date).year()}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[moment().month(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        )}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormDatePicker;

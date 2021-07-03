import React from "react";
import { useFormikContext } from "formik";
import {
  DateTimePicker,
  DatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import blue from "@material-ui/core/colors/blueGrey";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import DayJsUtils from "@date-io/dayjs";

import { TextInputLine } from "../common";

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

function FormDate({ name, placeholder, label, time = false, ...otherProps }) {
  const { values, errors, setFieldTouched, setFieldValue, touched } =
    useFormikContext();

  const renderInput = (props) => {
    return (
      <TextInputLine
        value={props.value}
        label={label}
        error={touched[name] && errors[name]}
        onChange={(e) => setFieldValue(name, e.$d)}
        onClick={props.onClick}
        onBlur={props.onBlur}
        className="date-picker"
        controlled
      />
    );
  };

  return (
    <MuiPickersUtilsProvider utils={DayJsUtils}>
      <ThemeProvider theme={defaultMaterialTheme}>
        {time ? (
          <DateTimePicker
            value={values[name]}
            onChange={(e) => setFieldValue(name, e.$d)}
            onBlur={() => setFieldTouched(name)}
            TextFieldComponent={renderInput}
            {...otherProps}
          />
        ) : (
          <DatePicker
            value={values[name]}
            onChange={(e) => setFieldValue(name, e.$d)}
            onBlur={() => setFieldTouched(name)}
            TextFieldComponent={renderInput}
            {...otherProps}
          />
        )}
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default FormDate;

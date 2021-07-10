import React from "react";
import { Checkbox } from "./../common";
import { useFormikContext } from "formik";
import { ErrorMessage } from ".";

function FormCheckboxes({ name, label = false, items }) {
  const { setFieldValue, values, errors } = useFormikContext();

  const toggleItem = (item) => {
    const updatedItems = [...values[name]];
    if (updatedItems.includes(item))
      updatedItems.splice(updatedItems.indexOf(item), 1);
    else updatedItems.push(item);
    setFieldValue(name, updatedItems);
  };

  return (
    <>
      {label && <p>{label}</p>}
      {items.map((item) => (
        <Checkbox
          key={item}
          checked={values[name].includes(item)}
          onChange={() => toggleItem(item)}
          label={item}
          controlled={false}
        />
      ))}
      {errors[name] && (
        <ErrorMessage visible={errors[name]} error={errors[name]} />
      )}
    </>
  );
}

export default FormCheckboxes;

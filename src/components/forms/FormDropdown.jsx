import React, { useEffect, useRef, useState } from "react";
import { useFormikContext } from "formik";

import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import { MdArrowDropDown } from "react-icons/md";

function FormDropdown({ name, width, items, ...otherProps }) {
  const wrapperRef = useRef(null);
  const [showItems, setShowItems] = useState(false);
  const { setFieldValue, errors, touched, values } = useFormikContext();

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowItems(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(wrapperRef);

  return (
    <div
      className="form-dropdown"
      onClick={() => setShowItems(!showItems)}
      ref={wrapperRef}
    >
      <TextInput
        onChange={() => true}
        value={values[name]}
        width={width}
        disabled
        RightIcon={MdArrowDropDown}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
      {showItems && (
        <div className="form-dropdown-container">
          {items.map((item) => (
            <div
              className="form-dropdown-item"
              key={item}
              onClick={() => setFieldValue(name, item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FormDropdown;

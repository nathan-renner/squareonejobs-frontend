import React, { useEffect, useRef, useState } from "react";
import { useFormikContext } from "formik";
import { MdArrowDropDown } from "react-icons/md";

import { TextInputLine } from "../common";

function FormDropdown({ name, items, label, ...otherProps }) {
  const wrapperRef = useRef(null);
  const [showItems, setShowItems] = useState(false);
  const { setFieldValue, setFieldTouched, errors, touched, values } =
    useFormikContext();

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

  const getItems = () => {
    const queryResults = items
      .filter((word) => word.toLowerCase().includes(values[name].toLowerCase()))
      .map((item) => (
        <div
          className="form-dropdown-item"
          key={item}
          onClick={() => setFieldValue(name, item)}
        >
          {item}
        </div>
      ));
    return queryResults.length === 0 ? (
      <div className="form-dropdown-item" disabled>
        No Results Found.
      </div>
    ) : (
      queryResults
    );
  };

  // const wrapperStyle = () => {
  //   const length = getItems().length;
  //   return {
  //     height: length > 5 ? "15em" : `${44 * length}px`,
  //   };
  // };

  return (
    <div
      className="form-dropdown"
      onClick={() => setShowItems(!showItems)}
      ref={wrapperRef}
    >
      <TextInputLine
        value={values[name]}
        controlled
        RightIcon={MdArrowDropDown}
        label={label}
        error={touched[name] && errors[name]}
        onBlur={() => setFieldTouched(name)}
        onChange={(e) => setFieldValue(name, e.target.value)}
        {...otherProps}
      />
      {showItems && <div className="form-dropdown-container">{getItems()}</div>}
    </div>
  );
}

export default FormDropdown;

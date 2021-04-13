import React, { useState, useContext } from "react";

export const SuccessContext = React.createContext({
  visible: false,
  onDone: () => true,
  text: "",
  showSuccess: () => true,
});
SuccessContext.displayName = "SuccessContext";

export const SuccessProvider = (props) => {
  const [visible, setVisible] = useState(false);
  const [customOnDone, setCustomOnDone] = useState(false);
  const [text, setText] = useState("Applied!");

  const onDone = () => {
    customOnDone && customOnDone();
    setVisible(false);
  };

  const showSuccess = (customText = false, customOnDone = false) => {
    customText ? setText(customText) : setText("Applied!");
    customOnDone ? setCustomOnDone(customOnDone) : setCustomOnDone(false);
    setVisible(true);
  };

  const defaultState = {
    showSuccess,
    visible,
    onDone,
    text,
  };

  return (
    <SuccessContext.Provider value={defaultState}>
      {props.children}
    </SuccessContext.Provider>
  );
};

export const useSuccessScreen = () => useContext(SuccessContext);

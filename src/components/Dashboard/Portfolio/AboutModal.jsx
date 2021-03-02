import React, { useState } from "react";
import { MdClear } from "react-icons/md";
import * as Yup from "yup";
import { Form, FormField } from "../../forms";
import EditControls from "./EditControls";
import WarningModal from "./../../WarningModal";

const schema = Yup.object().shape({
  about: Yup.string().max(250).required().label("About text"),
});

function AboutModal({ updateElement, portfolio, setIsEditing }) {
  const [temp, setTemp] = useState(portfolio.about);
  const [warningVisible, setWarningVisible] = useState(false);

  const handleSubmit = ({ about }) => {
    //updateElement("about", about);
    setIsEditing(false);
  };
  const showWarning = () => {
    setWarningVisible(true);
  };
  const onCancel = () => {
    setWarningVisible(false);
  };
  const onDiscard = () => {
    setTemp(portfolio.about);
    setWarningVisible(false);
    setIsEditing(false);
  };

  return (
    <>
      <WarningModal
        visible={warningVisible}
        title="Discard Changes?"
        message="Are you sure you want to discard your changes?"
        submitText="Discard"
        onCancel={onCancel}
        onSubmit={onDiscard}
      />
      <Form
        initialValues={{ about: temp }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <MdClear size={25} className="exit" onClick={showWarning} />
        <FormField
          type="textarea"
          maxLength="250"
          name="about"
          placeholder="Tell us about yourself"
        />
        <EditControls onCancel={showWarning} />
      </Form>
    </>
  );
}

export default AboutModal;

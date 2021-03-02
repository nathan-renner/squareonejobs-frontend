import React, { useState } from "react";
import * as Yup from "yup";
import { Form, FormField } from "../../forms";
import WarningModal from "./../../WarningModal";
import EditControls from "./EditControls";
import FormDatePicker from "./../../forms/FormDatePicker";

const schema = Yup.object().shape({
  degree: Yup.string().required().max(64).label("Degree"),
  school: Yup.string().required().max(64).label("School"),
  startDate: Yup.date().required().label("Start Date"),
  endDate: Yup.date().required().label("End Date"),
});

function EducationAddModal({
  setIsAdding,
  education = {
    degree: "",
    school: "",
    startDate: undefined,
    endDate: undefined,
  },
}) {
  const [warningVisible, setWarningVisible] = useState(false);

  const handleSubmit = ({ about }) => {
    //updateElement("about", about);
    setIsAdding(false);
  };
  const showWarning = () => {
    setWarningVisible(true);
  };
  const onCancel = () => {
    setWarningVisible(false);
  };
  const onDiscard = () => {
    setWarningVisible(false);
    setIsAdding(false);
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
        initialValues={education}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <FormField name="degree" placeholder="Degree" />
        <FormField name="school" placeholder="School name" />
        <FormDatePicker name="startDate" placeholder="Start date" />
        <FormDatePicker name="endDate" placeholder="End date" />

        <EditControls onCancel={showWarning} />
      </Form>
    </>
  );
}

export default EducationAddModal;
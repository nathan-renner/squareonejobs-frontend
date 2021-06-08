import React, { useState } from "react";
import * as Yup from "yup";
import { MdCheck } from "react-icons/md";

import { Icon, Modal, StarRating } from "../../common";

import { Form, FormField, SubmitButton } from "./../../forms";

import useApi from "./../../../hooks/useApi";
import { postReference } from "./../../../api/references";
import { useResponseModal } from "./../../../hooks/useResponseModal";

const schema = Yup.object().shape({
  title: Yup.string().min(1).max(50).required().label("Title"),
  review: Yup.string().min(1).max(1024).required().label("Reference"),
});

function ReferenceModal({
  visible = true,
  setVisible,
  title = "Write a reference",
  subtitle = "Write a quick reference about how this worker performed.",
  id,
}) {
  const postRefApi = useApi(postReference);
  const [rating, setRating] = useState(0);
  const [initialVals, setInitialVals] = useState({ title: "", review: "" });
  const { setModal } = useResponseModal();

  const handleSubmit = async (data) => {
    if (rating === 0) {
      window.confirm(`Please enter a star rating.`);
      setInitialVals(data);
    } else {
      const ref = { listingId: id, rating, ...data };
      const response = postRefApi.request(ref);
      if (response.ok) {
        setVisible(false);
      } else
        setModal({
          type: "error",
          header: "Something went wrong",
          body: response.data,
        });
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        Content={() => (
          <div className="reference-modal">
            <Icon
              Icon={MdCheck}
              size={50}
              color="primary"
              className="success-icon"
            />
            <h2>{title}</h2>
            <p>{subtitle}</p>
            <StarRating
              rating={rating}
              setRating={setRating}
              size={30}
              editable
            />
            <Form
              initialValues={initialVals}
              validationSchema={schema}
              onSubmit={handleSubmit}
            >
              <FormField
                name="title"
                size="sm"
                label="Title"
                placeholder="Enter a quick, descriptive overview"
              />
              <FormField
                name="review"
                size="sm"
                type="textarea"
                label="Reference"
                placeholder="Explain the employee's overall performance"
              />
              <SubmitButton label="Submit review" />
            </Form>
          </div>
        )}
      />
    </>
  );
}

export default ReferenceModal;

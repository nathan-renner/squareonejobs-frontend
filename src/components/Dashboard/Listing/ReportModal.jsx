import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormCheckboxes, FormField, SubmitButton } from "components/forms";
import useApi from "hooks/useApi";
import { useResponseModal } from "hooks/useResponseModal";
import { reportListing } from "api/listings";

const schema = Yup.object().shape({
  reasons: Yup.array().when("other", {
    is: undefined,
    then: Yup.array()
      .min(1, "Must give at least one reason for filing")
      .required(),
  }),
  other: Yup.string(),
  message: Yup.string(),
});

const reasons = [
  "It is offensive or discriminatory",
  "It looks like a fake job",
  "It is inaccurate",
  "It is an advertisement",
];

function ReportModal({ listingId, setVisible }) {
  const reportListingApi = useApi(reportListing);
  const { setModal } = useResponseModal();

  const handleSubmit = async (i, { resetForm }) => {
    const input = { ...i, listingId };
    if (input.other && !input.reasons.includes(input.other))
      input.reasons.push(input.other);

    delete input.other;

    const response = await reportListingApi.request(input);
    if (response.ok) {
      setModal({
        header: "Listing Reported",
        body: "Thanks for the feedback. We'll look into this as soon as possible.",
      });
      setVisible(false);
      resetForm();
    } else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
  };

  return (
    <div>
      <Formik
        initialValues={{ reasons: [], other: "", message: "" }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ values, errors }) => (
          <>
            <FormCheckboxes name="reasons" items={reasons} />
            <FormField name="other" label="Other reason (optional)" />
            <FormField
              name="message"
              type="textarea"
              label="Details (optional)"
            />
            <SubmitButton label="Submit Report" />
          </>
        )}
      </Formik>
    </div>
  );
}

export default ReportModal;

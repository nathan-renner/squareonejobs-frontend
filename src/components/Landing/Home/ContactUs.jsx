import React from "react";
import { Form, FormField, SubmitButton } from "./../../forms";
import * as Yup from "yup";
import Button from "./../../Button";
import { useResponseModal } from "./../../../hooks/useResponseModal";
import useApi from "./../../../hooks/useApi";
import { sendContactUsEmail } from "./../../../api/misc";

const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  subject: Yup.string().required().label("Subject"),
  message: Yup.string().required().label("Message"),
});

function ContactUs(props) {
  const { setModal } = useResponseModal();
  const sendEmailApi = useApi(sendContactUsEmail);

  const handleSubmit = async (data, { resetForm }) => {
    const response = await sendEmailApi.request(data);
    if (response.ok) {
      setModal({
        type: "success",
        header: "Message Sent!",
        body: "We'll be in contact within the next 1-5 business days.",
      });
      resetForm();
    } else
      setModal({
        type: "error",
        header: "Something went wrong :(",
        body: response.data,
      });
  };
  const openEmail = () => {
    window.open("mailto:hello@squareonejobs.com");
  };

  return (
    <section className="bg-light section-contact">
      <div className="container content-container">
        <div className="content">
          <h2 className="title">Contact us</h2>
          {/* <p className="email">Our email:</p>
          <p className="email-link" onClick={openEmail}>
            hello@squareonejobs.com
          </p> */}
          <p>
            Got a question? <br />
            We'd love to hear from you!
          </p>
          {/* <Button
            className="btn-lg"
            buttonStyle={{ display: "inline-block" }}
            label="Email us"
            onClick={() => openEmail()}
          /> */}
          <Form
            initialValues={{
              name: "",
              email: "",
              subject: "",
              message: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            <FormField
              name="name"
              placeholder="Name"
              containerStyle={{ backgroundColor: "#fff" }}
              textStyle={{ backgroundColor: "#fff" }}
            />
            <FormField
              name="email"
              placeholder="Email"
              containerStyle={{ backgroundColor: "#fff" }}
              textStyle={{ backgroundColor: "#fff" }}
            />
            <FormField
              name="subject"
              placeholder="Subject"
              containerStyle={{ backgroundColor: "#fff" }}
              textStyle={{ backgroundColor: "#fff" }}
            />
            <FormField
              name="message"
              placeholder="Message"
              containerStyle={{ backgroundColor: "#fff" }}
              textStyle={{ backgroundColor: "#fff" }}
              type="textarea"
            />
            <SubmitButton label="Submit" style={{ display: "inline-block" }} />
          </Form>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;

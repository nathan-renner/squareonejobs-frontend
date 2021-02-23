import React from "react";
import { Form, FormField, SubmitButton } from "./../../forms";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  subject: Yup.string().required().label("Subject"),
  message: Yup.string().required().label("Message"),
});

function ContactUs(props) {
  const handleSubmit = ({ name, email, subject, message }) => {
    console.log(name, email, subject, message);
  };
  const openEmail = () => {
    window.open("mailto:hello@squareonejobs.com");
  };

  return (
    <section className="bg-light section-contact">
      <div className="container content-container">
        <div className="content">
          <h2 className="title">Contact us</h2>
          <p className="email">Our email:</p>
          <p className="email-link" onClick={openEmail}>
            hello@squareonejobs.com
          </p>
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
            />
            <SubmitButton label="Submit" style={{ display: "inline-block" }} />
          </Form>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;

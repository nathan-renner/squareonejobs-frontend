import client from "./client";

export const sendContactUsEmail = (data) => client.post("/contact-form/", data);

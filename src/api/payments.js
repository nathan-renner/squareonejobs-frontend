import client from "./client";

const EP = "/payments";

export const createPaymentIntent = (data) =>
  client.post(`${EP}/create-payment-intent`, data);

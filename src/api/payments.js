import client from "./client";

const EP = "/payments";

export const createPaymentIntent = (data) =>
  client.post(`${EP}/create-payment-intent`, data);

export const retrieveCustomers = () => client.get(`${EP}/retrieve-customers`);

export const retrievePaymentIntents = () =>
  client.get(`${EP}/retrieve-payment-intents`);

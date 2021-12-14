import client from "./client";

const EP = "/payments";

export const getPromo = (data) => client.get(`${EP}/promo/${data.promo}`);

export const getProducts = () => client.get(`${EP}/products`);

export const createPaymentIntent = (data) =>
  client.post(`${EP}/payment-intent`, data);

export const createSubscription = (data) =>
  client.post(`${EP}/subscription`, data);

export const updatePaymentIntent = (data) =>
  client.put(`${EP}/payment-intent`, data);

export const retrieveCustomers = () => client.get(`${EP}/retrieve-customers`);

export const retrievePaymentIntents = () =>
  client.get(`${EP}/retrieve-payment-intents`);

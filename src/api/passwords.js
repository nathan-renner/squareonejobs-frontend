import client from "./client";

const EP = "/passwords";

export const sendEmail = (data) => client.post(`${EP}/send-email`, data);

export const changePassword = (data) => client.put(`${EP}`, data);

export const resetPassword = (data, id, code) =>
  client.put(`${EP}/${id}/${code}`, data);

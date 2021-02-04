import client from "./client";

const endpoint = "/auth";

export const login = (email, password) =>
  client.post(endpoint, { email, password });

export const confirmEmail = (userId, code) =>
  client.get(`/verification/confirmation/${userId}/${code}`);

export const resendLink = (data) => client.post("/verification/resend", data);

//export default { login };

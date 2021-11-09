import client from "./client";

const endpoint = "/auth";

export const login = (email, password) =>
  client.post(endpoint, { email, password });

export const loginWithGoogle = (token) =>
  client.post(`${endpoint}/with-google`, { token });

export const confirmEmail = (userId, code) =>
  client.get(`/verification/${userId}/${code}`);

export const confirmEmailEmployer = (employerId, code) =>
  client.get(`/verification/e/${employerId}/${code}`);

export const resendLink = (data) => client.post("/verification/resend", data);

export const resendLinkEmployer = (data) =>
  client.post("/verification/e/resend", data);

//export default { login };

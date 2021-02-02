import client from "./client";

const endpoint = "/auth";

export const login = (email, password) =>
  client.post(endpoint, { email, password });

//export default { login };

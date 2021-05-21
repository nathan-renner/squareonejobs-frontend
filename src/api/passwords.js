import client from "./client";

const EP = "/passwords";

export const changePassword = (data) => client.put(`${EP}`, data);

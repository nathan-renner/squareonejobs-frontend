import client from "./client";

const EP = "/references";

export const postReference = (data) => client.post(EP, data);

import client from "./client";

const EP = "/notifications";

export const getNotifications = () => client.get(`${EP}/initial`);

export const updateClicked = (id) => client.put(`${EP}/clicked/${id}`);

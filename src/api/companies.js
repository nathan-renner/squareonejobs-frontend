import client from "./client";

const EP = "/companies";

export const getLocations = () => client.get(`${EP}/locations`);

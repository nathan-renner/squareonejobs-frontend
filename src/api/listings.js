import client from "./client";

const gigEP = "/gig-listings";

export const getActiveDay = () => client.get(`${gigEP}/active`);

export const getListing = (id) => client.get(`${gigEP}/${id}`);

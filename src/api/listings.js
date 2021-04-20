import client from "./client";

const gigEP = "/gig-listings";
const listingsEP = "/listings";

export const getActiveDay = () => client.get(`${gigEP}/active`);

export const getListing = (id) => client.get(`${gigEP}/${id}`);

export const applyToDayJob = (id) => client.post(`${gigEP}/apply/${id}`);

export const getMyJobs = (type) => client.get(`${listingsEP}/my-jobs/${type}`);

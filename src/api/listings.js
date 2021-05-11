import client from "./client";

const EP = "/listings";

export const getListing = (id) => client.get(`${EP}/${id}`);

export const applyToDayJob = (id) => client.post(`${EP}/apply/${id}`);

export const getMyJobs = (type) => client.get(`${EP}/my-jobs/${type}`);

export const getMyListings = (type) => client.get(`${EP}/my-listings/${type}`);

export const searchListings = (query) => client.get(`${EP}/search?${query}`);

export const postListing = (listing) => client.post(`${EP}`, listing);

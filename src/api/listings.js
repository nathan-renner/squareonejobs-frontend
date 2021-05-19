import client from "./client";

const EP = "/listings";

export const getListing = (id) => client.get(`${EP}/${id}`);

export const getMyJobs = (type) => client.get(`${EP}/my-jobs/${type}`);

export const getMyListings = (type) => client.get(`${EP}/my-listings/${type}`);

export const searchListings = (query) => client.get(`${EP}/search?${query}`);

export const postListing = (listing) => client.post(`${EP}`, listing);

export const applyToDayJob = (id) => client.post(`${EP}/apply/${id}`);

export const applyToListing = (id) => client.post(`${EP}/apply/${id}`);

export const saveListing = (id) => client.post(`${EP}/save/${id}`);

export const unsaveaveListing = (id) => client.post(`${EP}/unsave/${id}`);

export const selectCandidate = (listingId, userId) =>
  client.post(`${EP}/select-candidate`, { listingId, userId });

export const acceptOffer = (id) => client.post(`${EP}/accept-offer/${id}`);

export const completeListing = (id) => client.post(`${EP}/complete/${id}`);

export const cancelListing = (id) => client.post(`${EP}/cancel/${id}`);

export const deleteListing = (id) => client.delete(`${EP}/${id}`);

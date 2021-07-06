import client from "./client";

const EP = "/companies";

export const getLocations = () => client.get(`${EP}/locations`);

export const getCompanies = (name) => client.get(`${EP}/search/${name}`);

export const getCompany = () => client.get(`${EP}/name-logo`);

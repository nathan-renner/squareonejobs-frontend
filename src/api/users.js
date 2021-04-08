import client from "./client";

const userEP = "/users";
const portfolioEP = "/user-profiles";
const referencesEP = "/references";

export const register = (userInfo) => client.post(userEP, userInfo);

export const getPortfolio = (id) => client.get(`${portfolioEP}/${id}`);

export const getNavbarData = () => client.get(`${userEP}/navbar-data`);

export const getDashboardData = () => client.get(`${userEP}/dashboard-data`);

export const getMyDayJobs = () => client.get(`${userEP}/day-jobs`);

export const getMyFullTime = () => client.get(`${userEP}/full-time`);

export const getMyReferences = () => client.get(`${referencesEP}/user`);

export const updateAccount = (data, onUploadProgress) =>
  client.put(`${userEP}/account-details`, data, {
    headers: {
      "Content-Type": "multipart/form-data;",
    },
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });

export const uploadDocument = (data, onUploadProgress) =>
  client.post(`${portfolioEP}/document`, data, {
    headers: {
      "Content-Type": "multipart/form-data;",
    },
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });

export const deleteDocument = (id) =>
  client.delete(`${portfolioEP}/document/${id}`);

export const updatePortfolioElement = (profileId, element, value) =>
  client.put(`${portfolioEP}/${element}`, {
    profileId,
    [element]: value,
  });

import client from "./client";

const EP = "/employers";

export const getDashboardData = () => client.get(`${EP}/dashboard-data`);

export const registerEmployer = (data, onUploadProgress) =>
  client.post(`${EP}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data;",
    },
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });

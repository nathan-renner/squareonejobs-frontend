import client from "./client";

const EP = "/employers";

export const getDashboardData = () => client.get(`${EP}/dashboard-data`);

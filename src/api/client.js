import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://localhost:3900/api",
});

export default apiClient;

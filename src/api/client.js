import { create } from "apisauce";
import { getToken } from "../auth/storage";

const apiClient = create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await getToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

export default apiClient;

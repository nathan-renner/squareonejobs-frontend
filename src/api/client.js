import { create } from "apisauce";
import { getToken } from "../auth/storage";

const apiClient = create({
  baseURL: "http://localhost:3900/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await getToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

export default apiClient;

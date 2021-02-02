import client from "./client";

const endpoint = "/users";

export const register = (userInfo) => client.post(endpoint, userInfo);

//export default { register };

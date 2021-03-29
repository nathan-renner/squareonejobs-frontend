import client from "./client";

const userEP = "/users";
const portfolioEP = "/user-profiles";

export const register = (userInfo) => client.post(userEP, userInfo);

export const getPortfolio = (id) => client.get(`${portfolioEP}/${id}`);

export const getNavbarData = () => client.get(`${userEP}/navbar-data`);

export const updatePortfolioElement = (profileId, element, value) =>
  client.put(`${portfolioEP}/${element}`, {
    profileId,
    [element]: value,
  });

//export default { register };

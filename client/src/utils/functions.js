import { NODE_ENV } from "../api/urlConfig";

export const isDevEnvironment = () => NODE_ENV === "dev";

export const getDomainUrl = () => {
  return isDevEnvironment() ? "http://localhost:4000" : window.location.origin;
};

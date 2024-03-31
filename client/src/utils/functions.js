import { NODE_ENV } from "../api/urlConfig";

export const isDevEnvironment = () => NODE_ENV === "dev";

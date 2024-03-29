import { useEffect } from "react";
import axios from "axios";
import { PROD_BASE_URL, DEV_BASE_URL, NODE_ENV } from "../api/urlConfig";
import { useSelector } from "react-redux";

const axiosPrivate = axios.create({
  baseURL: NODE_ENV === "dev" ? DEV_BASE_URL : PROD_BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

const useAxiosPrivate = () => {
  const authRedux = useSelector((state) => state.auth);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        //const controller = new AbortController();

        if (!config.headers["Authorization"] && authRedux.isLoggedIn) {
          config.headers["Authorization"] = `Bearer ${authRedux.token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      async (response) => response,
      async (error) => {
        console.log("Error occurred", error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authRedux.isLoggedIn, authRedux.token]);

  return axiosPrivate;
};

export default useAxiosPrivate;

import useAxiosPrivate from "./useAxiosPrivate";
import { useSelector } from "react-redux";
import { LOGIN_URL, GET_REG_STATUS_URL } from "../api/urlConfig";

const useAuth = () => {
  const authRedux = useSelector((state) => state.auth);
  const axiosPrivate = useAxiosPrivate();

  const loginUser = async (formValues) => {
    return axiosPrivate.post(LOGIN_URL, formValues);
  };

  const userIsAuth = () => {
    return authRedux.isLoggedIn;
  };

  const doGetRegStatus = async () => {
    return axiosPrivate.post(GET_REG_STATUS_URL, {});
  };

  return {
    loginUser,
    userIsAuth,
    doGetRegStatus,
  };
};

export default useAuth;

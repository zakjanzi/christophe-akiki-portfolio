import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const authRedux = useSelector((state) => state.auth);

  const userAuthenticated = () => {
    return authRedux.isLoggedIn === true && authRedux.token !== "";
  };

  if (userAuthenticated()) {
    return children;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;

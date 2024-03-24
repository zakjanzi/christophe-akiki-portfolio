import React, { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";

const LoginContext = createContext();

export function useLogin() {
  return useContext(LoginContext);
}

export default function LoginProvider({ children }) {
  const auth = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.isLoggedIn);
  const [isAdmin, setIsAdmin] = useState(auth.isLoggedIn);

  const login = () => {
    setIsLoggedIn(true);
    setIsAdmin(JSON.parse(localStorage.getItem("user")).isAdmin);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("user");
  };

  window.onstorage = () => {
    logout();
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}

import { useLayoutEffect, useState } from "react";
import Login from "./components/Entry/Login";
import SignUp from "./components/Entry/SignUp";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewCategory from "./pages/Dashboard/pages/NewCategory/NewCategory";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import useAuth from "./hooks/useAuth";
import ViewCategories from "./pages/Dashboard/pages/NewCategory/ViewCategories/ViewCategories";

export default function App() {
  const [adminRegistered, setAdminRegistered] = useState(false);
  const { doGetRegStatus } = useAuth();

  // This hook is used to check if an admin account exists
  // It determines if the signup route should be activated or not
  useLayoutEffect(() => {
    (async () => {
      const regStatus = await doGetRegStatus();

      if (regStatus?.data?.registered) {
        setAdminRegistered(true);
      }
    })();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/signup"
          element={
            adminRegistered ? <Navigate to="/admin/login" /> : <SignUp />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="add-category" element={<NewCategory />} />
          <Route path="view-categories" element={<ViewCategories />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
        {/* <Route path="/saved" element={<SavedPosts />} /> */}
      </Routes>
      <Outlet />
    </>
  );
}

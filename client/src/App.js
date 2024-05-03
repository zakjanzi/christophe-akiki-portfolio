import { useLayoutEffect, useState } from "react";
import Login from "./components/Entry/Login";
import SignUp from "./components/Entry/SignUp";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
// import NewCategory from "./pages/Dashboard/pages/NewCategory/NewCategory";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import useAuth from "./hooks/useAuth";
// import ViewCategories from "./pages/Dashboard/pages/NewCategory/ViewCategories/ViewCategories";
import UploadImage from "./pages/Dashboard/pages/UploadImage/UploadImage";
import ViewImages from "./pages/Dashboard/pages/ViewImages/ViewImages";
import UploadVideo from "./pages/Dashboard/pages/Videos/UploadVideo";
import ViewVideos from "./pages/Dashboard/pages/Videos/ViewVideos/ViewVideos";
import AllImagesList from "./pages/Dashboard/pages/AllImagesList/AllImagesList";
// import Album from "./pages/Dashboard/pages/Albums/Albums";
// import ViewAlbums from "./pages/Dashboard/pages/Albums/ViewAlbums/ViewAlbums";

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
          {/* <Route path="add-category" element={<NewCategory />} /> */}
          {/* <Route path="view-categories" element={<ViewCategories />} /> */}
          <Route path="upload-image" element={<UploadImage />} />
          <Route path="view-images" element={<ViewImages />} />
          <Route
            path="view-images/:albumId/:categoryId"
            element={<AllImagesList />}
          />
          <Route path="upload-video" element={<UploadVideo />} />
          <Route path="view-videos" element={<ViewVideos />} />
          {/* <Route path="create-album" element={<Album />} /> */}
          {/* <Route path="view-albums" element={<ViewAlbums />} /> */}
        </Route>
        <Route path="*" element={<Navigate to="/" />} shouldRevalidate={true} />
        {/* <Route path="/saved" element={<SavedPosts />} /> */}
      </Routes>
      <Outlet />
    </>
  );
}

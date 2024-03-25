// import React, { useEffect, useState } from "react";
// import ImageWindow from "../../components/MainPage/ImageWindow/ImageWindow";
// import Intro from "../../components/MainPage/Intro/Intro";
// import ImagesContainer from "../../components/MainPage/ImagesContainer/ImagesContainer";
// import Filter from "../../components/MainPage/Filter/Filter";

import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./styles/dashboard.css";

export default function Dashboard() {
  return (
    <>
      {/* Sidebar navigation */}
      <section>
        <Sidebar />
      </section>

      {/* <section>
        <Intro setOpenUploadForm={setOpenUploadForm} />

        {openUploadForm && <UploadForm setOpenUploadForm={setOpenUploadForm} />}

        <Filter
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />

        <ImagesContainer
          currentFilter={currentFilter}
          displaySaved={false}
          style={{}}
        />

        {currentImage && <ImageWindow />}
      </section> */}

      {/* Content area */}
      <section className="page-content">
        <Outlet />
      </section>
    </>
  );
}

import React, { useEffect, useState } from "react";
import ImageWindow from "../../components/MainPage/ImageWindow/ImageWindow";
import Intro from "../../components/MainPage/Intro/Intro";
import ImagesContainer from "../../components/MainPage/ImagesContainer/ImagesContainer";
import Filter from "../../components/MainPage/Filter/Filter";
import UploadForm from "../../components/MainPage/UploadForm/UploadForm";
import { useImages } from "../../contextProviders/ImagesProvider";
import Sidebar from "./components/Sidebar/Sidebar";
import CustomScripts from "./components/CustomScripts/CustomScripts";
import { Route, Outlet, Routes } from "react-router-dom";
import "./styles/dashboard.css";

export default function Dashboard() {
  const [currentFilter, setCurrentFilter] = useState(
    localStorage.getItem("currentFilter") || "all"
  );
  const [openUploadForm, setOpenUploadForm] = useState(false);
  const { currentImage } = useImages();
  const [canLoad, setCanLoad] = useState(false);

  useEffect(() => {
    setCanLoad(true);
  }, []);

  //if there is an image to display in the image window, hide the scroll bar
  if (currentImage) {
    document.querySelector("body").style.overflow = "hidden";
  } else {
    document.querySelector("body").style.overflow = "auto";
  }

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

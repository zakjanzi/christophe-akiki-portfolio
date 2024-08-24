import { useParams } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { toastError } from "../../utils/toast";
import ImageGallery from "react-image-gallery";
import useDataHandler from "../../hooks/useDataHandler";
import { FaEye } from "react-icons/fa";
import "./styles/view-album.css";

export default function ViewAlbum() {
  const params = useParams();
  const [canShowAlbum, setCanShowAlbum] = useState(false);
  const [albumImages, setAlbumImages] = useState(null);
  const { doFetchAlbumImages } = useDataHandler();

  useLayoutEffect(() => {
    try {
      const fetchAlbumImages = async () => {
        const response = await doFetchAlbumImages(params.albumId);

        if (!response.data.success) {
          toastError("Couldn't fetch album images.");
          return;
        }

        const images = response.data.images.map((image) => {
          return {
            original: `${getDomainUrl()}/images/${image.originalName}`,
            thumbnail: `${getDomainUrl()}/images/${image.originalName}`,
          };
        });

        setAlbumImages(images);
      };

      fetchAlbumImages();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getDomainUrl = () => {
    return process.env.NODE_ENV !== "production"
      ? "http://localhost:4000"
      : window.location.origin;
  };

  const getAlbumTitle = () => {
    return "";
  };

  const showAlbumGallery = () => {
    setCanShowAlbum(true);
  };

  const hideGallery = () => {
    setCanShowAlbum(false);
    // setAlbumImages([]);
  };

  return (
    <main
      className="d-flex flex-row justify-content-center align-items-center w-100 h-100"
      style={{
        background: canShowAlbum ? "black" : "white",
      }}
    >
      {!canShowAlbum && (
        <button
          className="text-white px-5 py-4 d-flex align-items-center"
          style={{
            background: "darkblue",
            fontWeight: "bold",
            margin: "0 auto",
            borderRadius: "1rem",
          }}
          onClick={showAlbumGallery}
        >
          <FaEye className="fs-2 me-4" /> View <b>{getAlbumTitle()}</b> &nbsp;
          album
        </button>
      )}

      {canShowAlbum && albumImages && (
        <>
          <div
            className="d-flex justify-content-end cursor-pointer z-2 mt-4 w-100 position-absolute top-0"
            onClick={() => hideGallery()}
          >
            <i className="fa fa-close text-white fs-1 me-4 position-relative cursor-pointer gallery-close-btn"></i>
          </div>
          <ImageGallery items={albumImages} />
        </>
      )}
    </main>
  );
}

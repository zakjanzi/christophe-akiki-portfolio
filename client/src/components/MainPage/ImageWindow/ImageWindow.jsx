import "./ImageWindow.css";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import ConfirmDeleting from "./ConfirmDeleting/ConfirmDeleting";
import { ToastContainer, toast } from "react-toastify";
import { NODE_ENV, PROD_BASE_URL, DEV_BASE_URL } from "../../../api/urlConfig";
import useDataSaver from "../../../hooks/useDataSaver";
import { toastError } from "../../../utils/toast";

export default function ImageWindow(props) {
  const [openConfirmDeleting, setOpenConfirmDeleting] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const SERVER_URL =
    NODE_ENV === "production" ? window.location.origin : DEV_BASE_URL;
  const { isNew, setIsNew, image, resetImages } = props;
  const { doDeleteImage } = useDataSaver();

  useEffect(() => {
    if (isNew) setCurrentImage(image);

    setIsNew(false);
  }, [image, isNew, setIsNew]);

  const close = (e) => {
    // if (
    //   e.target.classList.contains("image-window") ||
    //   e.target.classList.contains("window-cross-icon")
    // )
    setCurrentImage(null);
  };

  const deleteImage = () => {
    doDeleteImage(currentImage._id)
      .then((res) => {
        if (res.data.success) {
          setCurrentImage(null);
        } else {
          console.log(res.data.message);
          toastError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    currentImage !== null && (
      <div className="image-window" onClick={close}>
        {openConfirmDeleting && (
          <ConfirmDeleting
            setOpenConfirmDeleting={setOpenConfirmDeleting}
            deletePhoto={deleteImage}
          />
        )}

        <div className="image-window__container d-flex justify-content-center">
          <button
            id="close-button-id"
            onClick={(e) => close(e)}
            className="window-close-btn window-cross-icon"
          >
            <RxCross2 className="window-cross-icon" onClick={(e) => close(e)} />
          </button>
          <div className="image-wraper">
            <img
              src={`${SERVER_URL}/images/${currentImage.originalName}`}
              alt={currentImage.title}
            />
            <div className="upper">
              <div className="info">{/* <p>{currentImage.category}</p> */}</div>
            </div>
            <div className="lower">
              <div className="actions">
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenConfirmDeleting(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  );
}

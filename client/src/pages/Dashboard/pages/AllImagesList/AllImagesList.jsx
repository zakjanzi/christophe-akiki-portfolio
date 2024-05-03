import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDataHandler from "../../../../hooks/useDataHandler";
import { toastError, toastSuccess } from "../../../../utils/toast";
import { NODE_ENV } from "../../../../api/urlConfig";
import { ToastContainer } from "react-toastify";
import "./styles/all-images-list.css";

const AllImagesList = () => {
  const params = useParams();
  const { doFetchAlbumCategoryImages, doDeleteImageForAlbumCategory } =
    useDataHandler();
  const [loadingImages, setLoadingImages] = useState(true);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    doFetchAlbumCategoryImages(params.albumId, params.categoryId)
      .then((res) => {
        setLoadingImages(false);
        if (!res.data.success) {
          toastError(res.data.message);
          return;
        } else {
          const images = res.data.images;

          setAllImages(images);
        }
      })
      .catch((err) => {
        // console.log("Load images error: ", err);
        setLoadingImages(false);
      });
  }, []);

  const getDomainUrl = () => {
    return NODE_ENV === "dev"
      ? "http://localhost:4000"
      : window.location.origin;
  };

  const handleDelete = async (imageId) => {
    try {
      const res = await doDeleteImageForAlbumCategory(imageId);

      if (!res.data.success) {
        toastError(res.data.message);
        return;
      }

      toastSuccess(res.data.message);

      const imagesList = allImages.filter((image) => {
        return image._id !== imageId;
      });

      setAllImages(imagesList);
    } catch (error) {
      toastError(error.response?.data?.message);
    }
  };

  return (
    <section className="w-100 px-4 py-3 d-flex gap-5 all-images-container">
      {allImages.length > 0 &&
        allImages.map((image) => {
          return (
            <div
              className="single-image"
              key={image._id}
              style={{
                backgroundImage: `url(${getDomainUrl()}/images/${
                  image.originalName
                })`,
              }}
              onMouseOver={(e) =>
                e.currentTarget.children[1].classList.remove("d-none")
              }
              onMouseOut={(e) =>
                e.currentTarget.children[1].classList.add("d-none")
              }
            >
              <div
                className="image-overlay"
                onMouseOver={(e) => e.currentTarget.classList.add("show")}
                onMouseOut={(e) => e.currentTarget.classList.remove("show")}
              ></div>
              <strong
                className="overlay-text btn btn-danger d-none flex-column justify-content-center align-items-center"
                onClick={() => handleDelete(image._id)}
              >
                Delete
              </strong>
            </div>
          );
        })}

      {loadingImages === true && (
        <div className="load">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
        </div>
      )}

      {!loadingImages && allImages.length === 0 && (
        <p className="d-flex justify-content-center w-100">
          <strong className="text-grey fs-2">
            No images found for this Category
          </strong>
        </p>
      )}
      <ToastContainer />
    </section>
  );
};

export default AllImagesList;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./UploadForm.css";
import { BsFillCameraFill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastError, toastSuccess } from "../../../../../utils/toast";
import useDataSaver from "../../../../../hooks/useDataSaver";

export default function UploadForm(props) {
  const [images, setImages] = useState([]);
  // const [category, setCategory] = useState("");
  // const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [album, setAlbum] = useState("");
  const [albums, setAlbums] = useState([]);
  // const [categoriesForAlbum, setCategoriesForAlbum] = useState([]);
  const { doFetchAlbums, doFetchCategories, doUploadImage } = useDataSaver();

  // Fetch albums and categories from DB
  useEffect(() => {
    (async () => {
      try {
        // const res = await Promise.all([doFetchAlbums(), doFetchCategories()]);

        // if (res[0].data.success) {
        //   setAlbums(res[0].data.albums);

        //   setCategories(res[1].data.categories);
        // } else {
        //   toastError(res[0].data.message);
        // }

        const res = await doFetchAlbums();

        if (res.data.success) {
          setAlbums(res.data.albums);
        } else {
          toastError(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toastError(error.response?.data?.message);
      }
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("album", album);
    // formData.append("category", category);

    Array.from(images).forEach((file, i) => {
      formData.append("images", file);
    });

    if (!images.length) {
      toastError("Please select an image(s)");
      return;
    }
    if (!album) {
      toastError("Please select an album");
      return;
    }
    // if (!category) {
    //   toastError("Please select a category");
    //   return;
    // }

    setLoading(true);
    console.log(formData);

    try {
      const res = await doUploadImage(formData);

      if (res.data.success) {
        toastSuccess(res.data.message);
        // setImages((prev) => [res.data.imageToSend, ...prev]);
        // const category = res.data.imageToSend?.category;
        // setCategories((prev) =>
        //   prev.includes(category.toLowerCase())
        //     ? [...prev]
        //     : [...prev, category.toLowerCase()]
        // );
        setImages([]);
        // setCategory("");
      } else {
        toastError(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      toastError(error.response?.data?.message);
      console.log(error);
      setLoading(false);
    }
  };

  const handleAlbumChange = (albumName) => {
    setAlbum(albumName);

    // const albumCategories = categories.filter(
    //   (singleCategory) => singleCategory.album === albumName
    // );

    // setCategoriesForAlbum((prev) => albumCategories);
  };

  return (
    <div className="upload-form">
      <div className="form-b">
        <div className="up-form">
          <h1>Upload new image</h1>
          <p className="subtitle">Please fill in all required fields</p>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="file-input" className="file-label">
              {!images && <BsFillCameraFill className="camera-icon " />}
              {images.length > 0 &&
                Array.from(images).map((singleImage, index) => {
                  return (
                    <>
                      <p key={index}>{singleImage.name}</p>{" "}
                      {index < Array.from(images).length && "|"}
                      <br />
                    </>
                  );
                })}
              <input
                type="file"
                multiple="multiple"
                onChange={(event) => setImages(event.target.files)}
                name="images"
                accept="image/png, image/jpg, image/gif, image/jpeg"
                id="file-input"
              />
            </label>

            <div className="wraber">
              <label className="required">Album</label>
              <select
                value={album}
                onChange={(event) => handleAlbumChange(event.target.value)}
                className="select"
              >
                <option value="">Select an Album</option>
                {albums.length > 0 &&
                  albums.map((singleAlbum) => (
                    <option key={singleAlbum.name} value={singleAlbum.name}>
                      {singleAlbum.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* <div className="wraber">
              <label className="required">Category</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="select"
              >
                <option value="" disabled={true}>
                  Select a category
                </option>
                {categoriesForAlbum.length > 0 &&
                  categoriesForAlbum.map((category) => (
                    <option value={category.name}>{category.name}</option>
                  ))}
              </select>
            </div> */}

            {loading && (
              <div className="load">
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
              </div>
            )}
            <button type="submit">Upload</button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

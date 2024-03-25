import React, { useLayoutEffect, useState } from "react";
import "./UploadForm.css";
import { BsFillCameraFill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useImages } from "../../../../../contextProviders/ImagesProvider";
import { toastError, toastSuccess } from "../../../../../utils/toast";
import useDataSaver from "../../../../../hooks/useDataSaver";

export default function UploadForm(props) {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [album, setAlbum] = useState("");
  const [albums, setAlbums] = useState([]);
  const [categoriesForAlbum, setCategoriesForAlbum] = useState([]);
  const { doFetchAlbums, doFetchCategories, doUploadImage } = useDataSaver();

  // Fetch albums and categories from DB
  useLayoutEffect(() => {
    (async () => {
      try {
        const res = await Promise.all([doFetchAlbums(), doFetchCategories()]);

        if (res[0].data.success) {
          setAlbums(res[0].data.albums);

          setCategories(res[1].data.categories);
        } else {
          toastError(res[0].data.message);
        }
      } catch (error) {
        console.log(error);
        toastError(error.response?.data?.message);
      }
    })();
  }, [doFetchAlbums, doFetchCategories]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("album", album);
    formData.append("category", category);
    formData.append("image", image);
    if (!image) {
      toastError("Please select an image");
      return;
    }
    if (!album) {
      toastError("Please select an album");
      return;
    }
    if (!category) {
      toastError("Please select a category");
      return;
    }

    setLoading(true);

    try {
      const res = await doUploadImage(formData);

      if (res.data.success) {
        toastSuccess(res.data.message);
        // setImages((prev) => [res.data.imageToSend, ...prev]);
        const category = res.data.imageToSend.category;
        setCategories((prev) =>
          prev.includes(category.toLowerCase())
            ? [...prev]
            : [...prev, category.toLowerCase()]
        );
        setImage(null);
        setCategory("");
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

    console.log(albumName, categories);

    const albumCategories = categories.filter(
      (singleCategory) => singleCategory.album === albumName
    );

    setCategoriesForAlbum((prev) => albumCategories);
  };

  return (
    <div className="upload-form">
      <div className="form-b">
        <div className="up-form">
          <h1>Upload new image</h1>
          <p className="subtitle">Please fill in all required fields</p>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="file-input" className="file-label">
              {!image && <BsFillCameraFill className="camera-icon " />}
              {image && <p>{image.name}</p>}
              <input
                type="file"
                onChange={(event) => setImage(event.target.files[0])}
                name="image"
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

            <div className="wraber">
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
            </div>

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

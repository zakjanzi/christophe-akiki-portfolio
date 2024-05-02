/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./UploadForm.css";
import { BsFillCameraFill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastError, toastSuccess } from "../../../../../utils/toast";
import useDataSaver from "../../../../../hooks/useDataSaver";

const ALBUM_SELECT_OPTIONS = {
  SELECT_ALBUM: "Select Album",
  CREATE_ALBUM: "Create Album",
};

const CATEGORY_SELECT_OPTIONS = {
  SELECT_CATEGORY: "Select Category",
  CREATE_CATEGORY: "Create Category",
};

export default function UploadForm(props) {
  const [categoriesForAlbum, setCategoriesForAlbum] = useState([]);
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [existingAlbumSelected, setExistingAlbumSelected] = useState(true);
  const [canCreateAlbumName, setCanCreateAlbumName] = useState(true);
  const [canCreateCategoryName, setCanCreateCategoryName] = useState(true);
  const [existingCategorySelected, setExistingCategorySelected] =
    useState(true);
  const [categoriesSectionEnabled, setCategoriesSectionEnabled] =
    useState(false);
  const { doFetchAlbums, doFetchCategoriesForAlbum, doUploadImage } =
    useDataSaver();
  const [formValues, setFormValues] = useState({
    images: [],
    albumId: "",
    albumThumbnail: "",
    albumName: "",
    categoryThumbnail: "",
    categoryName: "",
    categoryId: "",
  });

  // Fetch albums and categories from DB
  useEffect(() => {
    (async () => {
      try {
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

    Array.from(formValues.images).forEach((file, i) => {
      formData.append("images", file);
    });

    /**
     * Validation of form
     */

    if (!formValues.images.length) {
      toastError("Please select an image(s)");
      return;
    }

    if (existingAlbumSelected) {
      if (!formValues.albumId) {
        toastError("Please select an album from the dropdown");
        return;
      }
    }

    if (!existingAlbumSelected) {
      if (!canCreateAlbumName) {
        toastError(
          "The provided Album exists. Choose from Select Album dropdown."
        );
        return;
      }

      if (!formValues.albumName && !formValues.albumThumbnail) {
        toastError(
          "Please enter an album name and select a thumbnail for the new album"
        );
        return;
      }

      if (!formValues.albumName) {
        toastError("Please enter a name for the new Album");
        return;
      }

      if (!formValues.albumThumbnail) {
        toastError("Please select an image for the thumbnail of the new album");
        return;
      }
    }

    // This validation step executes if user wants to choose from an existing category
    if (existingCategorySelected) {
      if (!formValues.categoryId) {
        toastError("Please select a category from the dropdown");
        return;
      }
    }

    // This validation step executes if user wants to create a new category for the album
    if (!existingCategorySelected) {
      if (!canCreateCategoryName) {
        toastError(
          "The provided Category exists. Choose from Select Category dropdown."
        );
        return;
      }

      if (!formValues.categoryName && !formValues.categoryThumbnail) {
        toastError(
          "Please enter a category name and select a thumbnail for the new Category"
        );
        return;
      }

      if (!formValues.categoryName) {
        toastError("Please enter a name for the new Category");
        return;
      }

      if (!formValues.categoryThumbnail) {
        toastError(
          "Please select an image for the thumbnail of the new category"
        );
        return;
      }
    }

    /**
     *  Validation End
     *
     */

    if ("" !== formValues.albumId) {
      formData.append("albumId", formValues.albumId);
    }

    if ("" !== formValues.albumName) {
      formData.append("albumName", formValues.albumName);
    }

    if ("" !== formValues.albumThumbnail) {
      formData.append("albumThumbnail", formValues.albumThumbnail);
    }

    if ("" !== formValues.categoryId) {
      formData.append("categoryId", formValues.categoryId);
    }

    if ("" !== formValues.categoryName) {
      formData.append("categoryName", formValues.categoryName);
    }

    if ("" !== formValues.categoryThumbnail) {
      formData.append("categoryThumbnail", formValues.categoryThumbnail);
    }

    setLoading(true);

    try {
      const res = await doUploadImage(formData);

      if (res.data.success) {
        toastSuccess(res.data.message);
        resetUploadForm();
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

  const disableEntireForm = () => {};

  const resetUploadForm = () => {
    disableEntireForm();

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const imagesSelected = () => formValues.images.length > 0;

  const highlightTitle = (title) => {
    switch (title) {
      case ALBUM_SELECT_OPTIONS.CREATE_ALBUM:
        setExistingAlbumSelected((prev) => false);

        // For new albums, a new category must be created
        setExistingCategorySelected((prev) => false);

        // Reset the array of categories to an empty array
        // so user does not select the category of an existing album as its own
        setCategoriesForAlbum([]);

        // Reset the value of albumId so only the value of the new album
        // to be created is acknowledged
        setFormValues((prev) => ({ ...prev, albumId: "" }));
        break;
      case ALBUM_SELECT_OPTIONS.SELECT_ALBUM:
        setExistingAlbumSelected((prev) => true);

        // An existing album has at least one category.
        setExistingCategorySelected((prev) => true);

        // Reset the value of categoryId
        setFormValues((prev) => ({ ...prev, categoryId: "" }));
        break;
      default:
        setExistingAlbumSelected((prev) => true);
        break;
    }
  };

  const setImages = (images) => {
    setFormValues((prev) => ({ ...prev, images }));
  };

  const setAlbumThumbnail = (images) => {
    setFormValues((prev) => ({ ...prev, albumThumbnail: images[0] }));
  };

  const albumImageSelected = () => {
    return "" !== formValues.albumThumbnail;
  };

  const resetAlbumThumbnail = () =>
    setFormValues((prev) => ({ ...prev, albumThumbnail: "" }));

  const highlightCategorySection = (title) => {
    switch (title) {
      case CATEGORY_SELECT_OPTIONS.CREATE_CATEGORY:
        setExistingCategorySelected((prev) => false);

        setCanCreateCategoryName((_) => true);

        setFormValues((prev) => ({
          ...prev,
          categoryName: "",
          categoryThumbnail: "",
        }));
        break;
      case CATEGORY_SELECT_OPTIONS.SELECT_CATEGORY:
        setExistingCategorySelected((prev) => true);

        // Reset the value of categoryId because the user is not
        // making use of existing category
        setFormValues((prev) => ({ ...prev, categoryId: "" }));
        break;
      default:
        setExistingCategorySelected((prev) => true);
        break;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setCategoryThumbnail = (images) => {
    setFormValues((prev) => ({ ...prev, categoryThumbnail: images[0] }));
  };

  const categoryImageSelected = () => {
    return "" !== formValues.categoryThumbnail;
  };

  const resetCategoryThumbnail = () =>
    setFormValues((prev) => ({ ...prev, categoryThumbnail: "" }));

  const validateAlbumAvailability = (newAlbumName) => {
    const isValidAlbumName =
      albums.find(
        (album) => album.title.toLowerCase() === newAlbumName.toLowerCase()
      ) === undefined;

    setCanCreateAlbumName((prev) => isValidAlbumName);
    setCategoriesSectionEnabled((prev) => isValidAlbumName);

    // Reset the value of albumId and thumbnail because the albumName input is the one in use
    if (isValidAlbumName) {
      setFormValues((prev) => ({ ...prev, albumId: "", albumThumbnail: "" }));
    }
  };

  // This function is called when the user selects from existing albums
  const enableCategoriesSection = () => {
    setCategoriesSectionEnabled((prev) => true);

    // Reset the value of albumName since the albumId of the selected album is the one in use
    setFormValues((prev) => ({ ...prev, albumName: "" }));
  };

  const fetchAndPopulateAlbumCategories = async (albumId) => {
    // This check ensures no call is made to the server
    // if no album has been selected from the dropdown
    if (albumId === "") {
      setCategoriesForAlbum([]);
      return;
    }

    try {
      const res = await doFetchCategoriesForAlbum(albumId);

      if (res.data.success) {
        setCategoriesForAlbum(res.data.categories);
      } else {
        toastError(res.data.message);
      }
    } catch (error) {}
  };

  const validateCategoryAvailability = (categoryName) => {
    if (existingAlbumSelected) {
      const isValidCategoryName =
        categoriesForAlbum.find(
          (category) =>
            category.name.toLowerCase() === categoryName.toLowerCase()
        ) === undefined;

      setCanCreateCategoryName((prev) => isValidCategoryName);
    }
  };

  const resetCreateCategoryInput = () => {
    setFormValues((prev) => ({
      ...prev,
      categoryName: "",
      categoryThumbnail: "",
    }));
  };

  const resetImagesUploadForm = (e) =>
    setFormValues((prev) => ({ ...prev, images: [] }));

  return (
    <div className="image-upload-form">
      <div className="form-b">
        <div className="up-form">
          <h1>Upload new image</h1>
          <p className="subtitle">Please fill in all required fields</p>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <strong className="text-grey text-start w-100">
              Select image(s) to be uploaded into the Album
            </strong>
            {/* Images to be uploaded to a particular Album category */}
            <label
              htmlFor="album-images"
              className="file-label"
              style={{
                alignItems: !imagesSelected() ? "center" : "start",
                justifyContent: !imagesSelected() ? "center" : "unset",
              }}
            >
              {!imagesSelected() && (
                <BsFillCameraFill className="camera-icon " />
              )}
              {imagesSelected() && (
                <>
                  <section
                    className="x-close-button-container"
                    style={{ display: !imagesSelected() ? "none" : "" }}
                  >
                    <span
                      className="x-close-button"
                      onClick={(e) => resetImagesUploadForm(e)}
                    >
                      x
                    </span>
                  </section>
                  {Array.from(formValues.images).map((singleImage, index) => {
                    return <span key={index}>{singleImage.name}</span>;
                  })}
                </>
              )}

              <input
                type="file"
                multiple="multiple"
                onChange={(event) => setImages(event.target.files)}
                name="images"
                accept="image/png, image/jpg, image/gif, image/jpeg"
                className="file-input"
                id="album-images"
              />
            </label>
            {/* End images to be uploaded to a particular Album category */}

            {/* Select Album to upload to, or create a new Album */}
            <section className="album-section-wrapper">
              <div className="wrapper">
                <section
                  role="button"
                  tabindex="0"
                  className={`${
                    existingAlbumSelected ? "highlight" : "unhighlight"
                  }`}
                  onClick={
                    () => highlightTitle(ALBUM_SELECT_OPTIONS.SELECT_ALBUM) // also performs other operations
                  }
                >
                  <p>{ALBUM_SELECT_OPTIONS.SELECT_ALBUM}</p>
                </section>
                <section
                  role="button"
                  tabindex="0"
                  className={`${
                    !existingAlbumSelected ? "highlight" : "unhighlight"
                  }`}
                  onClick={
                    () => highlightTitle(ALBUM_SELECT_OPTIONS.CREATE_ALBUM) // also performs other operations
                  }
                >
                  <p>{ALBUM_SELECT_OPTIONS.CREATE_ALBUM}</p>
                </section>
              </div>

              <div className="w-100">
                {existingAlbumSelected && (
                  <>
                    <select
                      onChange={(event) => {
                        handleChange(event);

                        enableCategoriesSection();

                        // Get all the existing categories for this Album
                        fetchAndPopulateAlbumCategories(event.target.value);
                      }}
                      className="select light-border"
                      name="albumId"
                      value={formValues.albumId}
                    >
                      <option value="">---Select an Album---</option>
                      {albums.length > 0 &&
                        albums.map((singleAlbum) => (
                          <option
                            key={singleAlbum.title}
                            value={singleAlbum._id}
                          >
                            {singleAlbum.title}
                          </option>
                        ))}
                    </select>
                  </>
                )}

                {!existingAlbumSelected && (
                  <>
                    <input
                      type="text"
                      name="albumName"
                      placeholder="Enter the name for the new Album"
                      onChange={(event) => {
                        handleChange(event);
                        validateAlbumAvailability(event.target.value);
                      }}
                      value={formValues.albumName}
                      className="w-100 position-relative mb-3"
                    />

                    {/* Display Album Name Availability */}
                    {!canCreateAlbumName && (
                      <p className="alert alert-danger">
                        Album exists. Please select from existing album or
                        provide another name.
                      </p>
                    )}

                    {/* New Album thumbnail */}
                    <strong className="text-grey">
                      Choose Album Thumbnail image
                    </strong>
                    <label
                      htmlFor="album-thumbnail"
                      className="file-label mt-2"
                      style={{
                        alignItems: !albumImageSelected() ? "center" : "start",
                        justifyContent: !albumImageSelected()
                          ? "center"
                          : "unset",
                      }}
                    >
                      {!albumImageSelected() && (
                        <BsFillCameraFill className="camera-icon " />
                      )}
                      {albumImageSelected() && (
                        <>
                          <section
                            className="x-close-button-container"
                            style={{
                              display: !albumImageSelected() ? "none" : "",
                            }}
                          >
                            <span
                              className="x-close-button"
                              onClick={() => resetAlbumThumbnail()}
                            >
                              x
                            </span>
                          </section>
                          <span>{formValues.albumThumbnail.name}</span>
                        </>
                      )}

                      <input
                        type="file"
                        onChange={(event) =>
                          setAlbumThumbnail(event.target.files)
                        }
                        name="albumThumbnail"
                        accept="image/png, image/jpg, image/gif, image/jpeg"
                        className="file-input"
                        id="album-thumbnail"
                      />
                    </label>
                  </>
                )}
              </div>
            </section>
            {/* End select Album to upload to, or create a new Album */}

            {/* Select Album Category to upload to, or create a new Album Category */}
            <section className="category-section-wrapper position-relative">
              {/* This is an overlay preventing the user from interacting with the categories section until the album value is valid */}
              {!categoriesSectionEnabled && (
                <div className="w-100 h-100 position-absolute top-0 left-0 z-3 bg-white opacity-75"></div>
              )}
              <div className="wrapper">
                <section
                  role="button"
                  tabindex="0"
                  className={`${
                    existingCategorySelected ? "highlight" : "unhighlight"
                  }`}
                  onClick={() => {
                    highlightCategorySection(
                      CATEGORY_SELECT_OPTIONS.SELECT_CATEGORY
                    );

                    resetCreateCategoryInput();
                  }}
                >
                  <p>{CATEGORY_SELECT_OPTIONS.SELECT_CATEGORY}</p>
                </section>
                <section
                  role="button"
                  tabindex="0"
                  className={`${
                    !existingCategorySelected ? "highlight" : "unhighlight"
                  }`}
                  onClick={() =>
                    highlightCategorySection(
                      CATEGORY_SELECT_OPTIONS.CREATE_CATEGORY
                    )
                  }
                >
                  <p>{CATEGORY_SELECT_OPTIONS.CREATE_CATEGORY}</p>
                </section>
              </div>

              <div className="w-100">
                {existingCategorySelected && (
                  <>
                    <select
                      onChange={(event) => {
                        handleChange(event);
                        resetCreateCategoryInput();
                      }}
                      className="select light-border"
                      name="categoryId"
                      value={formValues.categoryId}
                    >
                      <option value="">---Select a Category---</option>
                      {categoriesForAlbum.length > 0 &&
                        categoriesForAlbum.map((singleAlbumCategory) => (
                          <option
                            key={singleAlbumCategory.name}
                            value={singleAlbumCategory._id}
                          >
                            {singleAlbumCategory.name}
                          </option>
                        ))}
                    </select>
                  </>
                )}

                {!existingCategorySelected && (
                  <>
                    <input
                      type="text"
                      name="categoryName"
                      placeholder="Enter the name for the new Category"
                      value={formValues.categoryName}
                      onChange={(event) => {
                        handleChange(event);
                        validateCategoryAvailability(event.target.value);
                      }}
                      className="w-100 position-relative mb-3"
                    />

                    {/* Display Category Name Availability */}
                    {!canCreateCategoryName && (
                      <p className="alert alert-danger">
                        Category exists. Please select from existing category or
                        provide another name.
                      </p>
                    )}

                    {/* New Category thumbnail */}
                    <strong className="text-grey">
                      Choose Category Thumbnail image
                    </strong>
                    <label
                      htmlFor="category-thumbnail"
                      className="file-label mt-2"
                      style={{
                        alignItems: !categoryImageSelected()
                          ? "center"
                          : "start",
                        justifyContent: !categoryImageSelected()
                          ? "center"
                          : "unset",
                      }}
                    >
                      {!categoryImageSelected() && (
                        <BsFillCameraFill className="camera-icon " />
                      )}
                      {categoryImageSelected() && (
                        <>
                          <section
                            className="x-close-button-container"
                            style={{
                              display: !categoryImageSelected() ? "none" : "",
                            }}
                          >
                            <span
                              className="x-close-button"
                              onClick={() => resetCategoryThumbnail()}
                            >
                              x
                            </span>
                          </section>
                          <span>{formValues.categoryThumbnail.name}</span>
                        </>
                      )}

                      <input
                        type="file"
                        onChange={(event) =>
                          setCategoryThumbnail(event.target.files)
                        }
                        name="categoryThumbnail"
                        accept="image/png, image/jpg, image/gif, image/jpeg"
                        className="file-input"
                        id="category-thumbnail"
                      />
                    </label>
                  </>
                )}
              </div>
            </section>
            {/* End select Album to upload to, or create a new Album */}

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

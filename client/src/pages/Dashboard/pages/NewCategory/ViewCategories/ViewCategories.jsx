import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../../../../utils/toast";
import useDataHandler from "../../../../../hooks/useDataHandler";
import { useParams, Link } from "react-router-dom";
import { getDomainUrl } from "../../../../../utils/functions";
import LoadingIcon from "../../../../../assets/loading.gif";
import { ToastContainer } from "react-toastify";
import { BsFillCameraFill } from "react-icons/bs";
import { FaCopy, FaSearch, FaShareAlt } from "react-icons/fa";
import "./styles/view-categories.css";

const ViewCategories = () => {
  const [categories, setCategories] = useState(null);
  const [loadingSpinnerIndex, setLoadingSpinnerIndex] = useState(-1);
  const [categoryEditId, setCategoryEditId] = useState("");
  const [formValues, setFormValues] = useState({
    newCategoryName: "",
    categoryThumbnail: "",
  });
  const [apiCallActive, setApiCallActive] = useState(false);

  const { doFetchCategoriesForAlbum, doDeleteCategory, doUpdateCategory } =
    useDataHandler();
  const params = useParams();

  useEffect(() => {
    fetchCategories(params.albumId);
  }, []);

  const fetchCategories = async (albumId) => {
    try {
      const res = await doFetchCategoriesForAlbum(albumId);

      if (res.data.success) {
        setCategories(res.data.categories);
      } else {
        toastError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toastError(error.response?.data?.message);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const res = await doDeleteCategory(categoryId);

      if (res.data.success) {
        setCategories(res.data.categories);
        toastSuccess(res.data.message);
      } else {
        toastError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toastError(error.response?.data?.message);
    }
  };

  const showEditCategoryForm = (categoryId) => {
    setCategoryEditId(categoryId);
  };

  const showLoadingSpinner = (index) => {
    setLoadingSpinnerIndex(index);
  };

  const renameCategoryValue = (e) => {
    setFormValues((prev) => ({
      ...prev,
      newCategoryName: e.target.value,
    }));
  };

  const updateCategory = async () => {
    try {
      setApiCallActive(true);

      const formData = new FormData();

      formData.append("categoryId", categoryEditId);

      formData.append("newCategoryName", formValues.newCategoryName);

      if ("" !== formValues.categoryThumbnail) {
        formData.append("categoryThumbnail", formValues.categoryThumbnail);
      }

      const res = await doUpdateCategory(formData);

      setApiCallActive(false);
      // console.log(res.data);

      if (res.data.success) {
        toastSuccess(res.data.message);
        const updatedCategory = res.data.updatedCategory;

        const updatedList = categories.map((category) => {
          return category._id === updatedCategory._id
            ? updatedCategory
            : category;
        });

        setCategories(updatedList);

        setCategoryEditId("");

        resetEditForm();
      }
    } catch (error) {
      toastError(error.response?.data?.message);
    }
  };

  const resetEditForm = () => {
    setFormValues({
      newCategoryName: "",
      categoryThumbnail: "",
    });
  };

  const resetCategoryEditId = () => {
    setCategoryEditId("");
  };

  const resetCategoryThumbnail = () =>
    setFormValues((prev) => ({ ...prev, categoryThumbnail: "" }));

  const setCategoryThumbnail = (images) => {
    setFormValues((prev) => ({ ...prev, categoryThumbnail: images[0] }));
  };

  const initCategoryNameInput = (name) => {
    setFormValues((prev) => ({ ...prev, newCategoryName: name }));
  };

  const categoryImageSelected = () => {
    return "" !== formValues.categoryThumbnail;
  };

  const copyAlbumLink = (link) => {
    navigator.clipboard.writeText(link);
    toastSuccess("Album link copied");
  };

  const showLinkBox = (id) => {
    document.querySelector(id).classList.remove("d-none");
  };

  const hideLinkBox = (linkBox) => {
    console.log("Linkbox: ", linkBox);
    document.querySelector(linkBox).classList.add("d-none");
  };

  /**
   * Categories plain text switched
   */
  return (
    <>
      <div id="work" className="w-100 py-3 px-5">
        {/* Categories renamed to Albums */}
        <h2 className="text-dark">Albums</h2>
        <section id="content">
          {categories !== null && categories.length === 0 && (
            <div className="alert alert-danger w-100 mt-4 text-center fw-bold fs-2">
              No albums found for this category
            </div>
          )}

          {categories !== null &&
            categories.map((category, index) => {
              return (
                <div
                  className="category-card d-flex flex-column mb-3 position-relative"
                  key={category._id}
                >
                  {/* Share button icon */}
                  <section
                    className="share-album-container w-100 position-relative"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div
                      className="share-album-btn"
                      onClick={(e) => {
                        copyAlbumLink(
                          `${window.location.origin}/view-album/${category.link}`
                        );
                      }}
                    >
                      <FaShareAlt />
                    </div>
                  </section>
                  {/* End share button implementation */}
                  <Link
                    to={`/dashboard/view-images/${category.albumId}/${category._id}`}
                    className="position-relative z-10"
                  >
                    <div
                      className="single-category d-flex flex-column position-relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        showLoadingSpinner(index);
                      }}
                    >
                      <div className="category-content w-100 h-100 position-relative d-flex flex-row justify-content-center align-items-center">
                        <img
                          src={`${getDomainUrl()}/images/${category.thumbnail}`}
                          className="w-100 h-100 position-absolute top-0 left-0"
                          alt={category.name}
                        />
                        <span className="position-relative">
                          {category.name}
                        </span>
                      </div>

                      {/* LOADING ICON */}
                      <div
                        className={`loading-icon w-100 h-100 d-flex justify-content-center align-items-center position-absolute ${
                          loadingSpinnerIndex === index
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <img src={LoadingIcon} alt="loading spinner" />
                      </div>
                      {/* LOADING ICON */}
                    </div>
                  </Link>
                  <div className="d-flex flex-column justify-content-between gap-2">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => {
                        showEditCategoryForm(category._id);
                        initCategoryNameInput(category.name);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteCategory(category._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </section>

        {/* Modal for Editing Category */}
        {categoryEditId && (
          <div
            className="edit-category-modal"
            onClick={() => resetCategoryEditId()}
          >
            <div
              className="edit-category-container flex-column"
              onClick={(e) => e.stopPropagation()}
            >
              <strong className="text-grey">
                Change Album Thumbnail image
              </strong>
              <label
                htmlFor="category-thumbnail"
                className="file-label mt-2"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {!categoryImageSelected() && (
                  <BsFillCameraFill className="camera-icon " />
                )}
                {categoryImageSelected() && (
                  <>
                    <section className="x-close-button-container">
                      <span
                        className="x-close-button"
                        onClick={() => resetCategoryThumbnail()}
                      >
                        x
                      </span>
                    </section>
                    <span>{formValues.categoryThumbnail?.name}</span>
                  </>
                )}

                <input
                  type="file"
                  onChange={(event) =>
                    setCategoryThumbnail(
                      event.target.files.length > 0 ? event.target.files : [""]
                    )
                  }
                  name="categoryThumbnail"
                  accept="image/png, image/jpg, image/gif, image/jpeg"
                  className="file-input"
                  id="category-thumbnail"
                />
              </label>
              {/* Album Name changed FROM Category name */}
              <label htmlFor="new-category-name" className="text-grey">
                Album Name
                <input
                  type="text"
                  id="new-category-name"
                  value={formValues.newCategoryName}
                  onChange={renameCategoryValue}
                  onClick={(e) => e.stopPropagation()}
                  className="text-grey fw-normal form-control mt-2"
                />
              </label>

              {!apiCallActive && (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateCategory();
                  }}
                >
                  Update album
                  {/* Text above, formerly (Update category) */}
                </button>
              )}
              {apiCallActive ? (
                <div className="load" onClick={(e) => e.stopPropagation()}>
                  <div className="one"></div>
                  <div className="two"></div>
                  <div className="three"></div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default ViewCategories;

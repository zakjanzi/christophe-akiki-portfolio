import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../../../../utils/toast";
import useDataHandler from "../../../../../hooks/useDataHandler";
import { useParams, Link } from "react-router-dom";
import { getDomainUrl } from "../../../../../utils/functions";
import LoadingIcon from "../../../../../assets/loading.gif";
import { ToastContainer } from "react-toastify";
import "./styles/view-categories.css";

const ViewCategories = () => {
  const [categories, setCategories] = useState(null);
  const [loadingSpinnerIndex, setLoadingSpinnerIndex] = useState(-1);
  const [categoryRenameId, setCategoryRenameId] = useState("");
  const [formValues, setFormValues] = useState({
    newCategoryName: "",
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
      } else {
        toastError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toastError(error.response?.data?.message);
    }
  };

  const showRenameCategoryForm = (categoryId) => {
    setCategoryRenameId(categoryId);
  };

  const showLoadingSpinner = (index) => {
    setLoadingSpinnerIndex(index);
  };

  const renameCategoryValue = (e) => {
    setFormValues((prev) => ({
      newCategoryName: e.target.value,
    }));
  };

  const updateCategory = async () => {
    try {
      setApiCallActive(true);

      const res = await doUpdateCategory({
        categoryId: categoryRenameId,
        newCategoryName: formValues.newCategoryName,
      });

      setApiCallActive(false);
      console.log(res.data);

      if (res.data.success) {
        toastSuccess(res.data.message);
        const updatedCategory = res.data.updatedCategory;

        const updatedList = categories.map((category) => {
          return category._id === updatedCategory._id
            ? updatedCategory
            : category;
        });

        setCategories(updatedList);

        setCategoryRenameId("");
      }
    } catch (error) {
      toastError(error.response?.data?.message);
    }
  };

  const resetCategoryRenameId = () => {
    setCategoryRenameId("");
  };

  return (
    <>
      <div id="work" className="w-100 py-3 px-5">
        <h2 className="text-dark">Categories</h2>
        <section id="content">
          {categories !== null && categories.length === 0 && (
            <div className="alert alert-danger w-100 mt-4 text-center fw-bold fs-2">
              No categories found for this album
            </div>
          )}

          {categories !== null &&
            categories.map((category, index) => {
              return (
                <div className="d-flex flex-column mb-3" key={category._id}>
                  <Link
                    to={`/dashboard/view-images/${category.albumId}/${category._id}`}
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
                      onClick={() => showRenameCategoryForm(category._id)}
                    >
                      Rename
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
        {categoryRenameId && (
          <div
            className="rename-category-modal"
            onClick={() => resetCategoryRenameId()}
          >
            <div
              className="rename-category-container"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                value={formValues.newCategoryName}
                onChange={renameCategoryValue}
                onClick={(e) => e.stopPropagation()}
                className="text-grey fw-normal"
              />
              {!apiCallActive && (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateCategory();
                  }}
                >
                  Update category
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

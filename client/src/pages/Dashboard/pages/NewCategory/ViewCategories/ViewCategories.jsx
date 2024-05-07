import { useEffect, useState } from "react";
import { toastError } from "../../../../../utils/toast";
import useDataHandler from "../../../../../hooks/useDataHandler";
import { useParams, Link } from "react-router-dom";
import { getDomainUrl } from "../../../../../utils/functions";
import LoadingIcon from "../../../../../assets/loading.gif";
import "./styles/view-categories.css";

const ViewCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loadingSpinnerIndex, setLoadingSpinnerIndex] = useState(-1);
  const { doFetchCategoriesForAlbum, doDeleteCategory } = useDataHandler();
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

  const showLoadingSpinner = (index) => {
    setLoadingSpinnerIndex(index);
  };

  return (
    <>
      <div id="work" className="w-100 py-3 px-5">
        <h2 className="text-dark">Categories</h2>
        <section id="content">
          {categories.map((category, index) => {
            return (
              <Link
                to={`/dashboard/view-images/${category.albumId}/${category._id}`}
                key={category._id}
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
                    <span className="position-relative">{category.name}</span>
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
            );
          })}
        </section>
      </div>
    </>
  );
};

export default ViewCategories;

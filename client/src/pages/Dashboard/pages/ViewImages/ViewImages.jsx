import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImagesContainer from "../../../../components/MainPage/ImagesContainer/ImagesContainer";
import useDataHandler from "../../../../hooks/useDataHandler";
import { toastError } from "../../../../utils/toast";
import { NODE_ENV } from "../../../../api/urlConfig";
import "./styles/view-image.css";

const ViewImages = () => {
  const [categories, setCategories] = useState([]);
  const { doFetchCategories } = useDataHandler();

  // All images will be fetched and grouped into their respective categories
  useEffect(() => {
    doFetchCategories()
      .then((res) => {
        if (!res.data.success) {
          toastError(res.data.message);
          return;
        } else {
          const categories = res.data.categories;

          setCategories((_) => categories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getDomainUrl = () => {
    return NODE_ENV === "dev"
      ? "http://localhost:4000"
      : window.location.origin;
  };

  return (
    <section className="w-100 px-4 py-3 d-flex flex-row flex-wrap gap-5">
      {categories.length > 0 &&
        categories.map((category) => {
          return (
            <Link to={`${category.albumId}/${category._id}`} key={category._id}>
              <div
                className="single-category"
                style={{
                  backgroundImage: `url(${getDomainUrl()}/images/${
                    category.thumbnail
                  })`,
                }}
              >
                <div
                  className="category-overlay"
                  onMouseOver={(e) => e.currentTarget.classList.add("show")}
                  onMouseOut={(e) => e.currentTarget.classList.remove("show")}
                ></div>
                <strong className="overlay-text">{category.name}</strong>
              </div>
            </Link>
          );
        })}
    </section>
  );
};

export default ViewImages;

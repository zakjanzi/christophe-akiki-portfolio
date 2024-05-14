import { Link, useNavigate, useLocation } from "react-router-dom";
import "./styles/sidebar.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { doLogout } from "../../../../redux/features/authSlice";
import { PROD_BASE_URL } from "../../../../api/urlConfig";
import { nanoid } from "nanoid";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    /* eslint-disable no-undef */
    for (let x = 1; x < 4; x++) {
      const mainMenuItem = document.querySelector(
        `aside.sidebar > ul > li:nth-child(${x})`
      );

      mainMenuItem.addEventListener("mouseenter", function () {
        // Loop through the contents and get the height;
        var tH = 0;
        var i = 0;

        mainMenuItem
          .querySelectorAll("ul.sb_dropdown > li")
          .forEach(function (item) {
            tH = tH + item.offsetHeight;
          });

        mainMenuItem.classList.add("opened");

        mainMenuItem.querySelectorAll("ul.sb_dropdown").forEach((item) => {
          item.style.height = tH + 20 + "px";
          item.style.paddingTop = "10px";
        });
      });

      mainMenuItem.addEventListener("mouseleave", function () {
        mainMenuItem.classList.remove("opened");
        mainMenuItem.querySelector("ul.sb_dropdown").style.height = "0px";
        mainMenuItem.querySelector("ul.sb_dropdown").style.paddingTop = "0px";
      });
    }
  }, []);

  const loadHomePage = () => {
    window.location = window.location.origin + "?ref=main-page";
  };

  const logout = () => {
    localStorage.clear();
    dispatch(doLogout());
    loadHomePage();
  };

  const logoutAndReloadHomepage = () => {
    logout();
    loadHomePage();
  };

  return (
    <aside className="sidebar">
      <h4 className="d-flex justify-content-center">Main-Menu</h4>
      <ul className="no-list sb_top_lv">
        {/* <li>
          <i className="fa fa-users" />
          <span>Categories</span>
          <ul className="no-list sb_dropdown clearfix">
            <li>
              <Link to="add-category" className="center position-relative">
                <i className="fa fa-plus" />{" "}
                <span className="position-absolute top-0 ms-5">Add New</span>
              </Link>
            </li>
            <li>
              <Link to="view-categories" className="center position-relative">
                <i className="fa fa-eye" />{" "}
                <span className="position-absolute top-0 ms-5">View All</span>
              </Link>
            </li>
          </ul>
        </li> */}
        <li onClick={logoutAndReloadHomepage}>
          <i className="fa fa-home" />
          <span>Home</span>
        </li>

        {/* Albums start */}
        {/* <li>
          <i className="fa fa-book" />
          <span>Albums</span>
          <ul className="no-list sb_dropdown clearfix">
            <li>
              <Link to="create-album" className="center position-relative">
                <i className="fa fa-plus" />{" "}
                <span className="position-absolute top-0 ms-5">Add New</span>
              </Link>
            </li>
            <li>
              <Link
                to="view-albums"
                className="center position-relative"
                onClick={(e) => {
                  // e.preventDefault();
                  if (location.pathname === "/dashboard/view-albums") {
                    window.location.reload();
                  }
                }}
              >
                <i className="fa fa-eye" />{" "}
                <span className="position-absolute top-0 ms-5">View All</span>
              </Link>
            </li>
          </ul>
        </li> */}
        {/* Albums End */}

        {/* Images start */}
        <li>
          <i className="fa fa-dashboard" />
          <span>Images</span>
          <ul className="no-list sb_dropdown clearfix">
            <li>
              <Link to="upload-image" className="center position-relative">
                <i className="fa fa-plus" />{" "}
                <span className="position-absolute top-0 ms-5">Add New</span>
              </Link>
            </li>
            <li>
              {/* Link rename (view-albums => view-categories) */}
              <Link to="view-categories" className="center position-relative">
                <i className="fa fa-eye" />{" "}
                <span className="position-absolute top-0 ms-5">View All</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* Images End */}

        <li>
          <i className="fa fa-cubes" />
          <span>Videos</span>
          <ul className="no-list sb_dropdown clearfix">
            <li>
              <Link to="upload-video" className="center position-relative">
                <i className="fa fa-plus" />{" "}
                <span className="position-absolute top-0 ms-5">Add New</span>
              </Link>
            </li>
            <li>
              <Link
                to="view-videos"
                className="center position-relative"
                onClick={(e) => {
                  // e.preventDefault();
                  if (location.pathname === "/dashboard/view-videos") {
                    window.location.reload();
                  }
                }}
              >
                <i className="fa fa-eye" />{" "}
                <span className="position-absolute top-0 ms-5">View All</span>
              </Link>
            </li>
          </ul>
        </li>

        <li onClick={logout}>
          <i className="fa fa-tasks" />
          <span>Logout</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

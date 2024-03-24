import { Link } from "react-router-dom";
import CustomScripts from "../CustomScripts/CustomScripts";
import "./styles/sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h4 className="d-flex justify-content-center">Main-Menu</h4>
      <ul className="no-list sb_top_lv">
        <li>
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
        </li>
        <li>
          <i className="fa fa-dashboard" />
          <span>Images</span>
          <ul className="no-list sb_dropdown clearfix">
            <li>
              <a className="center position-relative">
                <i className="fa fa-plus" />{" "}
                <span className="position-absolute top-0 ms-5">Add New</span>
              </a>
            </li>
            <li>
              <a className="center position-relative">
                <i className="fa fa-eye" />{" "}
                <span className="position-absolute top-0 ms-5">View All</span>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <i className="fa fa-cubes" />
          <span>Videos</span>
          <ul className="no-list sb_dropdown clearfix">
            <li>
              <a className="center position-relative">
                <i className="fa fa-plus" />{" "}
                <span className="position-absolute top-0 ms-5">Add New</span>
              </a>
            </li>
            <li>
              <a className="center position-relative">
                <i className="fa fa-eye" />{" "}
                <span className="position-absolute top-0 ms-5">View All</span>
              </a>
            </li>
          </ul>
        </li>

        <li>
          <i className="fa fa-tasks" />
          <span>Logout</span>
        </li>
      </ul>

      <CustomScripts>
        <script
          src="/assets/js/sidebar.js"
          crossorigin="anonymous"
          async
        ></script>
      </CustomScripts>
    </aside>
  );
};

export default Sidebar;

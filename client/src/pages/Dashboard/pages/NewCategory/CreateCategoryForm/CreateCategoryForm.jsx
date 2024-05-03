import React, { useLayoutEffect, useState } from "react";
import "./CreateCategoryForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastError, toastSuccess } from "../../../../../utils/toast";
import useDataHandler from "../../../../../hooks/useDataHandler";

export default function CreateCategoryForm(props) {
  const [formValues, setFormValues] = useState({
    name: "",
    album: "",
  });
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const { doCreateCategory, doFetchAlbums, doUpdateCategory } =
    useDataHandler();
  const { editMode, category } = props;

  useLayoutEffect(() => {
    // Fetch all albums
    (async () => {
      try {
        const res = await doFetchAlbums();

        setAlbums(res.data.albums);
      } catch (error) {
        toastError(error.response?.data?.message);
      }
    })();
  }, []);

  useLayoutEffect(() => {
    if (editMode) {
      setFormValues((prev) => ({
        ...prev,
        name: category.name,
        album: category.album,
      }));
    }
  }, [editMode]);

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formValid = () => {
    return formValues.name !== "" && formValues.album !== "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formValid()) {
      toastError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = editMode
        ? await doUpdateCategory({ id: category._id, ...formValues })
        : await doCreateCategory(formValues);

      if (res.data.success) {
        toastSuccess(res.data.message);

        if (editMode) props.closeEditForm(false);
      } else {
        toastError(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      toastError("Something went wrong");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`form-b`}>
        <div className="up-form">
          {editMode && (
            <div className="w-100 d-flex justify-content-end text-info fs-1">
              <span onClick={props.closeEditForm} className="cursor-pointer">
                x
              </span>
            </div>
          )}
          <h1>{editMode ? "Edit" : "Add new"} category</h1>
          <p className="subtitle">Please fill in all required fields</p>
          <form onSubmit={handleSubmit}>
            <div className="wraber">
              <label className="required">Name</label>
              <input
                type="text"
                value={formValues.name}
                onChange={handleChange}
                name="name"
                placeholder=""
                autoComplete="off"
              />
            </div>

            <div className="wraber">
              <label className="required">Album</label>
              <select
                name="album"
                defaultValue={formValues.album}
                onChange={(ev) => handleChange(ev)}
                className="select"
              >
                <option value="">Select an Album</option>
                {albums.map((album) => (
                  <option key={album.name} value={album.name}>
                    {album.name}
                  </option>
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
            <button type="submit">{editMode ? "Update" : "Submit"}</button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

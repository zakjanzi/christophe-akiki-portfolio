import React, { useLayoutEffect, useState } from "react";
import "./UploadForm.css";
import { BsFillCameraFill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useImages } from "../../../../../contextProviders/ImagesProvider";
import { toastError, toastSuccess } from "../../../../../utils/toast";
import useDataHandler from "../../../../../hooks/useDataHandler";

export default function UploadForm(props) {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    link: "",
  });
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const { doUploadVideo, doUpdateVideo } = useDataHandler();
  const { editMode, video } = props;

  useLayoutEffect(() => {
    if (editMode) {
      setFormValues((prev) => ({
        ...prev,
        title: video.title,
        description: video.description,
        link: video.link,
      }));
    }
  }, [editMode, video]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, description, link } = formValues;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);

    if (image && image.name) {
      formData.append("image", image);
    }

    if (editMode) {
      formData.append("videoId", video._id);
      formData.append("hasImage", image && image.name ? "true" : "false");
    }

    if (!image && !editMode) {
      toastError("Please select an image");
      return;
    }
    if (!title) {
      toastError("Please enter the video title");
      return;
    }
    if (!description) {
      toastError("Please enter the video description");
      return;
    }
    if (!link) {
      toastError("Please enter the video link");
      return;
    }

    setLoading(true);

    try {
      const res = editMode
        ? await doUpdateVideo(formData)
        : await doUploadVideo(formData);

      if (res.data.success) {
        toastSuccess(res.data.message);

        setImage(null);
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="upload-form">
      <div className="form-b">
        <div className="up-form">
          <h1>{editMode ? "Edit" : "Upload new"} Video</h1>
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
              <label className="required">Title</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={formValues.title}
              />
            </div>

            <div className="wraber">
              <label className="required">Description</label>
              <textarea
                name="description"
                onChange={handleChange}
                value={formValues.description}
              ></textarea>
            </div>

            <div className="wraber">
              <label className="required">Link</label>
              <input
                type="text"
                name="link"
                onChange={handleChange}
                value={formValues.link}
              />
            </div>

            {loading && (
              <div className="load">
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
              </div>
            )}
            <button type="submit">Save</button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

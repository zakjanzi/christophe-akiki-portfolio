import { useEffect, useState } from "react";
import { toastError } from "../../../../../utils/toast";
import useDataHandler from "../../../../../hooks/useDataHandler";
import { getDomainUrl } from "../../../../../utils/functions";
import { Link } from "react-router-dom";
import { BsFillCameraFill } from "react-icons/bs";
import { toastSuccess } from "../../../../../utils/toast";
import "./styles/view-albums.css";
import { ToastContainer } from "react-toastify";
import Loading from "../../../components/Loading/Loading";

const ViewAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [albumEditId, setAlbumEditId] = useState("");
  const [formValues, setFormValues] = useState({
    newAlbumName: "",
    albumThumbnail: "",
  });

  const [apiCallActive, setApiCallActive] = useState(false);
  const { doFetchAlbums, doUpdateAlbum, doDeleteAlbum } = useDataHandler();

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
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
  };

  const resetAlbumEditId = () => {
    setAlbumEditId("");
  };

  const albumImageSelected = () => {
    return "" !== formValues.albumThumbnail;
  };

  const resetAlbumThumbnail = () =>
    setFormValues((prev) => ({ ...prev, albumThumbnail: "" }));

  const setAlbumThumbnail = (images) => {
    setFormValues((prev) => ({ ...prev, albumThumbnail: images[0] }));
  };

  const renameAlbumValue = (e) => {
    setFormValues((prev) => ({
      ...prev,
      newAlbumName: e.target.value,
    }));
  };

  const updateAlbum = async () => {
    try {
      setApiCallActive(true);

      const formData = new FormData();

      formData.append("albumId", albumEditId);

      formData.append("newAlbumName", formValues.newAlbumName);

      if ("" !== formValues.albumThumbnail) {
        formData.append("albumThumbnail", formValues.albumThumbnail);
      }

      const res = await doUpdateAlbum(formData);

      setApiCallActive(false);
      // console.log(res.data);

      if (res.data.success) {
        toastSuccess(res.data.message);
        const updatedAlbum = res.data.updatedAlbum;

        const updatedList = albums.map((album) => {
          return album._id === updatedAlbum._id ? updatedAlbum : album;
        });

        setAlbums(updatedList);

        setAlbumEditId("");

        resetEditForm();
      }
    } catch (error) {
      toastError(error.response?.data?.message);
    }
  };

  const resetEditForm = () => {
    setFormValues({
      newAlbumName: "",
      albumThumbnail: "",
    });
  };

  const showEditAlbumForm = (albumId) => {
    setAlbumEditId(albumId);
  };

  const initAlbumNameInput = (name) => {
    setFormValues((prev) => ({ ...prev, newAlbumName: name }));
  };

  const deleteAlbum = async (albumId) => {
    try {
      const res = await doDeleteAlbum(albumId);

      if (res.data.success) {
        setAlbums(res.data.albums);
        toastSuccess(res.data.albums);
      } else {
        toastError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toastError(error.response?.data?.message);
    }
  };

  /**
   * Albums is renamed to categories, in plain text and any visible area on the browser
   */
  return (
    <div id="work" className="view-albums w-100 py-3 px-5">
      <h2 className="text-dark">Categories</h2>
      <section id="content w-100">
        {/* If Loading, display the info below */}
        {albums && albums.length === 0 && <Loading />}

        {/* SHOWCASE */}
        <div className="showcase d-flex flex-row flex-wrap gap-5 w-100">
          {albums &&
            albums.length > 0 &&
            albums.map((album) => {
              return (
                <div className="d-flex flex-column mb-3" key={album._id}>
                  <Link
                    to={`/dashboard/view-albums/${album._id}`}
                    key={album._id}
                    className="item album-item"
                  >
                    {/* LIGHTBOX LINK */}
                    <div>
                      {/* INFO */}
                      <div className="info">
                        {/* CONTAINER MID */}
                        <div className="container-mid w-100 px-2">
                          {/* <h5>Petron</h5> */}
                          <p className="text-center px-0">- {album.title}</p>
                        </div>
                        {/* /CONTAINER MID */}
                      </div>
                      {/* /INFO */}
                      <div
                        className="background-image"
                        style={{
                          backgroundImage: `url('${getDomainUrl()}/images/${
                            album.thumbnail
                          }')`,
                        }}
                      />
                    </div>

                    {/* /LIGHTBOX LINK */}
                  </Link>
                  <div className="d-flex flex-column justify-content-between gap-2 mt-2">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => {
                        showEditAlbumForm(album._id);
                        initAlbumNameInput(album.title);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteAlbum(album._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        <ToastContainer />
      </section>

      {/* Modal for Editing Album */}
      {albumEditId && (
        <>
          <div
            className="edit-album-modal"
            onClick={() => {
              resetAlbumEditId();
              resetEditForm();
            }}
          >
            <div
              className="edit-album-container flex-column"
              onClick={(e) => e.stopPropagation()}
            >
              <strong className="text-grey">
                Change Category Thumbnail Image
              </strong>
              <label
                htmlFor="album-thumbnail"
                className="file-label mt-2"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {!albumImageSelected() && (
                  <BsFillCameraFill className="camera-icon " />
                )}
                {albumImageSelected() && (
                  <>
                    <section className="x-close-button-container">
                      <span
                        className="x-close-button"
                        onClick={() => resetAlbumThumbnail()}
                      >
                        x
                      </span>
                    </section>
                    <span>{formValues.albumThumbnail?.name}</span>
                  </>
                )}

                <input
                  type="file"
                  onChange={(event) =>
                    setAlbumThumbnail(
                      event.target.files.length > 0 ? event.target.files : [""]
                    )
                  }
                  name="albumThumbnail"
                  accept="image/png, image/jpg, image/gif, image/jpeg"
                  className="file-input"
                  id="album-thumbnail"
                />
              </label>
              <label htmlFor="new-album-name" className="text-grey">
                Category Name
                {/* Text above, formerly (Album Name), changed to (Category name) */}
                <input
                  type="text"
                  id="new-album-name"
                  value={formValues.newAlbumName}
                  onChange={renameAlbumValue}
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
                    updateAlbum();
                  }}
                >
                  Update Category
                  {/* Text above, formerly (Update Album), changed to (Update Category) */}
                </button>
              )}
              {apiCallActive ? <Loading /> : ""}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewAlbums;

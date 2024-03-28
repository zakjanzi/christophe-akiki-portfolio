import { useLayoutEffect, useState } from "react";
import { toastError } from "../../../../../utils/toast";
import useDataSaver from "../../../../../hooks/useDataSaver";
import EditVideoForm from "../UploadForm/UploadForm";

const ViewVideos = () => {
  const [editVideoMode, setEditVideoMode] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState({});
  const [videos, setVideos] = useState([]);

  const { doFetchAllVideos, doDeleteVideo } = useDataSaver();

  useLayoutEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await doFetchAllVideos();

      if (res.data.success) {
        setVideos(res.data.videos);
      } else {
        toastError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toastError(error.response?.data?.message);
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      const res = await doDeleteVideo(videoId);

      if (res.data.success) {
        setVideos(res.data.videos);
      } else {
        toastError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toastError(error.response?.data?.message);
    }
  };

  const editVideo = (video) => {
    setEditVideoMode(true);
    setVideoToEdit(video);
  };

  const closeEditForm = async () => {
    setEditVideoMode(false);
    await fetchVideos();
  };

  return (
    <>
      {!editVideoMode && <h4 className="ms-5 mt-3 text-dark">View Videos</h4>}

      {/* This form is being used in edit mode here */}
      {editVideoMode && (
        <EditVideoForm
          editMode={true}
          video={videoToEdit}
          closeEditForm={() => closeEditForm()}
        />
      )}

      {!editVideoMode && videos.length > 0 && (
        <table className="table table-striped mx-5 mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{video.title}</td>
                <td>{video.description}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => editVideo(video)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => deleteVideo(video._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ViewVideos;

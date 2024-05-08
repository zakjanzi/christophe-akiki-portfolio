import { useLayoutEffect, useState } from "react";
import { toastError } from "../../../../../utils/toast";
import useDataHandler from "../../../../../hooks/useDataHandler";
import EditVideoForm from "../UploadForm/UploadForm";

const ViewVideos = () => {
  const [editVideoMode, setEditVideoMode] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState({});
  const [videos, setVideos] = useState(null);

  const { doFetchAllVideos, doDeleteVideo } = useDataHandler();

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
    <div className="w-100 px-5">
      {!editVideoMode && <h4 className=" mt-3 text-dark">View Videos</h4>}

      {/* This form is being used in edit mode here */}
      {editVideoMode && (
        <EditVideoForm
          editMode={true}
          video={videoToEdit}
          closeEditForm={() => closeEditForm()}
        />
      )}

      {/* If no video is found, display the message below */}
      {videos !== null && videos.length === 0 && (
        <div className="alert alert-danger w-100 mt-4 text-center fw-bold fs-2">
          No videos found.
        </div>
      )}

      {!editVideoMode && videos !== null && videos.length > 0 && (
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
              <tr key={video._id}>
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
    </div>
  );
};

export default ViewVideos;

import { useEffect, useState } from "react";
import { toastError } from "../../../../../utils/toast";
import useDataSaver from "../../../../../hooks/useDataSaver";
import EditAlbumForm from "../AlbumForm/AlbumForm";

const ViewAlbums = () => {
  const [editAlbumMode, setEditAlbumMode] = useState(false);
  const [AlbumToEdit, setAlbumToEdit] = useState({});
  const [albums, setAlbums] = useState([]);

  const { doFetchAlbums, doDeleteAlbum } = useDataSaver();

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

  const deleteAlbum = async (AlbumId) => {
    try {
      const res = await doDeleteAlbum(AlbumId);

      if (res.data.success) {
        // remove the deleted album
        const availableAlbums = albums.filter((album) => album._id !== AlbumId);

        setAlbums(availableAlbums);
      } else {
        toastError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toastError(error.response?.data?.message);
    }
  };

  const editAlbum = (Album) => {
    setEditAlbumMode(true);
    setAlbumToEdit(Album);
  };

  const closeEditForm = async () => {
    setEditAlbumMode(false);
    await fetchAlbums();
  };

  return (
    <>
      {!editAlbumMode && <h4 className="ms-5 mt-3 text-dark">View Albums</h4>}

      {/* This form is being used in edit mode here */}
      {editAlbumMode && (
        <EditAlbumForm
          editMode={true}
          album={AlbumToEdit}
          closeEditForm={() => closeEditForm()}
        />
      )}

      {!editAlbumMode && albums.length > 0 && (
        <table className="table table-striped mx-5 mt-3 w-75">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col" className="text-end me-5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{album.title}</td>
                <td className="text-end">
                  <button
                    className="btn btn-info"
                    onClick={() => editAlbum(album)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => deleteAlbum(album._id)}
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

export default ViewAlbums;

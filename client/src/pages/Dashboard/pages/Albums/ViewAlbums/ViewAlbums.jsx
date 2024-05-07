import { useEffect, useState } from "react";
import { toastError } from "../../../../../utils/toast";
import useDataHandler from "../../../../../hooks/useDataHandler";
import { getDomainUrl } from "../../../../../utils/functions";
import { Link } from "react-router-dom";
import "./styles/view-albums.css";

const ViewAlbums = () => {
  const [albums, setAlbums] = useState([]);

  const { doFetchAlbums } = useDataHandler();

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

  return (
    <div id="work" className="w-100 py-3 px-5">
      <h2 className="text-dark">Albums</h2>
      <section id="content w-100">
        {/* SHOWCASE */}
        <div className="showcase d-flex flex-row flex-wrap gap-5 w-100">
          {albums.length > 0 &&
            albums.map((album) => {
              return (
                <Link
                  to={`/dashboard/view-categories/${album._id}`}
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
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default ViewAlbums;

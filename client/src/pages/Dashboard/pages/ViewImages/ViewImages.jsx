import React, { useState, useEffect } from "react";
import ImagesContainer from "../../../../components/MainPage/ImagesContainer/ImagesContainer";
import useDataSaver from "../../../../hooks/useDataSaver";
import { toastError } from "../../../../utils/toast";

const ViewImages = () => {
  const [loadingImages, setLoadingImages] = useState(true);
  const [allImages, setAllImages] = useState([]);
  const { doFetchAllImages } = useDataSaver();

  useEffect(() => {
    doFetchAllImages()
      .then((res) => {
        setLoadingImages(false);
        if (!res.data.success) {
          toastError(res.data.message);
          return;
        } else {
          setAllImages(res.data.images);
        }
      })
      .catch((err) => {
        console.log("Load images error: ", err);
        setLoadingImages(false);
      });
  }, []);

  return (
    <ImagesContainer allImages={allImages} loadingImages={loadingImages} />
  );
};

export default ViewImages;

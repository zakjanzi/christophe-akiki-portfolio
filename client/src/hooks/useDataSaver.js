import useAxiosPrivate from "./useAxiosPrivate";
import {
  CREATE_CATEGORY_URL,
  FETCH_ALBUMS_URL,
  FETCH_CATEGORIES_URL,
  DELETE_CATEGORY_URL,
  UPDATE_CATEGORY_URL,
  UPLOAD_IMAGE_URL,
  FETCH_ALL_IMAGES_URL,
  DELETE_IMAGE_URL,
  UPLOAD_VIDEO_URL,
  DELETE_VIDEO_URL,
  FETCH_ALL_VIDEOS_URL,
  UPDATE_VIDEO_URL,
} from "../api/urlConfig";

export default function useDataSaver() {
  const axiosPrivate = useAxiosPrivate();

  const doCreateCategory = (payload) => {
    return axiosPrivate.post(CREATE_CATEGORY_URL, payload);
  };

  const doFetchAlbums = () => {
    return axiosPrivate.get(FETCH_ALBUMS_URL);
  };

  const doFetchCategories = () => {
    return axiosPrivate.get(FETCH_CATEGORIES_URL);
  };

  const doDeleteCategory = (categoryId) => {
    return axiosPrivate.delete(DELETE_CATEGORY_URL, {
      data: { categoryId },
    });
  };

  const doUpdateCategory = (payload) => {
    return axiosPrivate.patch(UPDATE_CATEGORY_URL, payload);
  };

  const doUploadImage = (payload) => {
    return axiosPrivate.post(UPLOAD_IMAGE_URL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const doFetchAllImages = () => {
    return axiosPrivate.get(FETCH_ALL_IMAGES_URL);
  };

  const doDeleteImage = (photoId) => {
    return axiosPrivate.post(DELETE_IMAGE_URL, { id: photoId });
  };

  const doUploadVideo = (payload) => {
    return axiosPrivate.post(UPLOAD_VIDEO_URL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const doDeleteVideo = (videoId) => {
    return axiosPrivate.post(DELETE_VIDEO_URL, { id: videoId });
  };

  const doFetchAllVideos = () => {
    return axiosPrivate.get(FETCH_ALL_VIDEOS_URL);
  };

  const doUpdateVideo = (videoPayload) => {
    console.log("video payload: ", videoPayload);
    return axiosPrivate.post(UPDATE_VIDEO_URL, videoPayload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: videoPayload,
    });
  };

  return {
    doCreateCategory,
    doFetchAlbums,
    doFetchCategories,
    doDeleteCategory,
    doUpdateCategory,
    doUploadImage,
    doFetchAllImages,
    doDeleteImage,
    doUploadVideo,
    doDeleteVideo,
    doFetchAllVideos,
    doUpdateVideo,
  };
}

import useAxiosPrivate from "./useAxiosPrivate";
import {
  CREATE_CATEGORY_URL,
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
  CREATE_ALBUM_URL,
  FETCH_ALBUMS_URL,
  DELETE_ALBUM_URL,
  UPDATE_ALBUM_URL,
  FETCH_IMAGES_FOR_ALBUM_CATEGORY_URL,
  FETCH_ALL_CATEGORIES_URL,
  DELETE_IMAGE_FOR_ALBUM_CATEGORY,
  SEND_EMAIL,
} from "../api/urlConfig";

export default function useDataHandler() {
  const axiosPrivate = useAxiosPrivate();

  const doCreateCategory = (payload) => {
    return axiosPrivate.post(CREATE_CATEGORY_URL, payload);
  };

  const doFetchAlbums = () => {
    return axiosPrivate.get(FETCH_ALBUMS_URL);
  };

  const doFetchCategoriesForAlbum = async (albumId) => {
    return axiosPrivate.post(FETCH_CATEGORIES_URL, { albumId });
  };

  const doDeleteCategory = (categoryId) => {
    return axiosPrivate.delete(DELETE_CATEGORY_URL, {
      data: { categoryId },
    });
  };

  const doUpdateCategory = (payload) => {
    console.log("payload: ", payload);
    return axiosPrivate.post(UPDATE_CATEGORY_URL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

  const doDeleteImage = (imageId) => {
    return axiosPrivate.post(DELETE_IMAGE_URL, { id: imageId });
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
    return axiosPrivate.post(UPDATE_VIDEO_URL, videoPayload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: videoPayload,
    });
  };

  const doCreateAlbum = (payload) => {
    return axiosPrivate.post(CREATE_ALBUM_URL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const doUpdateAlbum = (payload) => {
    return axiosPrivate.post(UPDATE_ALBUM_URL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const doDeleteAlbum = (albumId) => {
    return axiosPrivate.delete(DELETE_ALBUM_URL, {
      data: { albumId },
    });
  };

  const doFetchAlbumCategoryImages = (albumId, categoryId) => {
    return axiosPrivate.post(FETCH_IMAGES_FOR_ALBUM_CATEGORY_URL, {
      albumId,
      categoryId,
    });
  };

  const doFetchCategories = () => {
    return axiosPrivate.get(FETCH_ALL_CATEGORIES_URL);
  };

  const doDeleteImageForAlbumCategory = (imageId) => {
    return axiosPrivate.post(DELETE_IMAGE_FOR_ALBUM_CATEGORY, {
      imageId,
    });
  };

  const doSendMail = (mailInfo) => {
    return axiosPrivate.post(SEND_EMAIL, mailInfo);
  };

  return {
    doCreateCategory,
    doFetchAlbums,
    doFetchCategoriesForAlbum,
    doDeleteCategory,
    doUpdateCategory,
    doUploadImage,
    doFetchAllImages,
    doDeleteImage,
    doUploadVideo,
    doDeleteVideo,
    doFetchAllVideos,
    doUpdateVideo,
    doCreateAlbum,
    doDeleteAlbum,
    doUpdateAlbum,
    doFetchAlbumCategoryImages,
    doFetchCategories,
    doDeleteImageForAlbumCategory,
    doSendMail,
  };
}

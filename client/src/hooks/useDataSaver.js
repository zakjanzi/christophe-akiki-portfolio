import useAxiosPrivate from "./useAxiosPrivate";
import {
  CREATE_CATEGORY_URL,
  FETCH_ALBUMS_URL,
  FETCH_CATEGORIES_URL,
  DELETE_CATEGORY_URL,
  UPDATE_CATEGORY_URL,
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

  return {
    doCreateCategory,
    doFetchAlbums,
    doFetchCategories,
    doDeleteCategory,
    doUpdateCategory,
  };
}

import { useLayoutEffect, useState } from "react";
import { toastError } from "../../../../../utils/toast";
import useDataSaver from "../../../../../hooks/useDataSaver";
import CreateCategoryForm from "../CreateCategoryForm/CreateCategoryForm";

const ViewCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editCategoryMode, setEditCategoryMode] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState({});

  const { doFetchCategories, doDeleteCategory } = useDataSaver();

  useLayoutEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await doFetchCategories();

      if (res.data.success) {
        setCategories(res.data.categories);
      } else {
        toastError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toastError(error.response?.data?.message);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const res = await doDeleteCategory(categoryId);

      if (res.data.success) {
        setCategories(res.data.categories);
      } else {
        toastError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toastError(error.response?.data?.message);
    }
  };

  const editCategory = (category) => {
    setEditCategoryMode(true);
    setCategoryToEdit(category);
  };

  const closeEditForm = async () => {
    setEditCategoryMode(false);
    await fetchCategories();
  };

  return (
    <>
      {!editCategoryMode && (
        <h4 className="ms-5 mt-3 text-dark">View Categories</h4>
      )}

      {/* This form is being used in edit mode here */}
      {editCategoryMode && (
        <CreateCategoryForm
          editMode={true}
          category={categoryToEdit}
          closeEditForm={() => closeEditForm()}
        />
      )}

      {!editCategoryMode && categories.length > 0 && (
        <table className="table table-striped mx-5 mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Album</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{category.name}</td>
                <td>{category.album}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => editCategory(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => deleteCategory(category._id)}
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

export default ViewCategories;

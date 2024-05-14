const { deletePhysicalImage } = require("../Middlewares/MulterMiddleware.js");
const CategoryModel = require("../Models/CategoryModel.js");
const ImageModel = require("../Models/ImageModel.js");
const mongoose = require("mongoose");
const { imageSaver } = require("../utils/functions.js");

/**
 * Category is being referred to as Album
 */
const NAME_REPLACEMENTS = {
  CATEGORY_TO_ALBUM: "Album",
  CATEGORIES_TO_ALBUMS: "Albums",
};

const create = async (req, res) => {
  try {
    const { name, album } = req.body;

    const exists = await CategoryModel.findOne({ name, album }).exec();
    if (exists) {
      return res.json({ success: false, message: "Category already exists" });
    }

    const newCategory = new CategoryModel({
      name,
      album,
    });

    await newCategory.save();

    return res.json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log("Category creation failed", error);
    return res.json({
      success: false,
      message: "An error occurred while creating a category",
    });
  }
};

const all = async (req, res) => {
  try {
    const categories = await CategoryModel.find({}).exec();

    return res.json({ success: true, categories });
  } catch (err) {
    return res.json({
      success: false,
      message: "An error occurred while fetching categories",
    });
    console.log(err.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(
      req.body.categoryId
    ).exec();

    if (deletedCategory !== null) {
      // Delete category thumbnail
      deletePhysicalImage(deletedCategory.thumbnail);

      // Delete all images under this category
      const images = await ImageModel.find({
        albumId: deletedCategory.albumId,
        categoryId: deletedCategory._id,
      }).exec();

      images.forEach((image) => {
        deletePhysicalImage(image.originalName);
      });

      // Delete the image documents from the database
      await ImageModel.deleteMany({
        albumId: deletedCategory.albumId,
        categoryId: deletedCategory._id,
      }).exec();

      // Fetch the remaining categories
      const categories = await CategoryModel.find({
        albumId: deletedCategory.albumId,
      }).exec();

      return res.json({
        success: true,
        message: `${NAME_REPLACEMENTS.CATEGORY_TO_ALBUM} successfully deleted`,
        categories,
      });
    } else {
      return res.json({ success: false, message: "Operation Failed" });
    }
  } catch (err) {
    return res.json({
      success: false,
      message: `An error occurred while deleting ${NAME_REPLACEMENTS.CATEGORIES_TO_ALBUMS}`,
    });
  }
};

const updateCategory = async (req, res) => {
  let categoryThumbnail;

  if (req.files) {
    categoryThumbnail = req.files.categoryThumbnail;
  }

  const { categoryId, newCategoryName } = req.body;

  if (
    (!newCategoryName && !categoryThumbnail) ||
    (!newCategoryName && categoryThumbnail)
  ) {
    return res.json({
      success: false,
      message: "Operation failed",
    });
  }

  let updateObject = {
    name: newCategoryName,
  };

  if (categoryThumbnail) {
    const thumbnail = imageSaver(categoryThumbnail);

    // Remove old category thumbnail
    const oldCategoryDoc = await CategoryModel.findById(categoryId).exec();

    deletePhysicalImage(oldCategoryDoc.thumbnail);

    updateObject = {
      ...updateObject,
      thumbnail: thumbnail.newFileName,
    };
  }

  try {
    const catUpdateResult = await CategoryModel.findByIdAndUpdate(
      categoryId,
      updateObject,
      { new: true }
    ).exec();

    if (catUpdateResult) {
      return res.json({
        success: true,
        message: `${NAME_REPLACEMENTS.CATEGORY_TO_ALBUM} updated successfully`,
        updatedCategory: catUpdateResult,
      });
    } else {
      return res.json({
        success: false,
        message: "Operation failed",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
      message: `An error occurred while updating ${NAME_REPLACEMENTS.CATEGORY_TO_ALBUM}`,
    });
  }
};

const getForAlbum = async (req, res) => {
  try {
    const categories = await CategoryModel.find({
      albumId: req.body.albumId,
    }).exec();

    return res.json({ success: true, categories });
  } catch (err) {
    console.log(err.message);

    return res.json({
      success: false,
      message: "An error occurred while fetching categories",
    });
  }
};

module.exports = {
  create,
  all,
  deleteCategory,
  updateCategory,
  getForAlbum,
};

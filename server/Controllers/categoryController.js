const CategoryModel = require("../Models/CategoryModel.js");

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
    const deleted = await CategoryModel.findByIdAndDelete(
      req.body.categoryId
    ).exec();

    let categories;

    if (deleted !== null) {
      categories = await CategoryModel.find().exec();

      return res.json({ success: true, categories });
    } else {
      return res.json({ success: false, message: "Operation Failed" });
    }
  } catch (err) {
    return res.json({
      success: false,
      message: "An error occurred while fetching categories",
    });
    console.log(err.message);
  }
};

const updateCategory = async (req, res) => {
  const { id, name, album } = req.body;

  try {
    const result = await CategoryModel.findByIdAndUpdate(id, {
      name,
      album,
    }).exec();

    return res.json({
      success: true,
      message: result ? "Category updated successfully" : "Operation failed",
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
      message: "An error occurred while updating categories",
    });
  }
};

module.exports = {
  create,
  all,
  deleteCategory,
  updateCategory,
};

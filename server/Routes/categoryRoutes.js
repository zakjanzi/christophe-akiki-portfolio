const express = require("express");
const router = express.Router();
const {
  create,
  all,
  updateCategory,
  deleteCategory,
  getForAlbum,
} = require("../Controllers/categoryController.js");

const protected = require("../Middlewares/Auth.js");

router.post("/create", protected, create);

router.post("/forAlbum", protected, getForAlbum);

router.get("/all", all);

router.patch("/update", protected, updateCategory);

router.delete("/delete", protected, deleteCategory);

module.exports = router;

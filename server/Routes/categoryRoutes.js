const express = require("express");
const router = express.Router();
const {
  create,
  all,
  updateCategory,
  deleteCategory,
  getForAlbum,
  seedLinks,
  getAlbumImages,
} = require("../Controllers/categoryController.js");

const protected = require("../Middlewares/Auth.js");

router.post("/create", protected, create);

router.post("/forAlbum", getForAlbum);

router.get("/all", all);

router.post("/update", protected, updateCategory);

router.delete("/delete", protected, deleteCategory);

// This route is used to seed url links for each category (An Album)
router.post("/getAllImages", getAlbumImages);

module.exports = router;

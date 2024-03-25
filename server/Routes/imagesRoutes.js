const express = require("express");
const router = express.Router();
const protected = require("../Middlewares/Auth.js");
const { uploadMiddleware } = require("../Middlewares/MulterMiddleware.js");

const {
  uploadImage,
  getImages,
  deleteImages,
} = require("../Controllers/imagesController");

router.post("/upload", protected, uploadMiddleware, uploadImage);

router.get("/all", getImages);

router.delete("/delete/:id", protected, deleteImages);

// router.get("/categories", getCategories);

// router.put("/like/:id", protected, likePost);

// router.put("/save/:id", protected, savePost);

module.exports = router;

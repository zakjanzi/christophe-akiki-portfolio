const express = require("express");
const router = express.Router();
const protected = require("../Middlewares/Auth.js");
const { uploadMiddleware } = require("../Middlewares/MulterMiddleware.js");

const {
  uploadImage,
  getImages,
  deleteImage,
  selectImagesForAlbumCategory,
  deleteForAlbumCategory,
} = require("../Controllers/imagesController");

router.post("/upload", protected, uploadMiddleware, uploadImage);

router.get("/all", getImages);

router.post("/select", selectImagesForAlbumCategory);

router.post("/delete", protected, deleteImage);

router.post("/album-category/delete", protected, deleteForAlbumCategory);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  all,
  createAlbum,
  deleteAlbum,
  updateAlbum,
  getAlbumImages,
} = require("../Controllers/albumsController.js");
const protected = require("../Middlewares/Auth.js");
const { uploadMiddleware } = require("../Middlewares/MulterMiddleware.js");

router.get("/all", all);

router.post("/albumImages", getAlbumImages);

router.post("/create", protected, uploadMiddleware, createAlbum);

router.post("/update", protected, updateAlbum);

router.delete("/delete", protected, deleteAlbum);

module.exports = router;

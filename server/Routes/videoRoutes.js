const express = require("express");
const router = express.Router();
const protected = require("../Middlewares/Auth.js");
const { uploadMiddleware } = require("../Middlewares/MulterMiddleware.js");
const {
  deleteImageIfNewMiddleware,
} = require("../Middlewares/ImageMiddleware.js");
const {
  uploadVideo,
  getVideos,
  deleteVideo,
  updateVideo,
} = require("../Controllers/videosController.js");

router.post("/upload", protected, uploadMiddleware, uploadVideo);

router.get("/all", getVideos);

router.post("/delete", protected, deleteVideo);

router.post(
  "/update",
  protected,
  deleteImageIfNewMiddleware,
  uploadMiddleware,
  updateVideo
);

module.exports = router;

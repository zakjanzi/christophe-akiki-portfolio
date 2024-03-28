const { deletePhysicalImage } = require("./MulterMiddleware");
const VideoModel = require("../Models/VideoModel");

const deleteImageIfNewMiddleware = async (req, res, next) => {
  console.log("Request body:", req.body);

  const existingImageId = req.body.videoId;

  if (req.body.hasImage === "true") {
    const videoDoc = await VideoModel.findById(existingImageId).exec();

    if (videoDoc.image) deletePhysicalImage(videoDoc.image);
  }

  next();
};

module.exports = {
  deleteImageIfNewMiddleware,
};

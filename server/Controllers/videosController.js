const VideoModel = require("../Models/VideoModel.js");
const { deletePhysicalImage } = require("../Middlewares/MulterMiddleware.js");

const uploadVideo = async (req, res) => {
  try {
    if (req.fileValidationError) {
      return res.json({
        message: req.fileValidationError.message,
        success: false,
      });
    }

    const imageOriginalName = req.filenames[0];

    const video = new VideoModel({
      title: req.body.title,
      description: req.body.description,
      image: imageOriginalName,
      link: req.body.link,
    });

    await video.save();

    res.json({
      message: "Video details created successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.json({ message: "Error creating video", success: false });
  }
};

const getVideos = async (req, res) => {
  try {
    const videos = await VideoModel.find({}).sort({ createdAt: -1 });

    res.json({ success: true, videos });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const video = await VideoModel.findByIdAndDelete(req.body.id).exec();

    if (video) {
      deletePhysicalImage(video.originalName);

      const videos = await VideoModel.find({}).exec();

      return res.json({
        message: "Video deleted successfully",
        success: true,
        videos,
      });
    } else {
      return res.json({ message: "Video not found", success: false });
    }
  } catch (err) {
    return res.json({ success: false, message: err });
  }
};

const updateVideo = async (req, res) => {
  try {
    if (req.fileValidationError) {
      return res.json({
        message: req.fileValidationError.message,
        success: false,
      });
    }

    let imageOriginalName;

    let updatePayload = {
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
    };

    if (req.files?.image) {
      imageOriginalName = req.files.filename;

      updatePayload = {
        ...updatePayload,
        image: imageOriginalName,
      };
    }

    const result = await VideoModel.findByIdAndUpdate(
      req.body.videoId,
      updatePayload
    ).exec();

    if (!result) throw new Error("Video details update failed");

    return res.json({
      message: "Video details updated successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.json({ message: "Error updating video", success: false });
  }
};

module.exports = {
  uploadVideo,
  getVideos,
  deleteVideo,
  updateVideo,
};

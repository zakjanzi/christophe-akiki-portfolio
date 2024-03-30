const Image = require("../Models/ImageModel.js");
const { deletePhysicalImage } = require("../Middlewares/MulterMiddleware.js");

const uploadImage = async (req, res) => {
  try {
    const imageOriginalName = req.files.filename;

    const image = new Image({
      contentType: req.files.image.mimetype,
      album: req.body.album,
      // category: req.body.category,
      originalName: imageOriginalName,
    });

    await image.save();

    const savedImage = await Image.findOne({
      originalName: imageOriginalName,
    });

    res.json({
      message: "Image uploaded successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.json({ message: "Error uploading the image", success: false });
  }
};

const getImages = async (req, res) => {
  try {
    const images = await Image.find({}).sort({ createdAt: -1 });

    res.json({ success: true, images });
  } catch (err) {
    res.json({ success: false, message: err });
  }
};

const deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.body.id).exec();

    if (image) {
      deletePhysicalImage(image.originalName);

      res.json({ message: "Image deleted successfully", success: true });
    } else {
      res.json({ message: "Image not found", success: false });
    }
  } catch (err) {
    res.json({ success: false, message: err });
  }
};

module.exports = {
  uploadImage,
  getImages,
  deleteImage,
};

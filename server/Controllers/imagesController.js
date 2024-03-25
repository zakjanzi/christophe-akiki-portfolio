const Image = require("../Models/ImageModel.js");
const { deleteImage } = require("../Middlewares/MulterMiddleware.js");

const uploadImage = async (req, res) => {
  try {
    if (req.fileValidationError) {
      return res.json({
        message: req.fileValidationError.message,
        success: false,
      });
    }

    const imageOriginalName = req.file.filename;

    console.log("Original name: ", imageOriginalName);

    const image = new Image({
      contentType: req.file.mimetype,
      album: req.body.album,
      category: req.body.category,
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
    const imagesObj = images.map((image) => ({
      ...image._doc,
      src: `data:${image.contentType};base64,${Buffer.from(
        image.image
      ).toString("base64")}`,
      image: undefined,
    }));
    res.json(imagesObj);
  } catch (err) {
    res.json({ message: err });
  }
};

const deleteImages = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (image) {
      deleteImage(image.originalName);
      res.json({ message: "Image deleted successfully", success: true });
    } else {
      res.json({ message: "Image not found", success: false });
    }
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = {
  uploadImage,
  getImages,
  deleteImages,
};

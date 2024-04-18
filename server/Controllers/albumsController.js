const AlbumModel = require("../Models/AlbumModel.js");
const ImageModel = require("../Models/ImageModel.js");
const { deletePhysicalImage } = require("../Middlewares/MulterMiddleware.js");
const { default: mongoose } = require("mongoose");

const createAlbum = async (req, res) => {
  try {
    const imagesOriginalName = req.filenames;

    const album = new AlbumModel({
      title: req.body.title,
      image: imagesOriginalName[0],
    });

    const saved = await album.save();

    if (!saved) {
      // Delete previously stored files
      req.filenames.forEach((filename) => {
        deletePhysicalImage(filename);
      });

      return res.json({
        message: "Failed to create Album",
        success: false,
      });
    }

    return res.json({
      message: "Album created successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.json({ message: "Error creating the Album", success: false });
  }
};

const all = async (req, res) => {
  try {
    const albums = await AlbumModel.find({}).exec();

    return res.json({
      success: true,
      albums,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "An error occurred while fetching the Albums",
      albums: [],
    });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    // Find album and delete
    const album = await AlbumModel.findByIdAndRemove(req.body.albumId).exec();

    // Fetch all images associated with the album
    const images = await ImageModel.find({ albumId: album._id });

    // Delete all images associated with the album
    images.forEach((image) => {
      deletePhysicalImage(image.originalName);
    });

    // Delete the images from Image collection
    await ImageModel.deleteMany({ albumId: album._id });

    return res.json({
      success: true,
      message: `Album ${album.title} has been deleted successfully`,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: `Operation Failed`,
    });
  }
};

const updateAlbum = async (req, res) => {
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
    };

    if (req.files?.image) {
      imageOriginalName = req.filenames[0];

      updatePayload = {
        ...updatePayload,
        image: imageOriginalName,
      };
    }

    const result = await AlbumModel.findByIdAndUpdate(
      req.body.albumId,
      updatePayload
    ).exec();

    if (!result) {
      return res.json({
        message: "Album update failed",
        success: true,
      });
    }

    return res.json({
      message: "Album details updated successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.json({ message: "Error updating album", success: false });
  }
};

const getAlbumImages = async (req, res) => {
  const albumId = req.body.albumId;

  console.log("albumId: ", albumId, req.body);

  try {
    const albumImages = await ImageModel.find({
      albumId,
    }).exec();

    console.log(albumImages);

    return res.json({
      success: true,
      images: albumImages,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Could not load images for album",
    });
  }
};

module.exports = {
  all,
  createAlbum,
  deleteAlbum,
  updateAlbum,
  getAlbumImages,
};

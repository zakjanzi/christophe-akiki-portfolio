const AlbumModel = require("../Models/AlbumModel.js");
const ImageModel = require("../Models/ImageModel.js");
const CategoryModel = require("../Models/CategoryModel.js");
const { deletePhysicalImage } = require("../Middlewares/MulterMiddleware.js");
const { imageSaver } = require("../utils/functions.js");

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
    const deletedAlbum = await AlbumModel.findByIdAndDelete(
      req.body.albumId
    ).exec();

    // Delete album thumbnail
    deletePhysicalImage(deletedAlbum.thumbnail);

    // Find all categories that belongs to the album
    const delAlbumCategories = await CategoryModel.find({
      albumId: deletedAlbum._id,
    }).exec();

    // Delete all categories associated with the Album
    await CategoryModel.deleteMany({
      albumId: deletedAlbum._id,
    }).exec();

    // Delete all categories thumbnail
    delAlbumCategories.forEach((category) => {
      deletePhysicalImage(category.thumbnail);
    });

    // Fetch all images associated with the album
    const images = await ImageModel.find({ albumId: deletedAlbum._id }).exec();

    // Delete all images associated with the album
    images.forEach((image) => {
      deletePhysicalImage(image.originalName);
    });

    // Delete the images from Image collection on the database
    await ImageModel.deleteMany({ albumId: deletedAlbum._id }).exec();

    // Get list of existing Albums
    const albums = await AlbumModel.find({}).exec();

    return res.json({
      success: true,
      message: `Album ${deletedAlbum.title} has been deleted successfully`,
      albums,
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
  let albumThumbnail;

  if (req.files) {
    albumThumbnail = req.files.albumThumbnail;
  }

  const { albumId, newAlbumName } = req.body;

  if ((!newAlbumName && !albumThumbnail) || (!newAlbumName && albumThumbnail)) {
    return res.json({
      success: false,
      message: "Operation failed",
    });
  }

  let updateObject = {
    title: newAlbumName,
  };

  if (albumThumbnail) {
    const thumbnail = imageSaver(albumThumbnail);

    // Remove old album thumbnail
    const oldAlbumDoc = await AlbumModel.findById(albumId).exec();

    deletePhysicalImage(oldAlbumDoc.thumbnail);

    updateObject = {
      ...updateObject,
      thumbnail: thumbnail.newFileName,
    };
  }

  try {
    const albumUpdateResult = await AlbumModel.findByIdAndUpdate(
      albumId,
      updateObject,
      { new: true }
    ).exec();

    if (albumUpdateResult) {
      return res.json({
        success: true,
        message: "Album updated successfully",
        updatedAlbum: albumUpdateResult,
      });
    } else {
      return res.json({
        success: false,
        message: "Operation failed",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
      message: "An error occurred while updating categories",
    });
  }
};

const getAlbumImages = async (req, res) => {
  const albumId = req.body.albumId;

  try {
    const albumImages = await ImageModel.find({
      albumId,
    }).exec();

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

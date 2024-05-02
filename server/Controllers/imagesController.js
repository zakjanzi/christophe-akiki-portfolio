const Image = require("../Models/ImageModel.js");
const { deletePhysicalImage } = require("../Middlewares/MulterMiddleware.js");
const path = require("node:path");
const Album = require("../Models/AlbumModel.js");
const Category = require("../Models/CategoryModel.js");

const imageSaver = (imageFile) => {
  let newFileName = "";

  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(imageFile.mimetype);
  const extname = filetypes.test(path.extname(imageFile.name).toLowerCase());
  if (mimetype && extname) {
    newFileName = `CaGallery-${Date.now()}${path.extname(imageFile.name)}`;

    uploadPath = __dirname + "/../public/images/" + newFileName;

    try {
      // Use the mv() method to place the file somewhere on your server
      imageFile.mv(uploadPath, function (err) {
        if (err) {
          console.log("express file upload error: ", err);
        }
      });

      return {
        newFileName,
      };
    } catch (err) {
      console.log(err);

      return {
        newFileName,
      };
    }
  }
};

const createNewAlbum = async (albumName, albumThumbnail) => {
  // Save the albumThumbnail
  const { newFileName, success } = imageSaver(albumThumbnail);
  console.log("newAlbumFilename: ", newFileName, success);

  if (!newFileName) return false;

  try {
    // Create the new album
    const albumModel = new Album();
    albumModel.thumbnail = newFileName;
    albumModel.title = albumName;

    const newAlbumDoc = await albumModel.save();

    if (!newAlbumDoc) return false;

    return newAlbumDoc;
  } catch (error) {
    console.log(error);
  }
};

const createNewCategory = async (categoryName, categoryThumbnail, albumId) => {
  // Save the categoryThumbnail
  const { newFileName } = imageSaver(categoryThumbnail);

  if (!newFileName) return false;

  try {
    // Create the new category
    const categoryModel = new Category();
    categoryModel.thumbnail = newFileName;
    categoryModel.name = categoryName;
    categoryModel.albumId = albumId;

    const newCategoryDoc = await categoryModel.save();

    if (!newCategoryDoc) return false;

    return newCategoryDoc;
  } catch (error) {
    console.log(error);
  }
};

const uploadImage = async (req, res) => {
  try {
    const imagesOriginalName = req.filenames;

    const { albumId, albumName, categoryId, categoryName } = req.body;

    const { albumThumbnail, categoryThumbnail } = req.files;

    // Create Album first
    let newAlbum;
    if (albumName && albumThumbnail) {
      newAlbum = await createNewAlbum(albumName, albumThumbnail);
      console.log("New Album: ", newAlbum);

      if (!newAlbum) {
        return res.json({
          success: false,
          message: "Operation failed",
        });
      }
    }

    // Create Category next
    let newCategory;
    if (categoryName && categoryThumbnail) {
      const catAlbumId = newAlbum ? newAlbum._id : albumId;
      newCategory = await createNewCategory(
        categoryName,
        categoryThumbnail,
        catAlbumId
      );

      if (!newCategory) {
        return res.json({
          success: false,
          message: "Operation failed",
        });
      }
    }

    const imagesArray = [];

    // If albumId and categoryId is set (i.e existing album and existing category)
    if (albumId && categoryId) {
      for (let y = 0; y < imagesOriginalName.length; y++) {
        imagesArray.push({
          categoryId,
          albumId,
          originalName: imagesOriginalName[y],
        });
      }
    } else if (newAlbum && newCategory) {
      // newly created album and category
      for (let y = 0; y < imagesOriginalName.length; y++) {
        imagesArray.push({
          categoryId: newCategory._id,
          albumId: newAlbum._id,
          originalName: imagesOriginalName[y],
        });
      }
    } else if (albumId && newCategory) {
      // Existing album and a new category
      for (let y = 0; y < imagesOriginalName.length; y++) {
        imagesArray.push({
          categoryId: newCategory._id,
          albumId,
          originalName: imagesOriginalName[y],
        });
      }
    }

    // Note: A new Album does not have any pre-existing category hence no handler for that scenario above

    const saved = await Image.insertMany(imagesArray);

    if (!saved) {
      // Delete previously stored files
      req.filenames.forEach((filename) => {
        deletePhysicalImage(filename);
      });

      return res.json({
        message: "Image(s) upload failed",
        success: false,
      });
    }

    return res.json({
      message: "Image(s) uploaded successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.json({ message: "Error uploading the image(s)", success: false });
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

const selectImagesForAlbumCategory = async (req, res) => {
  const { albumId, categoryId } = req.body;

  try {
    const images = await Image.find({ albumId, categoryId }).exec();

    return res.json({
      success: true,
      images,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Errors encountered",
      images: [],
    });
  }
};

module.exports = {
  uploadImage,
  getImages,
  deleteImage,
  selectImagesForAlbumCategory,
};

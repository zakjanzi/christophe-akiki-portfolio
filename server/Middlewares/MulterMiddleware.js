const path = require("path");
const fs = require("fs");

const uploadedImagesDir = __dirname + "/../public/images/";

const uploadMiddleware = (request, response, next) => {
  if (!request.files?.image) {
    next();
    return;
  }

  const imageFile = request.files.image;

  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(imageFile.mimetype);
  const extname = filetypes.test(path.extname(imageFile.name).toLowerCase());
  if (mimetype && extname) {
    const fileName = `CaGallery-${Date.now()}${path.extname(imageFile.name)}`;

    request.files.filename = fileName;

    uploadPath = __dirname + "/../public/images/" + fileName;

    // Use the mv() method to place the file somewhere on your server
    imageFile.mv(uploadPath, function (err) {
      console.log("express file upload error: ", err);
      if (err)
        return response.json({
          success: false,
          message: "Error uploading image.",
        });

      next();
    });
  }
};

const deletePhysicalImage = (fileName) => {
  if (typeof fileName === "undefined") return;

  try {
    fs.unlink(path.join(uploadedImagesDir, fileName), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  } catch (err) {
    console.error("Error deleting file", err.message);
    return;
  }
};

module.exports = { uploadMiddleware, deletePhysicalImage };

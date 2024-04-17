const path = require("path");
const fs = require("fs");

const uploadedImagesDir = __dirname + "/../public/images/";

const uploadMiddleware = (request, response, next) => {
  if (!request.files) {
    next();
    return;
  }

  const imageFiles = request.files.images
    ? Array.isArray(request.files.images)
      ? request.files.images
      : [request.files.images] // Handles selection of one image
    : [request.files.image];

  request.filenames = [];

  let errors = false;

  let imageSavedCount = 0;

  function saveToDisk(singleImageFile) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(singleImageFile.mimetype);
    const extname = filetypes.test(
      path.extname(singleImageFile.name).toLowerCase()
    );
    if (mimetype && extname) {
      const fileName = `CaGallery-${Date.now()}${path.extname(
        singleImageFile.name
      )}`;

      request.filenames.push(fileName);

      uploadPath = __dirname + "/../public/images/" + fileName;

      try {
        // Use the mv() method to place the file somewhere on your server
        singleImageFile.mv(uploadPath, function (err) {
          // console.log("express file upload error: ", err);
          if (err)
            return response.json({
              success: false,
              message: "Error uploading image.",
            });

          if (imageSavedCount + 1 === imageFiles.length) {
            next();
            return;
          }

          imageSavedCount += 1;

          saveToDisk(imageFiles[imageSavedCount]);
        });
      } catch (err) {
        console.log(err);

        // Delete previously stored files
        request.filenames.forEach((filename) => {
          deletePhysicalImage(filename);
        });

        return response.json({
          success: false,
          message: "Error uploading image(s).",
        });
      }
    } else {
      // Delete previously stored files
      request.filenames.forEach((filename) => {
        deletePhysicalImage(filename);
      });

      errors = true;

      if (!errors) {
        next();
      } else {
        return response.json({
          success: false,
          message: "Error uploading image(s).",
        });
      }
    }
  }

  saveToDisk(imageFiles[imageSavedCount]);
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

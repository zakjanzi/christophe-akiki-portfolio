const path = require("node:path");
const randomString = require("randomstring");

const imageSaver = (imageFile) => {
  let newFileName = "";

  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(imageFile.mimetype);
  const extname = filetypes.test(path.extname(imageFile.name).toLowerCase());
  if (mimetype && extname) {
    newFileName = `CaGallery-${randomString.generate()}${path.extname(
      imageFile.name
    )}`;

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

module.exports = { imageSaver };

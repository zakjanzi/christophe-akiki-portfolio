const AlbumModel = require("../Models/AlbumModel.js");

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
      message: "An error occurred while creating a category",
      albums: [],
    });
  }
};

module.exports = {
  all,
};

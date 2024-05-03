const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    albumId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;

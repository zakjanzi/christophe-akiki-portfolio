const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    contentType: {
      type: String,
      required: true,
    },

    // category: {
    //   type: String,
    //   required: true,
    // },

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

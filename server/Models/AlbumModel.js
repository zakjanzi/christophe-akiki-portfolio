const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

albumSchema.add({
  link: {
    type: String,
    unique: true,
    required: true,
  },
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;

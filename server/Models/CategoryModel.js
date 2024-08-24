const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    albumId: {
      type: mongoose.Types.ObjectId,
      required: true,
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

categorySchema.add({
  link: {
    type: String,
    required: true,
    unique: true,
  },
});

categorySchema.index({ name: 1, albumId: 1, link: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

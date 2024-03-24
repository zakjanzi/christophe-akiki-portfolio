const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index({ name: 1, album: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

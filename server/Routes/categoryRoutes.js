const express = require("express");
const router = express.Router();
const {
  create,
  all,
  updateCategory,
  deleteCategory,
} = require("../Controllers/categoryController.js");

const protected = require("../Middlewares/Auth.js");

router.post("/create", protected, create);

router.get("/all", all);

router.patch("/update", protected, updateCategory);

router.delete("/delete", protected, deleteCategory);

module.exports = router;

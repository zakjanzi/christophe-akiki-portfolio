const express = require("express");
const router = express.Router();
const { all } = require("../Controllers/albumsController.js");
const protected = require("../Middlewares/Auth.js");

router.get("/all", all);

module.exports = router;

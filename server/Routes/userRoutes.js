const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUser,
  checkRegistered,
} = require("../Controllers/userController.js");
const protected = require("../Middlewares/Auth.js");

router.post("/checkRegistered", checkRegistered);

router.post("/register", register);

router.post("/login", login);

router.get("/user", protected, getUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const { sendMail } = require("../Controllers/mailController");

router.post("/send", sendMail);

module.exports = router;

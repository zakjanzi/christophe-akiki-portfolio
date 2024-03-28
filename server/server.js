require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
const connectToDB = require("./config/config.js");
const { registerAdmin } = require("./Controllers/userController.js");
const port = 3000;

app.use(cors());

app.use(fileupload());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

// Routes
app.use("/albums", require("./Routes/albumRoutes.js"));
app.use("/categories", require("./Routes/categoryRoutes.js"));
app.use("/users", require("./Routes/userRoutes.js"));
app.use("/images", require("./Routes/imagesRoutes.js"));
app.use("/videos", require("./Routes/videoRoutes.js"));

app.use("/", express.static("build"), (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

connectToDB();
// registerAdmin();

app.listen(process.env.PORT || port, () =>
  console.log(`App listening on port ${port}!`)
);

module.exports = app;

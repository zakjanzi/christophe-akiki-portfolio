require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
const connectToDB = require("./config/config.js");
const { sendMail } = require("./utils/mail.js");
// const { registerAdmin } = require("./Controllers/userController.js");
const port = 4000;

const whitelist = [
  "https://christophe-akiki-portfolio-u9hl.onrender.com",
  "https://christopheakiki.me",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: whitelist,
    credentials: true,
  })
);

app.use(fileupload());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

// Routes
app.use("/categories", require("./Routes/categoryRoutes.js"));
app.use("/users", require("./Routes/userRoutes.js"));
app.use("/images", require("./Routes/imagesRoutes.js"));
app.use("/videos", require("./Routes/videoRoutes.js"));
app.use("/albums", require("./Routes/albumRoutes.js"));

app.use("/", express.static("build"), (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.use((err, req, res, next) => {
  if (err) {
    res.json({ message: err?.message });
  } else {
    res.send(err);
  }
});

connectToDB();
// registerAdmin();

const server = app.listen(process.env.PORT || port, async () => {
  console.log(`App listening on port ${process.env.PORT || port}!`);
  const response = await sendMail({
    from: "christopheakiki.website@gmail.com",
    to: "kazeemkadiri@outlook.com",
    subject: "Testing mail functionality",
    text: "Hello. Are you doing fine?",
  });

  console.log(response);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

module.exports = app;

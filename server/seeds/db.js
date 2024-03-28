require("dotenv").config();
const connectToDB = require("../config/config");
const Album = require("../Models/AlbumModel");

connectToDB();

Album.find({})
  .exec()
  .then((res) => {
    if (res.length > 0) {
      return;
    }

    Album.insertMany([
      { name: "Automotive" },
      { name: "Structures & Interiors" },
      { name: "Extreme Sports" },
      { name: "Portraits & Modeling" },
      { name: "Concerts & Events" },
    ]).then((res) => {
      console.log(res);
      return;
    });
  });

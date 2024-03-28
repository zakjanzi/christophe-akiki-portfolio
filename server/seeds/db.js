require("dotenv").config();
const connectToDB = require("../config/config");
const Album = require("../Models/AlbumModel");

connectToDB();

const album = new Album();

const albums = await album.collection.find({});

if (albums.length > 0) {
  return;
}

album.collection
  .insertMany([
    { name: "Automotive" },
    { name: "Structures & Interiors" },
    { name: "Extreme Sports" },
    { name: "Portraits & Modeling" },
    { name: "Concerts & Events" },
  ])
  .then((res) => {
    console.log(res);
    return;
  });

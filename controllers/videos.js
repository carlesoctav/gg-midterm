const mongoose = require("mongoose");
const Product = require("../models/product");
const Video = require("../models/video");
const videoRouter = require("express").Router();

videoRouter.get("/", async (request, response) => {
  const videos = await Video.find({});
  const videosWithoutProduct = videos.map((video) => {
    return { id: video.id, title: video.title, thumbnail: video.thumbnail };
  });
  response.json(videosWithoutProduct);
});

module.exports = videoRouter;

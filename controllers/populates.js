const mongoose = require("mongoose");
const Product = require("../models/product");
const Video = require("../models/video");
const getVideoAndProduct = require("../utils/youtube-scrap");
const populateRouter = require("express").Router();

populateRouter.post("/", async (request, response) => {
  const videoId = request.body.videoId;
  if (!videoId) {
    throw new Error("no video id provided");
  }

  const videoAndProduct = await getVideoAndProduct(videoId);
  console.log(
    "🚀 ~ file: populates.js:19 ~ populateRouter.post ~ videoAndProduct:",
    videoAndProduct
  );
  const videoDetails = videoAndProduct.videoDetails;
  const productList = videoAndProduct.productList;
  const savedProducts = await Product.insertMany(productList);
  const savedIds = savedProducts.map((product) => product._id);
  videoDetails.productList = savedIds;
  const savedVideos = await Video.insertMany(videoDetails);
  response.json(savedVideos);
});

module.exports = populateRouter;

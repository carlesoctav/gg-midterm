const mongoose = require("mongoose");
const Product = require("../models/product");
const Video = require("../models/video");
const productRouter = require("express").Router();

productRouter.get("/:id", async (request, response) => {
  const video = await Video.findById(request.params.id).populate("productList");

  response.json(video.productList);
});

module.exports = productRouter;

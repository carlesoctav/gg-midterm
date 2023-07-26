const mongoose = require("mongoose");
const Product = require("../models/product");
const Video = require("../models/video");
const NotFoundError = require("../utils/customError").NotFoundError;
const productRouter = require("express").Router();

productRouter.get("/video/:id", async (request, response) => {
  const video = await Video.findById(request.params.id);

  if (!video) {
    throw new NotFoundError("video not found");
  }

  const videoPopulated = await video.populate("productList");

  response.json(videoPopulated.productList);
});

module.exports = productRouter;

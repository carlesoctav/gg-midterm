const mongoose = require("mongoose");
const Product = require("../models/product");
const Video = require("../models/video");
const User = require("../models/user");
const Comment = require("../models/comment");
const { NotFoundError } = require("../utils/customError");

const videoRouter = require("express").Router();

videoRouter.get("/", async (request, response) => {
  const videos = await Video.find({});

  if (!videos) {
    throw new NotFoundError("video not found");
  }

  const videosWithoutProduct = videos.map((video) => {
    return {
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      youtubeLink: video.youtubeLink,
    };
  });
  response.json(videosWithoutProduct);
});

videoRouter.get("/:id", async (request, response) => {
  console.log(request.params.id);
  const video = await Video.findById(request.params.id);

  if (!video) {
    throw new NotFoundError("video not found");
  }

  const videoPopulated = await video
    .populate("commentList", {
      comment: 1,
      user: 1,
    })
    .populate("productList");

  response.json(videoPopulated);
});

videoRouter.get("/:id/comments", async (request, response) => {
  const video = await Video.findById(request.params.id);

  if (!video) {
    throw new NotFoundError("Video not found");
  }

  console.log(video);

  let videoPopulated = await video.populate({
    path: "commentList",
    model: "Comment",
    populate: {
      path: "user",
      model: "User",
      select: {
        username: 1,
      },
    },
    select: {
      comment: 1,
      user: 1,
      date: 1,
    },
  });

  response.status(200).json(videoPopulated.commentList);
});

videoRouter.get("/:id/products", async (request, response) => {
  const video = await Video.findById(request.params.id);

  if (!video) {
    throw new NotFoundError("video not found");
  }

  const videoPopulated = await video.populate("productList");

  response.json(videoPopulated.productList);
});

module.exports = videoRouter;

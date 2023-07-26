const commentsRouter = require("express").Router();
const Comment = require("../models/comment");
const User = require("../models/user");
const Video = require("../models/video");
const MissingError = require("../utils/customError").MissingError;
const NotFoundError = require("../utils/customError").NotFoundError;

commentsRouter.get("/", async (request, response) => {
  const comments = await Comment.find({})
    .populate("user", {
      username: 1,
      name: 1,
    })
    .populate("video", {
      title: 1,
    });

  response.json(comments);
});

const mongoose = require("mongoose");

commentsRouter.post("/", async (request, response) => {
  const { comment, userId, videoId } = request.body;

  if (!comment || !userId || !videoId) {
    throw new MissingError("Missing comment, userId or videoId");
  }

  const user = await User.findById(userId);
  const video = await Video.findById(videoId);
  console.log(
    "🚀 ~ file: comments.js:26 ~ commentsRouter.post ~ video:",
    video
  );

  if (!user) {
    throw new NotFoundError("User not found");
  }

  if (!video) {
    throw new NotFoundError("Video not found");
  }

  const newComment = new Comment({
    comment: comment,
    user: mongoose.Types.ObjectId(userId),
    video: mongoose.Types.ObjectId(videoId),
  });

  const savedComment = await newComment.save();
  console.log(
    "🚀 ~ file: comments.js:47 ~ commentsRouter.post ~ savedComment:",
    savedComment
  );
  user.comments = user.comments.concat(savedComment._id);
  user.comments = await user.save();

  video.commentList = video.commentList.concat(savedComment._id);
  await video.save();

  response.status(201).json(savedComment);
});

commentsRouter.get("/video/:id", async (request, response) => {
  const video = await Video.findById(request.params.id);

  if (!video) {
    throw new NotFoundError("Video not found");
  }

  const videoPopulated = await video.populate("commentList");
  response.status(200).json(videoPopulated.commentList);
});

module.exports = commentsRouter;

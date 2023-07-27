const commentsRouter = require("express").Router();
const Comment = require("../models/comment");
const User = require("../models/user");
const Video = require("../models/video");
const MissingError = require("../utils/customError").MissingError;
const NotFoundError = require("../utils/customError").NotFoundError;
const UnauthorizedError = require("../utils/customError").UnauthorizedError;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

commentsRouter.get("/", async (request, response) => {
  const comments = await Comment.find({})
    .populate("user", {
      username: 1,
    })
    .populate("video", {
      title: 1,
    });

  response.json(comments);
});

commentsRouter.post("/", async (request, response) => {
  const { comment, videoId } = request.body;

  if (!comment || !videoId) {
    throw new MissingError("Missing comment or videoId");
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    throw new UnauthorizedError("token invalid");
  }
  const userId = decodedToken.id;

  const user = await User.findById(userId);
  const video = await Video.findById(videoId);

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
  console.log(
    "🚀 ~ file: comments.js:54 ~ commentsRouter.post ~ newComment:",
    newComment
  );

  user.comments = user.comments.concat(newComment._id);

  const savedCommentPopulated = await newComment.populate("user", {
    username: 1,
  });

  video.commentList = video.commentList.concat(newComment._id);

  await newComment.save();
  await video.save();
  await user.save();

  response.status(201).json(savedCommentPopulated);
});

module.exports = commentsRouter;

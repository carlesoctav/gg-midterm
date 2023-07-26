const router = require("express").Router();
const Product = require("../models/product");
const Video = require("../models/video");
const User = require("../models/user");
const Comment = require("../models/comment");

router.post("/reset", async (request, response) => {
  await Product.deleteMany({});
  await Video.deleteMany({});
  await User.deleteMany({});
  await Comment.deleteMany({});
  response.status(204).end();
});

module.exports = router;

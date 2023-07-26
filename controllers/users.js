const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const Comment = require("../models/comment");
const MissingError = require("../utils/customError").MissingError;
const NotFoundError = require("../utils/customError").NotFoundError;

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !name || !password) {
    throw new MissingError("Missing username, name or password");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("comments", {
    comment: 1,
  });
  console.log("🚀 ~ file: users.js:27 ~ users ~ users:", users);

  response.json(users);
});

module.exports = usersRouter;

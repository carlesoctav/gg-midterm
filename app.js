const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
require("express-async-errors");

const populateRouter = require("./controllers/populates");
const videoRouter = require("./controllers/videos");
const productRouter = require("./controllers/products");
const usersRouter = require("./controllers/users");
const commentsRouter = require("./controllers/comments");
const loginRouter = require("./controllers/login");

if (process.env.NODE_ENV === "development") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

const middleware = require("./utils/middleware");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/comments", middleware.tokenExtractor, commentsRouter);
app.use("/api/populates", populateRouter);
app.use("/api/videos", videoRouter);
app.use("/api/products", productRouter);
app.use("/api/users", usersRouter);

app.get("/", (request, response) => {
  response.send("<h1>Hello Worldrrwe!</h1>");
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

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
app.use(express.json());

app.use("/api/populates", populateRouter);
app.use("/api/videos", videoRouter);
app.use("/api/products", productRouter);

app.get("/", (request, response) => {
  response.send("<h1>Hello Worldrrwe!</h1>");
});

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

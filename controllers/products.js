const mongoose = require("mongoose");
const Product = require("../models/product");
const Video = require("../models/video");
const NotFoundError = require("../utils/customError").NotFoundError;
const productRouter = require("express").Router();

//TODO Implemented CRUD on products level

module.exports = productRouter;

const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  youtubeLink: {
    type: String,
    required: true,
  },

  productList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  commentList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

videoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Video", videoSchema);

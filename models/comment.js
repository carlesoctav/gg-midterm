const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
  },

  comment: {
    type: String,
    required: true,
    minlength: 5,
  },

  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__V;
  },
});

module.exports = mongoose.model("Comment", commentSchema);

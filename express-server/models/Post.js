const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);

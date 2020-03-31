const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateRegistered: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);

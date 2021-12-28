const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
    require: true,
  },
  active: {
    type: Boolean,
    require: true,
  },
  date: {
    type: String,
  }
});

const users = new mongoose.model("users", userSchema);

module.exports = users;

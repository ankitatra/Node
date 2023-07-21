const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "customer",
    required: true,
    enum: ["seler", "customer", "buyer"],
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};

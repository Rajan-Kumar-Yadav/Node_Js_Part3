const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: { type: String, required: [true, "first name is required"] },
  lastName: String,
  email: { type: String, required: [true, "Email is required"], unique: true },

  password: { type: String, required: [true, "Email is required"] },
  userType: {
    type: String,
    enum: ["guest", "host"],
    default: "guest",
  },
});
module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const admin_userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  bio: { type: String },
  dateOfBirth: { type: Date },
  userRole: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  userImg: { type: String, required: true },
});

module.exports = mongoose.model("AdminUser", admin_userSchema);

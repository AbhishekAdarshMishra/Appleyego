const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  date: { type: String},
  category: { type: String},
  postId:{type: String }
});

module.exports = mongoose.model("Notification", notificationSchema);

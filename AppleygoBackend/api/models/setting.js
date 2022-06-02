const mongoose = require("mongoose");

const settingSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category: { type: String, required: true},
  link: { type: String, required: true },
  icon: { type: String, required: true },
});

module.exports = mongoose.model("Setting", settingSchema);

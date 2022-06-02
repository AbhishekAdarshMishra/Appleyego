const mongoose = require("mongoose");

const footerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  heading: { type: String, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model("Footer", footerSchema);

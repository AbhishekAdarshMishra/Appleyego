const mongoose = require("mongoose");

const sliderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  caption: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model("Slider", sliderSchema);

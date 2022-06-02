const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  subTitle: { type: String,},
  category: { type: String },
  class: { type: String},
  startDate: { type: Date },
  endDate: { type: Date},
  applyLink:{type: String, required: true},
  author: { type: String, required: true },
  importantInformation: { type: String},
  details: { type: String},
  howTo: { type: String},
  someInfo: { type: String },
  links: { type: String},
});

module.exports = mongoose.model("Post", postSchema);

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  },
});
const upload = multer({ storage: storage });
const Slider = require("../../models/slider");

router.post("/", upload.single("image"), (req, res, next) => {
  const slider = new Slider({
    _id: new mongoose.Types.ObjectId(),
    caption: req.body.caption,
    image: req.file.path,
    link: req.body.link,
  });
  slider
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        code: 200,
        message: "Slider Successfully Submitted",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        code: 500,
        error: err,
      });
    });
});

router.get("/", (req, res, next) => {
  Slider.find()
    .exec()
    .then((result) => {
      res.status(200).json({
        code: 200,
        message: "Slider Successfully found",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      req.status(500).json({
        code: 500,
        error: err,
      });
    });
});

module.exports = router;

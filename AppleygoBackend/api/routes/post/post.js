const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../../models/post");
const bcryptjs = require("bcryptjs");
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

router.post("/", upload.single("image"), (req, res, next) => {
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    subTitle: req.body.subTitle,
    category: req.body.category,
    class: req.body.class,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    applyLink: req.body.applyLink,
    author: req.body.author,
    importantInformation: req.body.importantInformation,
    details: req.body.details,
    howTo: req.body.howTo,
    someInfo: req.body.someInfo,
    links: req.body.links,
    image: req.file.path,
  });

  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        code: 200,
        message: "Post Successfully Submitted",
        Post: result,
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
module.exports = router;

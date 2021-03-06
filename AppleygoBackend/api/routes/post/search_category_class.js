const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../../models/post");

router.get("/:category/:class", (req, res, next) => {
  const classs = req.params.class;
  const category =req.params.category;
  Post.find({
      category:category,
    class: {
      $regex: new RegExp(classs),
      $options: "i",
    },
  })
    .exec()
    .then((result) => {
      res.status(200).json({
        code: 200,
        message: "Post Successfully found",
        post: result,
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

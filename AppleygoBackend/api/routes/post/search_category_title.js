const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../../models/post");

router.get("/:category/:title", (req, res, next) => {
    const category = req.params.category;
    const title = req.params.title;

  Post.find({
      category:category,
    title: {
      $regex: new RegExp(title),
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

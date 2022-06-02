const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../../models/post");

router.get("/:category/:author/:class", (req, res, next) => {
  const category = req.params.category;
  const author = req.params.author;
  const classs = req.params.class;
  Post.find({ category: category, author: author,class: classs })
    .exec()
    .then((result) => {
      res.status(200).json({
        code: 200,
        message: "Post Successfully found",
        comment: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;

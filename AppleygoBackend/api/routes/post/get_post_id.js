const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../../models/post");

router.get("/:_id", (req, res, next) => {
  const _id = req.params._id;
  Post.find({ _id: _id })
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

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Category = require("../../models/category");

router.post("/", (req, res, next) => {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    category: req.body.category,
    link: req.body.link,
  });

  category
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        code: 200,
        message: "Category Successfully Submitted",
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
  Category.find()
    .exec()
    .then((result) => {
      res.status(200).json({
        code: 200,
        message: "Category Successfully found",
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

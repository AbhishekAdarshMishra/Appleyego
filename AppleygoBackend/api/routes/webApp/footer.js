const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Footer = require("../../models/footer");

router.post("/", (req, res, next) => {
  const footer = new Footer({
    _id: new mongoose.Types.ObjectId(),
    heading: req.body.heading,
    link: req.body.link,
  });

  footer
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        code: 200,
        message: "Footer Successfully Submitted",
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
  Footer.find()
    .exec()
    .then((result) => {
      res.status(200).json({
        code: 200,
        message: "Footer Successfully found",
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

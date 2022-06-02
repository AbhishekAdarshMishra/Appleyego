const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Notification = require("../../models/notification");

router.post("/", (req, res, next) => {
  const notification = new Notification({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    date: req.body.date,
    category: req.body.category,
    postId: req.body.postId,
  });

  notification
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        code: 200,
        message: "Notification Successfully Submitted",
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
  Notification.find()
    .exec()
    .then((result) => {
      res.status(200).json({
        code: 200,
        message: "Notication Successfully found",
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

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const GuestUser = require("../models/guest_user");

router.get("/", (req, res, next) => {
  GuestUser.find()
    .exec()
    .then((result) => {
      res.status(200).json({
        code: 200,
        message: "User Successfully found",
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

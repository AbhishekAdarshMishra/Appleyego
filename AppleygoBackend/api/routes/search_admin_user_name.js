const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const AdminUser = require("../models/admin_user");

router.get("/:firstName", (req, res, next) => {
  const firstName = req.params.firstName;
  AdminUser.find({
    firstName: {
      $regex: new RegExp(firstName),
      $options: "i",
    },
  })
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
      res.status(500).json({
        code: 500,
        error: err,
      });
    });
});

module.exports = router;

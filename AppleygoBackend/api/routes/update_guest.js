const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const GuestUser = require("../models/guest_user");

router.post("/:email", (req, res, next) => {
  const email = req.params.email;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  GuestUser.update({ email: email }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:email", (req, res, next) => {
  const email = req.params.email;
  GuestUser.remove({ email: email })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = router;

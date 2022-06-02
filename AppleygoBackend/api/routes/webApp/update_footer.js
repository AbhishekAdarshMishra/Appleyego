const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Footer = require("../../models/footer");

router.post("/:_id", (req, res, next) => {
  const _id = req.params._id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Footer.update({ _id: _id }, { $set: updateOps })
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

router.delete("/:_id", (req, res, next) => {
  const _id = req.params._id;
  Footer.remove({ _id: _id })
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

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const AdminUser = require("../models/admin_user");

router.post("/:email", (req, res, next) => {
  const email = req.params.email;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  AdminUser.update({ email: email }, { $set: updateOps })
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
  AdminUser.remove({ email: email })
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

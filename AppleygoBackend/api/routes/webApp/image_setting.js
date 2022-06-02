const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Setting = require("../../models/setting");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/:_id", upload.single("icon"), (req, res, next) => {
  const _id = req.params._id;
  Setting.update({ _id: _id }, { icon: req.file.path })
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
module.exports = router;
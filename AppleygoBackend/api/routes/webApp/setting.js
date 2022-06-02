const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

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
const Setting= require("../../models/setting");

router.post("/", upload.single("icon"), (req, res, next) => {
            const setting = new Setting({
              _id: new mongoose.Types.ObjectId(),
              category:req.body.category,
              link: req.body.link,
              icon: req.file.path,
            });
            setting
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  code: 200,
                  message: "Setting Successfully Submitted",
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
  Setting.find()
    .exec()
    .then((result) => {
      res.status(200).json({
        code: 200,
        message: "Setting Successfully found",
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

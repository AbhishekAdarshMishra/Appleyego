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
const GuestUser = require("../models/guest_user");
const bcryptjs = require("bcryptjs");

router.post("/", upload.single("userImg"), (req, res, next) => {
  GuestUser.find({ email: req.body.email })
    .exec()
    .then((email) => {
      if (email.length >= 1) {
        return res.status(200).json({
          code: 409,
          message: "Email Id already exist",
        });
      } else {
        bcryptjs.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              code: 500,
              error: err,
            });
          } else {
            const guestUser = new GuestUser({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              gender: req.body.gender,
              bio: req.body.bio,
              dateOfBirth: req.body.dateOfBirth,
              phoneNumber: req.body.phoneNumber,
              userImg: req.file.path,
            });
            guestUser
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  code: 200,
                  message: "User Successfully Submitted",
                  result: result,
                  // {
                  //     _id: result._id,
                  //     email: result.email,
                  //     name:result.name,
                  //     gender:result.gender,
                  //     bio:result.bio,
                  //     year:result.year,
                  //     signupas:result.signupas,
                  //     mobno:result.mobno,
                  //     pic:result.pic,
                  //     tag:result.tag,
                  //     postcount:result.postcount,
                  // }
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  code: 500,
                  error: err,
                });
              });
          }
        });
      }
    });
});

module.exports = router;

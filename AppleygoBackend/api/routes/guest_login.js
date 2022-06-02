const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const GuestUser = require("../models/guest_user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
  GuestUser.find({ email: req.body.email })
    .exec()
    .then((email) => {
      if (email.length < 1) {
        return res.status(401).json({
          code: 401,
          message: "Auth failed: Either Id or Password is Incorrect",
        });
      }

      bcryptjs.compare(req.body.password, email[0].password, (err, result) => {
        if (err) {
          return res.status(200).json({
            code: 401,
            message: "Auth failed: Either Id or Password is Incorrect",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: email[0].email,
              firstName: email[0].firstName,
              lastName: email[0].lastName,
              gender: email[0].gender,
              bio: email[0].bio,
              dateOfBirth: email[0].dateOfBirth,
              phoneNumber: email[0].phoneNumber,
              userImg: email[0].userImg,
            },
            "my_secret_key"
          );
          return res.status(200).json({
            code: 200,
            message: "Auth successful",
            token: token,
          });
        }
        return res.status(200).json({
          code: 401,
          message: "Auth failed: Either Id or Password is Incorrect",
        });
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

const express = require("express");
const { User } = require("../db");
const { signupSchema, signinSchema } = require("../zod-validation");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const router = express.Router();

const JWT_KEY = process.env.JWT_KEY;

router.post("/signup", async (req, res) => {
  const payload = req.body;
  const response = signupSchema.safeParse(payload);

  if (response.success) {
    const data = await User.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    });

    if (data) {
      res.json({ data });
    } else {
      res.json({ msg: "Cannot add data" });
    }
  }
  res.json({ msg: "Error" });
});


router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const payload = req.body;
  const response = signinSchema.safeParse(payload);

  if (response.success) {
    const data = await User.findOne({
      email: payload.email,
      password: payload.password,
    });

    if (data) {
      const jwtToken = jwt.sign({email},JWT_KEY )
      res.json({ jwtToken });
    } else {
      res.json({ msg: "User Not found" });
    }
  }
  else{
    res.json({ msg: "Error cannot signin" });
  }
});


router.get("/user", async (req, res) => {
  const response = await User.find();
  if (response) {
    res.json({ response });
  } else {
    res.json({ msg: "Cannot add data" });
  }
});

module.exports = router;

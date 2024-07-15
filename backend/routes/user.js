const express = require("express");
const { User, Account } = require("../db");
const { signupSchema, signinSchema } = require("../zod-validation");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware");
require("dotenv").config();
const router = express.Router();

const JWT_KEY = process.env.JWT_KEY;

router.post("/signup", async (req, res) => {
  const payload = req.body;
  const response = signupSchema.safeParse(payload);

  if (!response.success) {
    return res.status(411).json({
      msg: "Incorrect Inputs",
    });
  }

  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    return res.status(411).json({
      msg: "User already exist",
    });
  }

  try {
    const data = await User.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    });

    const amount = await Account.create({
      email: payload.email,
      // balance: 1+ Math.random*10000
      balance: 10000,
    });

    res.json({ data, amount });
  } catch (err) {
    // res.json(err);
    // console.log(err);
    res.json({ msg: "Cannot add data" });
  }
});

router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  const { email, password } = req.body;

  if (success) {
    return res.status(411).json({
      msg: "Incorrect Inputs",
    });
  }

  const user = await User.findOne({
    email,
    password,
  });

  if (user) {
    const jwtToken = jwt.sign({ email }, JWT_KEY);
    return res.json({ jwtToken });
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const update = await User.updateOne(
    {
      email: req.email,
    },
    req.body
  );
  res.json({ msg: "Update Successful" });
});

router.get("/", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({user: users.map(user=>{
    firstName: user.firstName;
    lastName: user.lastName;
    email: user.email
  })})

  // const response = await User.findOne({
  //   email: req.email,
  // });
  // if (response) {
  //   res.json({ response });
  // } else {
  //   res.json({ msg: "Cannot add data" });
  // }
});

module.exports = router;

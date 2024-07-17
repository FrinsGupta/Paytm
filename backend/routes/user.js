const express = require("express");
const { User, Account } = require("../db");
const { signupSchema, signinSchema } = require("../zod-validation");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware");
require("dotenv").config();
const router = express.Router();
const mongoose = require("mongoose");

const JWT_KEY = process.env.JWT_KEY;

// SIGN UP 
router.post("/signup", async (req, res) => {
  const payload = req.body;
  const response = signupSchema.safeParse(payload);
  const session = await mongoose.startSession();

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

  session.startTransaction();
  try {
    const data = await User.create([
      {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    },
  ],
  {session}
);

    const email = req.body.email;

    const token = jwt.sign({ email }, JWT_KEY);

    const amount = await Account.create([{
      email: payload.email,
      // balance: 1+ Math.random*10000
      balance: 10000,
    },
  ],{session});

    res.json({
      msg: "Successfully Signed Up",
      success: true,
      token: token,
    });
  } catch (err) {
    await session.abortTransaction();
    console.log(err);
    res.json({ msg: "Cannot add data", err: err });
    return
  }
  await session.commitTransaction();
});

// SIGN IN
router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  const { email, password } = req.body;

  if (!success) {
    return res.status(411).json({
      msg: "Incorrect Inputs",
    });
  }

  const user = await User.findOne({
    email,
    password,
  });

  if (user) {
    const token = jwt.sign({ email }, JWT_KEY);
    return res.json({
      msg: "Successfully Signed In",
      success: true,
      token: token,
    });
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

// UPDATE ROUTE
router.put("/", authMiddleware, async (req, res) => {
  const update = await User.updateOne(
    {
      email: req.email,
    },
    req.body
  );
  res.json({ msg: "Update Successful" });
});

router.get("/",authMiddleware,async(req,res)=>{
  const response = await User.findOne({
    email: req.email
  })
  console.log(response);
  res.json({response})
})

// GET ROUTE
router.get("/bulk", authMiddleware, async (req, res) => {
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

  res.json({users})

});

module.exports = router;

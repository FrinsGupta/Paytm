const express = require("express");
const router = express.Router();
const { User, Account } = require("../db");
const authMiddleware = require("../middleware");
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const data = await Account.findOne({
      email: req.email,
    });

    const { balance } = data;
    res.json({ balance: balance });
  } catch (error) {
    console.log(error);
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { to, amount } = req.body;
    const receiptExist = await User.findOne({
      email: to,
    }).session(session);

    if (!receiptExist) {
      res.json({ msg: "Receiptant doesnt exist",success:false });
      await session.abortTransaction();
      return;
    }

    const userBalance = await Account.findOne({
      email: req.email,
    }).session(session);

    if (userBalance.balance < amount) {
      res.json({ msg: "Insufficient Balance",success:false });
      await session.abortTransaction();
      return;
    }

    const userBalUpdate = await Account.updateOne(
      {
        email: req.email,
      },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);

    const receiptBalUpdate = await Account.updateOne(
      {
        email: to,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);
  res.json({ userBalUpdate, receiptBalUpdate, success:true });

  } catch (error) {
    res.json({ msg: error, success:false });
    console.log(error);
    await session.abortTransaction();
  }

  await session.commitTransaction();
});

module.exports = router;

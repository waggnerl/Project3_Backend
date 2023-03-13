const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});


router.put("/edit/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const { name, email, img, } = req.body;
  User.findByIdAndUpdate(userId, { name, email, img })
    .then((udpdate) => {
      res.status(200).json(udpdate);
    })
    .catch((err) => next(err));
});

module.exports = router;

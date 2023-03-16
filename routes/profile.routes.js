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
  const { name, img } = req.body;
  console.log(req.body);

  User.findByIdAndUpdate(userId, { name, img })
    .then((udpdate) => {
      return res.status(200).json({ message: "User updated successfully" });
    })
    .catch((err) => res.status(400).json({ message: "User not updated" }));
});

module.exports = router;

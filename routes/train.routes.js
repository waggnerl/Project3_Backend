const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.put("/:type", (req, res, next) => {
  const { type } = req.params;
  res.json("All good in here");
});

module.exports = router;
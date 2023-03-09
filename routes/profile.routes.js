const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.put("/train/:trainId", (req, res, next) => {
  const { trainId } = req.params;
  res.json("All good in here");
});

router.get("/train/:trainId", (req, res, next) => {
  const { trainId } = req.params;
  res.json("All good in here");
});

// Delete train
router.post("/train/:trainId", (req, res, next) => {
  const { trainId } = req.params;
  res.json("All good in here");
});

module.exports = router;

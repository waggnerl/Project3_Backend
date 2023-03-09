const express = require("express");
const router = express.Router();

router.get("/students/:personalId", (req, res, next) => {
  res.json("All good in here");
});

router.post("/students", (req, res, next) => {
  const { trainId } = req.params;
  res.json("All good in here");
});

router.post("/students/:studentsId", (req, res, next) => {
  const { trainId } = req.params;
  res.json("All good in here");
});

module.exports = router;

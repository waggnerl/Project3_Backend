const express = require("express");
const router = express.Router();
const User = require('../models/User.model')

// Get all trains
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// Get a specific train
router.get("/:trainId", (req, res, next) => {
  const { trainId } = req.params;
  res.json("All good in here");
});

// Create a specific train
router.post("create/:studentId", (req, res, next) => {
  const { studentId } = req.params;
  const { date } = req.body;
  const
});

// Edit a specific train
router.put("/:trainId", (req, res, next) => {
  const { trainId } = req.params;
  res.json("All good in here");
});

// Delete a specific train
router.post("delete/:trainId", (req, res, next) => {
  const { trainId } = req.params;
  res.json("All good in here");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Train = require("../models/Train.model");
const Exercise = require("../models/Exercises.model");

// Get a specific train
router.get("/:trainId", async (req, res, next) => {
  try {
    const { trainId } = req.params;
    const train = await Train.findById(trainId);
    return res.json(train);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

// get all trains by student
router.get("/all/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const train = await User.findById(userId).populate("trains");
    return res.json(train);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

// Create a specific train
router.post("/create", async (req, res, next) => {
  try {
    const { name, description, interval, studentId } = req.body;
    const newTrain = await Train.create({ name, description, interval });
    await User.findByIdAndUpdate(studentId, { $push: { trains: newTrain } });
    return res.status(200).json({ message: "Train created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Train not created" });
  }
});

// Edit a specific train
router.put("/update", async (req, res, next) => {
  const { trainId, name, description, interval } = req.body;
  console.log(trainId, name, description, interval);
  try {
    await Train.findByIdAndUpdate(trainId, {
      name,
      description,
      interval,
    });
    await Train.findById(trainId);
    return res.status(200).json({ message: "Train updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "Train not updated" });
  }
});

// Delete a specific train
router.post("/delete", async (req, res, next) => {
  try {
    const { trainId } = req.body;
    // await User.findByIdAndUpdate(trainId, {
    //   $pull: { trains: trainId },
    // });
    const trainToDelete = await Train.findById(trainId);

    const exercisesToDelete = trainToDelete.exercises;

    await Exercise.deleteMany({ _id: { $in: exercisesToDelete } });
    await Train.deleteOne({ _id: trainId });

    return res.status(200).json({ message: "Train deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: "Train not deleted" });
  }
});

module.exports = router;

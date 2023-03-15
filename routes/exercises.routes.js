const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Train = require("../models/Train.model");
const Exercise = require("../models/Exercises.model");

// Get a specific exercise
router.get("/:exetciseId", async (req, res, next) => {
  try {
    const { exetciseId } = req.params;
    const exercise = await Exercise.findById(exetciseId);
    return res.json(exercise);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

// Get all exercise by user
router.get("/getAll/:trainId", async (req, res, next) => {
  try {
    const { trainId } = req.params;
    const exercises = await Train.findById(trainId).populate("exercises");
    return res.json(exercises);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

// Create a specific exercise
router.post("/create", async (req, res, next) => {
  try {
    const { name, description, reps, sets, interval, activicties, trainId } =
      req.body;
    console.log(req.body);
    const newExercise = await Exercise.create({
      name,
      description,
      interval,
      activicties,
      reps,
      sets,
    });
    await Train.findByIdAndUpdate(trainId, {
      $push: { exercises: newExercise },
    });
    return res.status(200).json({ message: "Exercise created" });
  } catch (err) {
    return res.status(400).json({ message: "Exercise not created" });
  }
});

// Edit a specific exercise
router.put("/update", async (req, res, next) => {
  const { name, description, reps, sets, interval, activicties, exetciseId } =
    req.body;
  await Exercise.findByIdAndUpdate(exetciseId, {
    name,
    description,
    reps,
    sets,
    interval,
    activicties,
  });

  const exerciseUpdated = await Exercise.findById(exetciseId);
  res.json(exerciseUpdated);
});

// Delete a specific exercise
router.post("/delete", async (req, res, next) => {
  const { exetciseId, trainId } = req.body;
  try {
    await Train.findByIdAndUpdate(trainId, {
      $pull: { exercises: exetciseId },
    });

    await Exercise.deleteOne({ _id: exetciseId });
    return res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: "Exercise not deleted" });
  }
});

module.exports = router;

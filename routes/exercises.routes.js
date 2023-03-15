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
    return res.json(newExercise);
  } catch (err) {
    console.log(err);
  }
});

// Edit a specific exercise
router.put("/update", async (req, res, next) => {
  const { name, description, reps, sets, interval, activicties, exetciseId } =
    req.body;
  await Exercises.findByIdAndUpdate(exetciseId, {
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
  const { exetciseId } = req.body;
  await User.findByIdAndUpdate(exetciseId, {
    $pull: { exercises: exetciseId },
  });

  const deletedExercise = await Train.deleteOne({ _id: exetciseId });
  res.json(deletedExercise);
});

module.exports = router;

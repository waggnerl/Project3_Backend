const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

// Get the list of students, by personal
router.get("/:personalId", async (req, res, next) => {
  try {
    const { personalId } = req.params;
    const personal = await User.findById(personalId);
    const personalStudents = await personal.populate("students");
    return res.json(personalStudents);
  } catch (err) {
    console.log(err);
    return;
  }
});

// Include a new student, for personal
router.post("/:personalId/:studentId", async (req, res, next) => {
  try {
    const { personalId, studentId } = req.params;
    await User.findByIdAndUpdate(personalId, {
      $push: { students: studentId },
    });

    const personalStudents = await User.findById(personalId).populate(
      "students"
    );

    return res.json({ studentsId: personalStudents.students });
  } catch (err) {
    console.log(err);
    return;
  }
});

module.exports = router;

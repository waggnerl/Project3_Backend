const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

// Get the list of students, by personal
router.get("/:personalId", async (req, res, next) => {
  try {
    const { personalId } = req.params;
    const personal = await User.findById(personalId);
    const personalStudents = await personal.populate("students");
    return res.json(personalStudents.students);
  } catch (err) {
    console.log(err);
    return;
  }
});

// Get the list of students
router.get("/", async (req, res, next) => {
  try {
    const students = await User.find({ role: "student" });
    return res.json(students);
  } catch (err) {
    console.log(err);
    return;
  }
});

// Include a new student, for personal
router.post("/:personalId/:studentId", async (req, res, next) => {
  try {
    const { personalId, studentId } = req.params;

    const personalStudents = await User.findById(personalId).populate(
      "students"
    );

    const validate = personalStudents.students.filter(
      (student, index) => personalStudents.students.indexOf(studentId) !== index
    );

    if (validate.length > 0)
      return res.status(400).json({ message: "Student already included" });

    await User.findByIdAndUpdate(personalId, {
      $push: { students: studentId },
    });

    return res.status(200).json({ message: "Student included with success" });
  } catch (err) {
    console.log(err);
    return;
  }
});

router.post("/:personalId/:studentId/delete", async (req, res, next) => {
  try {
    const { personalId, studentId } = req.params;
    await User.findByIdAndUpdate(personalId, {
      $pull: { students: studentId },
    });

    const personalStudents = await User.findById(personalId).populate(
      "students"
    );

    return res.status(200).json({ message: "Deleted student from professor" });
  } catch (err) {
    return res
      .status(200)
      .json({ message: "Error deleting student from professor" });
  }
});

module.exports = router;

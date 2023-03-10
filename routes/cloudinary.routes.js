const express = require("express");
const router = express.Router();

const fileUploader = require("../config/cloudinary.config");

router.post("/", fileUploader.single("img"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ fileUrl: req.file.path });
});

module.exports = router;

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const profileRoutes = require("./routes/profile.routes");
app.use("/profile", profileRoutes);

const studentRoutes = require("./routes/student.routes");
app.use("/student", studentRoutes);

const trainRoutes = require("./routes/train.routes");
app.use("/train", trainRoutes);

const exerciseRoutes = require("./routes/exercises.routes");
app.use("/exercise", exerciseRoutes);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const cloudinaryRoutes = require("./routes/cloudinary.routes");
app.use("/api/upload", cloudinaryRoutes);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

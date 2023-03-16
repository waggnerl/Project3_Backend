const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    role: { type: String, enum: ["personal", "student"], required: true },
    img: { type: String, 
    default: "../public/profile.png"},
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    trains: [
      {
        type: Schema.Types.ObjectId,
        ref: "Train",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

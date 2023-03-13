const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const exercisesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    description: {
      type: String,
      require: true,
    },
    interval: {
      type: Number,
      require: true,
    },
    reps: [
      {
        type: Number,
        require: true,
      },
    ],
    sets: {
      type: Number,
      require: true,
    },
    activicties: [
      {
        type: Array,
        require: true,
      },
    ],
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const exercises = model("Exercises", exercisesSchema);

module.exports = exercises;

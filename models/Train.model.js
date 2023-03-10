const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const trainSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    date: {
      type: Date,
      required: [true, "Date is required."],
      require: true,
    },
    exercises: [
      {
        type: Schema.Types.ObjectId,
        ref: "Exercises",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Train = model("Train", trainSchema);

module.exports = Train;

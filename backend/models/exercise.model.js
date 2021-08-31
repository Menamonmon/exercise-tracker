const mongoose = require("mongoose");
const { Schema } = mongoose;

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 16,
  },
  description: {
    type: String,
    required: false,
    maxLength: 1000,
  },
  sets: {
    type: Number,
    required: false,
  },
  reps: {
    type: Number,
    required: false,
  },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reminders: [{ type: Schema.Types.ObjectId, ref: "Reminder" }],
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;

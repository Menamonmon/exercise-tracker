const mongoose = require("mongoose");
const { Schema } = mongoose;

const exerciseSchema = new Schema({
  exercise: { type: Schema.Types.ObjectId, ref: "Exercise" },
  date: { type: Date, required: true },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;

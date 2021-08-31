const mongoose = require("mongoose");
const { Schema } = mongoose;

const validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  picture: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [validateEmail, "Invalid Email Address"],
    unique: true,
  },
  points: {
    type: Number,
    default: 0,
    required: true,
  },
  exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;

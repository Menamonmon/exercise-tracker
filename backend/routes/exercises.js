const router = require("express").Router();
const { requiresAuth } = require("express-openid-connect");
const Exercise = require("../models/exercise.model");
const Reminder = require("../models/reminder.model");

router.route("/").get(async (req, res) => {
  try {
    const exercises = await Exercise.find({
      owner: req.user.id,
    });
    res.json(exercises);
  } catch (err) {
    res.status(400).json("Error" + err);
  }
});

router.route("/add").post(async (req, res) => {
  try {
    const { name, description, sets, reps } = req.body;
    const newExercise = new Exercise({
      name,
      description,
      sets,
      reps,
      owner: req.user.id,
    });
    await newExercise.save();
    res.json("Exercise Created");
  } catch (err) {
    res.status(400).json("Error" + err);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (err) {
    res.status(400).json("Error" + err);
  }
});

router.route("/:id/update/").put(async (req, res) => {
  try {
    const { name, description, sets, reps } = req.body;
    const updatedExercise = {};
    if (name) {
      updatedExercise.name = name;
    }
    if (description) {
      updatedExercise.description = description;
    }
    if (sets) {
      updatedExercise.sets = sets;
    }
    if (reps) {
      updatedExercise.reps = reps;
    }
    await Exercise.updateOne({ _id: req.params.id }, updatedExercise);
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (err) {
    res.status(400).json("Error" + err);
  }
});

router.route("/:id/delete").delete(async (req, res) => {
  try {
    await Exercise.deleteOne({ _id: req.param.id });
    res.json(exercise);
  } catch (err) {
    res.status(400).json("Error" + err);
  }
});

router.route("/:id/add-reminder").post(async (req, res) => {
  if (!req.body.date) {
    res.status(400).json("Invalid Date");
    return;
  }
  try {
    const newReminder = new Reminder({
      exercise: req.params.id,
      date: req.body.date,
    });
    res.json(newReminder);
  } catch (err) {
    res.status(400).json("Error" + err);
  }
});

module.exports = router;

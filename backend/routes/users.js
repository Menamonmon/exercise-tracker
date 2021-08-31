const router = require("express").Router();
const { requiresAuth } = require("express-openid-connect");
const User = require("../models/user.model");

router.route("/").get(requiresAuth(), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json("Error" + err);
  }
});

module.exports = router;

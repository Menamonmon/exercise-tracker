const User = require("./models/user.model");

const isUserNew = async (user) => {
  const { email } = user;
  if (await User.findOne({ email })) {
    return false;
  }
  return true;
};

const addUser = async (user) => {
  const { name, email, picture } = user;
  const newUser = new User({ name, email, picture });
  try {
    await newUser.save();
  } catch (err) {
    return null;
  }
  return newUser;
};

const getUser = async (user) => {
  return await User.findOne({ email: user.email });
};

const attachUserIDMiddleware = async (req, res, next) => {
  if (req.oidc.isAuthenticated()) {
    const { email, name, _id } = await User.findOne({
      email: req.oidc.user.email,
    });
    req.user = { email, name, id: _id };
  }
  next();
};

module.exports = { isUserNew, addUser, getUser, attachUserIDMiddleware };

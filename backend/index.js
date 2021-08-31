require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { auth, requiresAuth } = require("express-openid-connect");

const exercisesRoutes = require("./routes/exercises");
const { addUser, isUserNew, attachUserIDMiddleware } = require("./auth");

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET,
};

const app = express();

app.use(cors());
app.use(express.text());
app.use(express.json());

app.use(auth(authConfig));
app.use("/exercises", attachUserIDMiddleware);
app.use("/exercises", requiresAuth());

app.use("/exercises", exercisesRoutes);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, () => {
  console.log("DB Connected");
});

app.get("/", async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    const authenticatedUser = req.oidc.user;
    if (await isUserNew(authenticatedUser)) {
      const savedUser = await addUser(authenticatedUser);
      if (savedUser) {
        res.status(200).send("NEW USER CREATED");
      } else {
        res.status(400).send("PROBLEM WITH CREATING USER");
      }
      return;
    }
    res.send("OLD USER");
    return;
  }
  res.send("NO USER LOGGED IN");
});

const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => {
  console.log("Serving App on Port: ", PORT);
});

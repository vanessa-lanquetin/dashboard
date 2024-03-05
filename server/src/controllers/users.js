const app = require("express").Router();
const config = require("../helpers/config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    user = await new User(req.body).save();
    const token = jwt.sign({ email: user.email }, config.JWT_PRIVATE_KEY);
    user = await User.findOne({ email: req.body.email });
    user.token = token;
    await user.save({});
    return res.json(token);
  }
  res.status(400).json("Compte déjà existant");
});

app.get("/me", isAuthenticated, async (req, res) => {
  return res.json(req.user)
});

app.post("/login", async (req, res) => {
  let  user = await User.findOne({ email: req.body.email }).select('+password');
  if (user) {
    if(await bcrypt.compare(req.body.password, user.password || '')) {
      const token = jwt.sign({ email: user.email }, config.JWT_PRIVATE_KEY);
      user = await User.findOne({ email: req.body.email });
      if(user) {
        user.token = token
        await user.save();
      }
      return res.json(token)
    } 
    return res.status(401).send("Wrong password");
  }
  res.status(400).json("Compte inexistant");
});

module.exports = app;

const jwt = require("jsonwebtoken")
const config = require("../helpers/config");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization?.replace("Bearer ", "");
  if(!authorization) return res.status(401).send('Authorization header not found')
  try {
    jwt.verify(authorization, config.JWT_PRIVATE_KEY)
  } catch (error) {
    return res.status(401).send("JWT not valid");
  }
  const {email} = jwt.decode(authorization)
  const user = await User.findOne({email})
  if(!user) return res.status(401).send('User not found')
  req.user = user
  return next()
} 
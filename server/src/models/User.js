const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, select: false },
  token: { type: String, select: false },
});
schema.pre("save", async function (next) {
  if(this.password) {
    this.password = await bcrypt.hash(this.password, 10)
    console.log(this.password)
  }
  next()
})
module.exports = mongoose.model("User", schema);

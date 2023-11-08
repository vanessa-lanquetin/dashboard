const app = require('express').Router()

app.use("/health", require("./health"));
app.use("/users", require("./users"));

module.exports = app
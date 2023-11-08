const express = require("express");
const cors = require("cors");
const pathfs = require('path')

const app = express();

console.log("Enable cors...");
app.use(cors());

app.use('/api/v1', require('./controllers/v1'))
app.use(express.static('public'))
app.get('*', (req, res, next) => {
  res.sendFile(pathfs.resolve(__dirname, '..', 'public', 'index.html'));
})
app.use((err, req, res, next ) => {
  console.log(err)
})

module.exports = app

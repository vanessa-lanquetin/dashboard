const isAuthenticated = require("../middlewares/isAuthenticated");
const TrackingLine = require("../models/TrackingLine");
const {mongo} = require('../helpers/mongo')

const app = require("express").Router();

app.get("/", isAuthenticated, async (req, res) => {
  const trackinglines = await TrackingLine.find({ownerId: req.user._id})
  res.json(trackinglines);
});

app.get("/:trackinglineId", isAuthenticated, async (req, res) => {
  const trackingline = await TrackingLine.findOne({
    ownerId: req.user._id,
    _id: mongo.getID(req.params.trackinglineId)
  });
  if(!trackingline) return res.status(404).send({
    error: "404.00001",
    msg: "Tracking line not found",
  });
  res.json(trackingline);
});

app.post("/", isAuthenticated, async (req, res) => {
  const trackingline = await TrackingLine.createOne({
    ...req.body,
    ownerId: req.user._id,
  });
  res.json(trackingline);
});

app.put("/:trackinglineId", isAuthenticated, async (req, res) => {
  const trackingline = await TrackingLine.updateOne({
    ...req.body,
    _id: mongo.getID(req.params.trackinglineId),
    ownerId: req.user._id,
  });
  res.json(trackingline);
});

app.delete("/:trackinglineId", isAuthenticated, async (req, res) => {
  const trackingline = await TrackingLine.findOne({
    _id: mongo.getID(req.params.trackinglineId),
    ownerId: req.user._id
  })
  if(trackingline) await trackingline.delete()
  res.json("Ok");
});

module.exports = app;

//not used

var express = require("express");
const path = require("path");
var router = express.Router();

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/home.html"));
});

router.get("/mapselect", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/mapselect.html"));
});

router.get("/space", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/space.html"));
});

router.get("/leaderboard", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/leaderboard.html"));
});

module.exports = router;

const express = require("express");
const router = express.Router();
const app = express();
const path = require("path");

const fs = require("fs");
const fileName = "./public/players.json";
const file = require(fileName);

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

app.use("/", router);

app.use(express.static("public"));

router.get("/won", (req, res) => {
  if (file.players[getParameterByName("who", req.url)]) {
    var oldPoints = parseInt(file.players[getParameterByName("who", req.url)]);

    var newPoints = parseInt(getParameterByName("points", req.url)) + oldPoints;

    file.players[getParameterByName("who", req.url)] = newPoints;

    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(file));
      console.log("writing to " + fileName);
    });
  } else {
    file.players[getParameterByName("who", req.url)] = parseInt(
      getParameterByName("points", req.url)
    );
    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(file));
      console.log("writing to " + fileName);
    });
  }
  res.sendFile(path.join(__dirname + "/public/home.html"));
});

router.get("/twowinners", (req, res) => {
  if (file.players[getParameterByName("who", req.url)]) {
    var oldPoints = parseInt(file.players[getParameterByName("who", req.url)]);

    var newPoints = parseInt(getParameterByName("points", req.url)) + oldPoints;

    file.players[getParameterByName("who", req.url)] = newPoints;

    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(file));
      console.log("writing to " + fileName);
    });
  } else {
    file.players[getParameterByName("who", req.url)] = parseInt(
      getParameterByName("points", req.url)
    );
    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(file));
      console.log("writing to " + fileName);
    });
  }
  if (file.players[getParameterByName("who2", req.url)]) {
    var oldPoints = parseInt(file.players[getParameterByName("who2", req.url)]);

    var newPoints = parseInt(getParameterByName("points", req.url)) + oldPoints;

    file.players[getParameterByName("who2", req.url)] = newPoints;

    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(file));
      console.log("writing to " + fileName);
    });
  } else {
    file.players[getParameterByName("who2", req.url)] = parseInt(
      getParameterByName("points", req.url)
    );
    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(file));
      console.log("writing to " + fileName);
    });
  }
  res.sendFile(path.join(__dirname + "/public/home.html"));
});

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

var server = app.listen(8000, function () {
  var port = server.address().port;
  console.log("Space Invaders listening at port %s", port);
});

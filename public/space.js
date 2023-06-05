import alienMovement from "./alienMovement.js";
import alienMovement2 from "./alienMovement2.js";
import Player from "./player.js";
import Player2 from "./player2.js";
import bulletMovement from "./bulletMovement.js";
import levelList from "./levels.json" assert { type: "json" };

var playerNumber = getParameterByName("players");
var playerNickname = prompt("Podaj swój nickname");
var playerNickname2;
if (playerNumber == 2)
  playerNickname2 = prompt("Podaj swój nickname drugi graczu");
var levelNumber = getParameterByName("level") - 1;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

var alienRows = levelList.levels[levelNumber].grid;

const playerBulletMove = new bulletMovement(canvas, "white");
const player2BulletMove = new bulletMovement(canvas, "red");
const alienMove = new alienMovement(canvas, playerBulletMove, alienRows);
const alienMove2 = new alienMovement2(
  canvas,
  playerBulletMove,
  player2BulletMove,
  alienRows
);
const player = new Player(canvas, 5, playerBulletMove);
const player2 = new Player2(canvas, 5, player2BulletMove, "./player2.png");
let isGameOver = false;
let didWin = false;

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function game() {
  checkGameOver();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    alienMove.draw(ctx);
    player.draw(ctx);
    playerBulletMove.draw(ctx);
  }
}
function game2() {
  checkGameOver2();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    alienMove2.draw(ctx);
    player.draw(ctx);
    player2.draw(ctx);
    playerBulletMove.draw(ctx);
    player2BulletMove.draw(ctx);
  }
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }
  // if(alienMove.collideWith(player)){
  //     isGameOver = true;
  // }
  if (alienMove.collideBottom()) {
    isGameOver = true;
  }
  if (alienMove.alienRows.length == 0) {
    didWin = true;
    isGameOver = true;
  }
}
function checkGameOver2() {
  if (isGameOver) {
    return;
  }
  // if(alienMove.collideWith(player)){
  //     isGameOver = true;
  // }
  if (alienMove2.collideBottom()) {
    isGameOver = true;
  }
  if (alienMove2.alienRows.length == 0) {
    didWin = true;
    isGameOver = true;
  }
}

function displayGameOver() {
  if (isGameOver) {
    let text = didWin ? "You Win" : "You Lose";
    let textOffset = didWin ? 3.5 : 3.8;
    let textColor = didWin ? "Gold" : "Red";
    ctx.fillStyle = textColor;
    ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    setTimeout(function () {
      if (didWin && playerNumber == 1) {
        window.location.replace(
          "http://localhost:8000/won?who=" +
            playerNickname +
            "&points=" +
            levelList.levels[levelNumber].alienCount
        );
      } else if (didWin && playerNumber == 2) {
        window.location.replace(
          "http://localhost:8000/twowinners?who=" +
            playerNickname +
            "&who2=" +
            playerNickname2 +
            "&points=" +
            levelList.levels[levelNumber].alienCount / 2
        );
      } else {
        window.location.replace("http://localhost:8000/");
      }
    }, 5000);
  }
}
if (playerNumber == 1) setInterval(game, 1000 / 60);
else if (playerNumber == 2) setInterval(game2, 1000 / 60);

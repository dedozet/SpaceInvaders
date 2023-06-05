var solo = document.getElementById("home_button1");
var multi = document.getElementById("home_button2");
var board = document.getElementById("home_button3");

solo.onclick = () => {
  window.location.replace("http://localhost:8000/mapselect?players=1");
};
multi.onclick = () => {
  window.location.replace("http://localhost:8000/mapselect.html?players=2");
};
board.onclick = () => {
  window.location.replace("http://localhost:8000/leaderboard.html");
};

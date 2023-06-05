function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var playerNumber = getParameterByName("players");

var backButton = document.getElementById("ms_backButton");
var level1 = document.getElementById("ms_button1");
var level2 = document.getElementById("ms_button2");
var level3 = document.getElementById("ms_button3");

level1.onclick = () => {
  window.location.replace(
    "http://localhost:8000/space?players=" + playerNumber + "&level=1"
  );
};
level2.onclick = () => {
  window.location.replace(
    "http://localhost:8000/space?players=" + playerNumber + "&level=2"
  );
};
level3.onclick = () => {
  window.location.replace(
    "http://localhost:8000/space?players=" + playerNumber + "&level=3"
  );
};
backButton.onclick = () => {
  window.location.replace("http://localhost:8000/");
};

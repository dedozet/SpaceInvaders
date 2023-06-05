import players from "./players.json" assert { type: "json" };

for (var i in players.players) {
  var row = `<tr> <td>${i}</td>  <td>${players.players[i]}</td> </tr>`;

  var table = $("#tableBody");

  table.append(row);
}

var backButton = document.getElementById("ld_button");

backButton.onclick = () => {
  window.location.replace("http://localhost:8000/");
};

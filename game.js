const playerNameInput = document.getElementById("player-name");
const leaderboardDiv = document.getElementById("leaderboard");
const leaderboardList = document.getElementById("leaderboard-list");
const clickSound = document.getElementById("click-sound");

let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function showLeaderboard() {
  playSound(clickSound);
  leaderboardDiv.classList.remove("hidden");
  leaderboardList.innerHTML = leaderboard
    .sort((a, b) => b.score - a.score)
    .map(l => `<li>${l.name} — ${l.score} pts (${l.game})</li>`)
    .join("");
}

function backToMenu() {
  leaderboardDiv.classList.add("hidden");
}

// Save name before redirect
document.querySelectorAll(".game-list a").forEach(link => {
  link.addEventListener("click", e => {
    const name = playerNameInput.value.trim();
    if (!name) {
      e.preventDefault();
      alert("Please enter your name first!");
      return;
    }
    localStorage.setItem("currentPlayer", name);
  });
});

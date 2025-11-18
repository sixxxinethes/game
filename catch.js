const playerName = localStorage.getItem("currentPlayer") || "Guest";
const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

const gameArea = document.getElementById("game-area");

let score = 0;
let timeLeft = 30;

// 🎵 Optional click sound (must exist in same folder)
function playSound(url) {
  const s = new Audio(url);
  s.play();
}

// 🧠 Create game header
const header = document.createElement("div");
header.className = "game-header";
header.innerHTML = `
  <div>🎮 ${playerName}</div>
  <div>⏰ Time: <span id="timeLeft">${timeLeft}</span>s</div>
  <div>⭐ Score: <span id="score">${score}</span></div>
`;
gameArea.appendChild(header);

// ⚽ Ball creation logic
function createBall() {
  const ball = document.createElement("div");
  ball.classList.add("ball");
  const size = Math.random() * 30 + 20;
  ball.style.width = `${size}px`;
  ball.style.height = `${size}px`;
  ball.style.left = `${Math.random() * (gameArea.clientWidth - size)}px`;
  ball.style.top = `${Math.random() * (gameArea.clientHeight - size - 50)}px`;

  ball.onclick = () => {
    playSound("../click.mp3");
    score += 10;
    document.getElementById("score").textContent = score;
    ball.remove();
  };

  gameArea.appendChild(ball);

  // Ball disappears after 1.5s
  setTimeout(() => {
    if (document.body.contains(ball)) ball.remove();
  }, 1500);
}

// ⏳ Countdown timer
function countdown() {
  timeLeft--;
  document.getElementById("timeLeft").textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(gameLoop);
    clearInterval(timerLoop);
    endGame();
  }
}

// 🕹️ Main game loop
function update() {
  createBall();
}

// 🏁 End game
function endGame() {
  alert(`🎯 Time’s up! Final Score: ${score}`);
  leaderboard.push({ name: playerName, game: "Catch The Ball", score });
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  window.close();
}

// ⏱️ Start everything
const gameLoop = setInterval(update, 700); // new ball every 700ms
const timerLoop = setInterval(countdown, 1000);

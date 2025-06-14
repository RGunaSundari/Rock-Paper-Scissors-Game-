let userScore = 0;
let compScore = 0;
const maxScore = 10;

const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("computer-score");
const status_div = document.getElementById("game-status");
const moveDetails_div = document.getElementById("move-details");

const choices = document.querySelectorAll(".choice");
const playerMove = document.getElementById("player-move");
const compMove = document.getElementById("computer-move");
const playerFace = document.getElementById("player-face");
const compFace = document.getElementById("computer-face");

let gameOver = false;

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * 3)];
}

function convertToEmoji(choice) {
  if (choice === "rock") return "🪨";
  if (choice === "paper") return "📄";
  if (choice === "scissors") return "✂️";
}

function updateFaces(result) {
  if (result === "win") {
    playerFace.textContent = "😄";
    compFace.textContent = "😢";
  } else if (result === "lose") {
    playerFace.textContent = "😢";
    compFace.textContent = "😄";
  } else {
    playerFace.textContent = "😐";
    compFace.textContent = "😐";
  }
}

function animateMoveIcons() {
  playerMove.classList.add("animate-attack");
  compMove.classList.add("animate-attack");
  setTimeout(() => {
    playerMove.classList.remove("animate-attack");
    compMove.classList.remove("animate-attack");
  }, 400);
}

function checkGameOver() {
  if (userScore >= maxScore) {
    status_div.textContent = "🏆 You won the match! 🎉";
    status_div.style.color = "#00FF99";
    gameOver = true;
  } else if (compScore >= maxScore) {
    status_div.textContent = "💀 Computer won the match!";
    status_div.style.color = "#FF6666";
    gameOver = true;
  }
}

function showResult(user, comp) {
  if (gameOver) return;

  playerMove.textContent = convertToEmoji(user);
  compMove.textContent = convertToEmoji(comp);
  animateMoveIcons();

  moveDetails_div.textContent = `You chose ${convertToEmoji(user)}, Computer chose ${convertToEmoji(comp)}.`;

  if (user === comp) {
    status_div.textContent = "It's a Draw! 🤝";
    status_div.style.color = "#FFD700";
    updateFaces("draw");
  } else if (
    (user === 'rock' && comp === 'scissors') ||
    (user === 'paper' && comp === 'rock') ||
    (user === 'scissors' && comp === 'paper')
  ) {
    userScore++;
    userScore_span.textContent = userScore;
    status_div.textContent = "You Win! 🎉";
    status_div.style.color = "#00FF99";
    updateFaces("win");
  } else {
    compScore++;
    compScore_span.textContent = compScore;
    status_div.textContent = "You Lose! 😢";
    status_div.style.color = "#FF6666";
    updateFaces("lose");
  }

  checkGameOver();
}

function game(userChoice) {
  if (gameOver) return;

  const compChoice = getComputerChoice();
  showResult(userChoice, compChoice);
}

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    game(choice.id);
  });
});

function resetGame() {
  userScore = 0;
  compScore = 0;
  gameOver = false;

  userScore_span.textContent = "0";
  compScore_span.textContent = "0";
  status_div.textContent = "Choose your move to start!";
  status_div.style.color = "#ffccff";
  moveDetails_div.textContent = "";
  playerMove.textContent = "❔";
  compMove.textContent = "❔";
  playerFace.textContent = "😐";
  compFace.textContent = "😐";
}

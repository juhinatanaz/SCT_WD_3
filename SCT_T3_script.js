const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

cells.forEach(cell => cell.addEventListener("click", handleCellClick));

function handleCellClick() {
  const index = this.dataset.index;
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  this.textContent = currentPlayer;
  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (gameActive) statusText.textContent = `🚀 Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      highlightWinner([a, b, c]);
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusText.textContent = "🤝 It's a Draw!";
    gameActive = false;
  }
}

function highlightWinner(cellsToHighlight) {
  cellsToHighlight.forEach(index => {
    cells[index].style.background = "rgba(0, 255, 247, 0.3)";
    cells[index].style.boxShadow = "0 0 15px #00fff7";
  });
}

function restartGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "🚀 Player X's turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.background = "rgba(255, 255, 255, 0.05)";
    cell.style.boxShadow = "none";
  });
}

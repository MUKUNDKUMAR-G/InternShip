document.addEventListener("DOMContentLoaded", () => {
  const ROWS = 6;
  const COLS = 7;
  let currentPlayer = "red";
  let gameBoard = createEmptyBoard();
  let moveHistory = [];
  let gameActive = true;
  let scores = {
    red: 0,
    yellow: 0,
  };
  let gameStartTime = new Date();
  let timerInterval;
  let winningCells = [];

  // DOM Elements
  const boardElement = document.getElementById("board");
  const boardContainer = document.getElementById("board-container");
  const currentPlayerElement = document.getElementById("current-player");
  const resetButton = document.getElementById("reset-btn");
  const undoButton = document.getElementById("undo-btn");
  const messageContainer = document.getElementById("message-container");
  const resultText = document.getElementById("result-text");
  const playAgainButton = document.getElementById("play-again-btn");
  const redScoreElement = document.getElementById("red-score");
  const yellowScoreElement = document.getElementById("yellow-score");
  const columnIndicators = document.querySelectorAll(".indicator");
  const gameTimerElement = document.getElementById("game-timer");
  const historyToggle = document.getElementById("history-toggle");
  const moveHistoryElement = document.getElementById("move-history");
  const moveListElement = document.getElementById("move-list");

  initializeBoard();
  startTimer();

  resetButton.addEventListener("click", resetGame);
  undoButton.addEventListener("click", undoMove);
  playAgainButton.addEventListener("click", resetGame);
  historyToggle.addEventListener("change", toggleMoveHistory);

  boardElement.addEventListener("mousemove", handleMouseMove);
  boardElement.addEventListener("mouseleave", () => {
    columnIndicators.forEach((indicator) =>
      indicator.classList.remove("active")
    );
  });

  function createEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  }

  function initializeBoard() {
    const columnsToRemove = document.querySelectorAll(".board .column");
    columnsToRemove.forEach((col) => col.remove());

    for (let col = 0; col < COLS; col++) {
      const column = document.createElement("div");
      column.className = "column";
      column.dataset.col = col;
      column.addEventListener("click", () => makeMove(col));

      for (let row = 0; row < ROWS; row++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.row = row;
        cell.dataset.col = col;
        column.appendChild(cell);
      }

      boardElement.appendChild(column);
    }

    updateUI();
  }

  function toggleMoveHistory() {
    if (historyToggle.checked) {
      moveHistoryElement.classList.add("show");
    } else {
      moveHistoryElement.classList.remove("show");
    }
  }

  function handleMouseMove(e) {
    if (!gameActive) return;

    columnIndicators.forEach((indicator) =>
      indicator.classList.remove("active")
    );

    const boardRect = boardElement.getBoundingClientRect();
    const boardWidth = boardRect.width;
    const columnWidth = boardWidth / COLS;
    const mouseX = e.clientX - boardRect.left;

    if (mouseX >= 0 && mouseX <= boardWidth) {
      const columnIndex = Math.floor(mouseX / columnWidth);
      if (columnIndex >= 0 && columnIndex < COLS) {
        columnIndicators[columnIndex].classList.add("active");
      }
    }
  }

  function startTimer() {
    gameStartTime = new Date();
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      const currentTime = new Date();
      const elapsedTime = Math.floor((currentTime - gameStartTime) / 1000);
      const minutes = Math.floor(elapsedTime / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (elapsedTime % 60).toString().padStart(2, "0");
      gameTimerElement.textContent = `${minutes}:${seconds}`;
    }, 1000);
  }

  function addMoveToHistory(player, col, row) {
    const move = {
      player,
      col,
      row,
      time: new Date(),
    };

    moveHistory.push(move);
    updateMoveHistoryUI();
  }

  function updateMoveHistoryUI() {
    moveListElement.innerHTML = "";

    moveHistory.forEach((move, index) => {
      const moveElement = document.createElement("div");
      moveElement.className = `move ${move.player}`;

      const moveTime = move.time;
      const minutes = moveTime.getMinutes().toString().padStart(2, "0");
      const seconds = moveTime.getSeconds().toString().padStart(2, "0");

      moveElement.innerHTML = `
        <span>Move ${index + 1}: Column ${move.col + 1}</span>
        <span>${
          move.player.charAt(0).toUpperCase() + move.player.slice(1)
        } (${minutes}:${seconds})</span>
      `;

      moveListElement.appendChild(moveElement);
    });

    moveListElement.scrollTop = moveListElement.scrollHeight;
  }

  function undoMove() {
    if (!gameActive || moveHistory.length === 0) return;

    const lastMove = moveHistory.pop();
    gameBoard[lastMove.row][lastMove.col] = null;

    // Switch back to previous player
    currentPlayer = lastMove.player === "red" ? "yellow" : "red";
    currentPlayerElement.textContent =
      currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
    currentPlayerElement.className = currentPlayer;

    updateUI();
    updateMoveHistoryUI();
  }

  function makeMove(col) {
    if (!gameActive) return;

    // Find the first empty cell in the column (from bottom up)
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!gameBoard[row][col]) {
        gameBoard[row][col] = currentPlayer;
        addMoveToHistory(currentPlayer, col, row);
        updateUI();

        const winResult = checkWin(row, col);
        if (winResult.win) {
          winningCells = winResult.cells;
          highlightWinningCells();
          createConfetti();

          setTimeout(() => {
            endGame(
              `${
                currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)
              } wins!`
            );
            scores[currentPlayer]++;
            updateScores();
          }, 500);

          return;
        }

        if (checkDraw()) {
          endGame("It's a draw!");
          return;
        }

        // Switch player
        currentPlayer = currentPlayer === "red" ? "yellow" : "red";
        currentPlayerElement.textContent =
          currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
        currentPlayerElement.className = currentPlayer;
        return;
      }
    }
  }

  function updateUI() {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cell = document.querySelector(
          `.cell[data-row="${row}"][data-col="${col}"]`
        );

        cell.className = "cell";

        if (gameBoard[row][col]) {
          cell.classList.add(gameBoard[row][col]);
        }
      }
    }
  }

  function checkWin(row, col) {
    const directions = [
      [0, 1],
      [1, 1],
      [1, -1],
    ];

    const player = gameBoard[row][col];

    for (const [dx, dy] of directions) {
      const cells = [];
      let count = 0;

      for (let i = -3; i <= 3; i++) {
        const newRow = row + i * dx;
        const newCol = col + i * dy;

        if (
          newRow >= 0 &&
          newRow < ROWS &&
          newCol >= 0 &&
          newCol < COLS &&
          gameBoard[newRow][newCol] === player
        ) {
          count++;
          cells.push({ row: newRow, col: newCol });

          if (count === 4) {
            return { win: true, cells: cells.slice(-4) };
          }
        } else {
          count = 0;
          cells.length = 0;
        }
      }
    }

    return { win: false, cells: [] };
  }

  function highlightWinningCells() {
    winningCells.forEach(({ row, col }) => {
      const cell = document.querySelector(
        `.cell[data-row="${row}"][data-col="${col}"]`
      );
      cell.classList.add("winning-cell");
    });
  }

  function checkDraw() {
    return gameBoard[0].every((cell) => cell !== null);
  }

  function updateScores() {
    redScoreElement.textContent = scores.red;
    yellowScoreElement.textContent = scores.yellow;
  }

  function endGame(message) {
    gameActive = false;
    clearInterval(timerInterval);

    resultText.textContent = message;
    messageContainer.classList.add("show");
  }

  function resetGame() {
    gameBoard = createEmptyBoard();
    gameActive = true;
    currentPlayer = "red";
    winningCells = [];
    moveHistory = [];

    currentPlayerElement.textContent = "Red";
    currentPlayerElement.className = "";
    messageContainer.classList.remove("show");

    updateUI();
    updateMoveHistoryUI();
    startTimer();
  }

  function createConfetti() {
    const colors = ["#e74c3c", "#f1c40f", "#3498db", "#2ecc71", "#9b59b6"];

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;

      document.body.appendChild(confetti);

      setTimeout(() => {
        document.body.removeChild(confetti);
      }, 5000);
    }
  }
});

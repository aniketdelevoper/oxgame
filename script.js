const board = document.getElementById("board");
const status = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
let currentPlayer = "X";
let gameBoard = Array(9).fill(null);

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return gameBoard.includes(null) ? null : "Draw";
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (!gameBoard[index]) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer === "X" ? "✖" : "⭕";
        event.target.classList.add("taken");
        event.target.classList.add(currentPlayer.toLowerCase());
        let winner = checkWinner();
        if (winner) {
            status.textContent = winner === "Draw" ? "It's a Draw!" : `Congratulations! Player ${winner} Wins!`;
            board.querySelectorAll(".cell").forEach(cell => cell.removeEventListener("click", handleClick));
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function resetGame() {
    gameBoard.fill(null);
    currentPlayer = "X";
    status.textContent = "Player X's Turn";
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }
}

restartButton.addEventListener("click", resetGame);
resetGame();

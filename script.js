const gameBoard = document.getElementById('gameBoard');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCell, index) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === "" || b === "" || c === "") continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    let roundDraw = !board.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = `It's a draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;

    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = "";
    });
}

gameBoard.addEventListener('click', (event) => {
    const clickedCell = event.target;
    const index = clickedCell.getAttribute('data-index');
    if (index !== null) {
        handleCellClick(clickedCell, parseInt(index));
    }
});

restartBtn.addEventListener('click', restartGame);

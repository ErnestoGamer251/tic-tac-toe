const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const setMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return {
        getBoard,
        setMark,
        resetBoard,
    };
})();

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;

    return {
        getName,
        getMark,
    };
};

const GameController = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;
    let isGameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWinner = () => {
        const board = Gameboard.getBoard();
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return currentPlayer.getName();
            }
        }

        return board.includes("") ? null : "Tie";
    };

    const playRound = (index) => {
        if (isGameOver || !Gameboard.setMark(index, currentPlayer.getMark())) {
            return;
        }

        const winner = checkWinner();
        if (winner) {
            isGameOver = true;
            setTimeout(() => alert(winner === "Tie" ? "It's a tie!" : `${winner} wins!`), 100);
        } else {
            switchPlayer();
        }
    };

    const resetGame = () => {
        Gameboard.resetBoard();
        currentPlayer = player1;
        isGameOver = false;
    };

    return {
        playRound,
        resetGame,
    };
})();

const DisplayController = (() => {
    const boardContainer = document.querySelector(".board");
    const cells = Array.from(boardContainer.querySelectorAll(".cell"));
    const resetButton = document.querySelector("#reset-button");

    const renderBoard = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    const addCellListeners = () => {
        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                GameController.playRound(index);
                renderBoard();
            });
        });
    };

    const addResetListener = () => {
        resetButton.addEventListener("click", () => {
            GameController.resetGame();
            renderBoard();
        });
    };

    const init = () => {
        renderBoard();
        addCellListeners();
        addResetListener();
    };

    return {
        init,
    };
})();

DisplayController.init();

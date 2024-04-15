const playerScoreTracker = () => {
    let playerScore = [0, 0];
    const player1Score = document.querySelector('#player1-score');
    const player2Score = document.querySelector('#player2-score');
    const updateScore = () => {
        player1Score.textContent = playerScore[0];
        player2Score.textContent = playerScore[1];
    };
    return { playerScore, updateScore };
}

const displayController = (() => {
    const renderMessage = (message) => {
        const messageElement = document.querySelector("#message");
        messageElement.textContent = message;
    }
    return { renderMessage };
})();

const Gameboard = (() => {
    let gameboard = ["", "", "",
        "", "", "",
        "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="text-8xl leading-[0.9] lg:text-9xl size-24 lg:size-36 border border-black shadow-outline text-center cursor-pointer select-none" id="square-${index}">${square}</div>`;
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;

        const squares = document.querySelectorAll('[id^="square-"]');
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick);
        });
    }

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }

    const getGameBoard = () => gameboard;

    return {
        render,
        update,
        getGameBoard
    }
})();

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;
    const { playerScore, updateScore } = playerScoreTracker();

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O"),
        ];

        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    }

    const handleClick = (event) => {
        if (gameOver) return;

        const index = parseInt(event.target.id.split("-")[1]);
        if (Gameboard.getGameBoard()[index] !== "") return;

        const modal = document.querySelector('#modal');
        Gameboard.update(index, players[currentPlayerIndex].mark);
        if (checkForWin(Gameboard.getGameBoard(), players[currentPlayerIndex].mark)) {
            gameOver = true;
            displayController.renderMessage(`${players[currentPlayerIndex].name} wins!`);
            playerScore[currentPlayerIndex]++;
            updateScore();
            modal.showModal();
            restart();
        } else if (checkForTie(Gameboard.getGameBoard())) {
            gameOver = true;
            displayController.renderMessage("It's a tie!");
            modal.showModal();
            restart();
        }

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

        function checkForTie(board) {
            return board.every(square => square !== "");
        }
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, "");
        }
        Gameboard.render();
        gameOver = false;
    }

    return {
        start,
        restart,
        handleClick
    }
})();

function checkForWin(board) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }

    return false;
}

function checkForTie(board) {
    return board.every((square) => square !== "");
}

const themeControllerFunction = () => {
    const themeController = document.querySelector('#theme-controller');
    themeController.addEventListener('click', () => {
        const htmlElement = document.querySelector('html');
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'lofi' ? 'black' : 'lofi';
        htmlElement.setAttribute('data-theme', newTheme);
    });
}
themeControllerFunction();

const startBtn = document.querySelector('#start-btn');
startBtn.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        startBtn.click();
    }
});

const restartButton = document.querySelector('#restart-btn');
restartButton.addEventListener("click", () => {
    Game.restart();
});

const createPlayer = (name, mark) => {
    return { name, mark };
}

startBtn.addEventListener("click", () => {
    Game.start();
});
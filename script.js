const startBtn = document.querySelector('#start-btn');

const Gameboard = (() => {
    let gameboard = ["", "", "",
        "", "", "",
        "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;

        const squares = document.querySelectorAll(".square");
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

    const start = () => {
        const player1Name = document.querySelector("#player1").value.trim() || "Player 1";
        const player2Name = document.querySelector("#player2").value.trim() || "Player 2";
        
        players = [
            createPlayer(player1Name, "X"),
            createPlayer(player2Name, "O"),
        ];

        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    }

    const handleClick = (event) => {
        const index = parseInt(event.target.id.split("-")[1]);
        if (Gameboard.getGameBoard()[index] !== "") return;

        Gameboard.update(index, players[currentPlayerIndex].mark);
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    return {
        start,
        handleClick
    }
})();

const createPlayer = (name, mark) => {
    return { name, mark };
}

startBtn.addEventListener("click", () => {
    Game.start();
});
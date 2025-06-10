'use strict'

const playerOneElement = document.querySelector(".player--1");
const playerZeroElement = document.querySelector(".player--0");
const scoreZeroElement = document.querySelector("#score--0");
const scoreOneElement = document.querySelector("#score--1");
const currentZeroElement = document.querySelector("#current--0");
const currentOneElement = document.querySelector("#current--1");
const diceElement = document.querySelector(".dice");
const btnNewGameElement = document.querySelector(".btn--new");
const btnHoldElement = document.querySelector(".btn--hold");
const btnRollElement = document.querySelector(".btn--roll");

scoreZeroElement.textContent = 0;
scoreOneElement.textContent = 0;
diceElement.classList.add("hidden");

let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    scoreZeroElement.textContent = 0;
    scoreOneElement.textContent = 0;
    currentZeroElement.textContent = 0;
    currentOneElement.textContent = 0;

    diceElement.classList.add("hidden");
    playerZeroElement.classList.remove("player--winner");
    playerOneElement.classList.remove("player--winner");
    playerZeroElement.classList.add("player--active");
    playerOneElement.classList.remove("player--active");
}

const switchPlayer = function () {
    activePlayerElement(activePlayer).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerZeroElement.classList.toggle("player--active");
    playerOneElement.classList.toggle("player--active");
    currentScore = 0;
}

init();

btnRollElement.addEventListener("click", rollHandler);
btnNewGameElement.addEventListener("click", newGameHandler);
btnHoldElement.addEventListener("click", holdHandler);

function rollHandler() {
    if (playing) {
        const diceNumber = Math.trunc(Math.random() * 6) + 1;
        diceElement.classList.remove("hidden");
        diceElement.src = `dice-${diceNumber}.png`;

        if (diceNumber !== 1) {
            currentScore += diceNumber;
            activePlayerElement(activePlayer).textContent = currentScore;

        } else {
            switchPlayer();
        }
    }
}

function holdHandler() {
    if (playing) {
        scores[activePlayer] += currentScore;
        activePlayerScoreElement(activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 20) {
            playing = false;
            diceElement.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");

        } else {
            switchPlayer();
        }
    }
}

function newGameHandler() {
    init();
}

const activePlayerElement = function (playerIndex) {
    return document.getElementById(`current--${playerIndex}`);
}

const activePlayerScoreElement = function (playerIndex) {
    return document.getElementById(`score--${playerIndex}`);
}

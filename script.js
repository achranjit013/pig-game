"use strict";

// selecting elements
const player0Elm = document.querySelector(".player--0");
const player1Elm = document.querySelector(".player--1");
const score0Elm = document.getElementById("score--0");
const score1Elm = document.getElementById("score--1");
const current0Elm = document.getElementById("current--0");
const current1Elm = document.getElementById("current--1");
const diceElm = document.querySelector(".dice");

const btnRollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");

// setting initial conditions
score0Elm.innerHTML = 0;
score1Elm.innerHTML = 0;
diceElm.classList.add("hidden");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// rolling dice functionality
btnRollDice.addEventListener("click", function () {
  // generating random dice number
  const randomDiceNumber = Math.trunc(Math.random() * 6 + 1);
  console.log("i clicked roll dice");
  console.log(typeof randomDiceNumber, randomDiceNumber);

  // display dice
  diceElm.classList.remove("hidden");
  diceElm.src = `dice-${randomDiceNumber}.png`;

  // check if rolled dice is 1 or not
  // if it's 1, switch player
  // else play continues
  if (randomDiceNumber !== 1) {
    // add dice to the current score
    currentScore += randomDiceNumber;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    // switch to next player
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0Elm.classList.toggle("player--active");
    player1Elm.classList.toggle("player--active");
  }
});

btnHold.addEventListener("click", () => {
  if (player0Elm.classList.contains("player--active")) {
    scores = [scores[0] + currentScore, scores[1]];
    score0Elm.innerHTML = scores[0];
  } else {
    scores = [scores[0], currentScore + scores[1]];
    score1Elm.innerHTML = scores[1];
  }
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Elm.classList.toggle("player--active");
  player1Elm.classList.toggle("player--active");
});

btnNewGame.addEventListener("click", () => {
  console.log("i clicked new game");
  score0Elm.innerHTML = 0;
  score1Elm.innerHTML = 0;
  current0Elm.textContent = 0;
  current1Elm.textContent = 0;
  diceElm.classList.add("hidden");
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  console.log(!player0Elm.classList.contains("player--active"));
  player0Elm.classList.add("player--active");
  player1Elm.classList.remove("player--active");
});

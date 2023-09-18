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

// variables
let scores, currentScore, activePlayer, playing;

// function to initiate initial state of the game
const initialState = () => {
  // setting initial conditions
  score0Elm.innerHTML = 0;
  score1Elm.innerHTML = 0;
  current0Elm.textContent = 0;
  current1Elm.textContent = 0;
  diceElm.classList.add("hidden");

  // setting initial values for the variables
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

// invoking the function to initiate initial state of the game
initialState();

// switch to next player
const switchPlayer = () => {
  // set current score to initial value (i.e. 0)
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Elm.classList.toggle("player--active");
  player1Elm.classList.toggle("player--active");
};

// rolling dice functionality
btnRollDice.addEventListener("click", function () {
  if (playing) {
    // generating random dice number
    const randomDiceNumber = Math.trunc(Math.random() * 6 + 1);

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
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    // add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;

      // removing active player status
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      // adding winning status
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      // removing dice image
      diceElm.classList.add("hidden");
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener("click", () => {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");

  player0Elm.classList.add("player--active");

  // invoking the function to initiate initial state of the game
  initialState();
});

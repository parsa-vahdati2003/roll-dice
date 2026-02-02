"use strict";

/////////////////////////////////////////////////////

//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

//btns
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// variables
let playing, currentScore, activePlayer, scores;

// starting condition and reseting:
const init = function () {
  //reseting
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

//now we call it
init();

// function switchplayer
const switchPlayer = function () {
  // set  textContent currentScore to 0
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  //who is player active and player--active class add it
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// btnRoll === Roll dice btn
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `img/dice-${dice}.png`;

    // 3. check for rolled 1
    if (dice !== 1) {
      // Add dice to current score

      currentScore += dice;
      // show textContet of currentScore in current--0 or current--1
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // when dice===1 then  Switch to next player
      switchPlayer();
    }
  }
});

//btnHold
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current  score to active player's score

    scores[activePlayer] += currentScore;
    // scores[1] = scores[1]+currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.check if player's score is >=50
    if (scores[activePlayer] >= 50) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // no one win so switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

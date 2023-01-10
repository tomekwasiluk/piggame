'use strict';

const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const diceElement = document.querySelector('.dice');
const currentScore0Element = document.querySelector('#current--0');
const currentScore1Element = document.querySelector('#current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

//Starting conditions
function resetElementsToStartValue() {
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceElement.classList.add('hidden');
  currentScore0Element.textContent = 0;
  currentScore1Element.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  player1Element.classList.remove('player--active');
  player0Element.classList.add('player--active');
}

function switchThePlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
}

resetElementsToStartValue();

//Rolling funcionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    let rollResult = Math.trunc(Math.random() * 6 + 1);
    //Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${rollResult}.png`;
    console.log(rollResult);

    //Check for rolled 1: if true, switch to next player
    if (rollResult == 1) {
      //switch the player
      switchThePlayer();
      console.log(`Now player ${activePlayer} turn`);
    } else {
      //check whitch player is actualy playing and add to a current score
      currentScore = currentScore + rollResult;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  //Add current score to active player
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
  }
  //Check if player's score is >= 100
  if (scores[activePlayer] >= 10) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    playing = false;
  } else {
    switchThePlayer();
  }
});

btnNew.addEventListener('click', function () {
  resetElementsToStartValue();
});

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer;
scores = [0, 0];
roundScore = 0;
activePlayer = 0;

//Hide dice on initial page load
document.querySelector(".dice").style.display = "none";

//Set all initial score to 0
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

//Next player game logic fucntion
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //Toggle and change players
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //Dice Styles when turn resets
  document.querySelector(".dice").style.display = "none";
}

//Eventlistener logic on the Roll Dice element
document.querySelector(".btn-roll").addEventListener("click", function() {
  var dice = Math.floor(Math.random() * 6) + 1;
  var diceDom = document.querySelector(".dice");
  diceDom.style.display = "block";
  diceDom.src = "dice-" + dice + ".png";
  if (dice !== 1) {
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    nextPlayer();
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  //Add CURRENT score to GLOBAL score
  scores[activePlayer] += roundScore;

  //Update the UI
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  //Check if PLAYER won the game
  if (scores[activePlayer] >= 10) {
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document.querySelector(".dice").style.display = "none";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("winner");
  } else {
    //Next Player logic
    nextPlayer();
  }
});

// dice = Math.floor(Math.random() * 6) + 1;

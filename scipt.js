"use strict";
const words = [
  "html",
  "css",
  "javascript",
  "marek",
  "mimi",
  "guliano",
  "blanca",
  "torben",
  "hilfehilfe",
  "teamfighttactics",
];
let word = "";
let hiddenword = "";
//New Game clicken dann wird das neue word ausgewählt
const NewGame = document.querySelector("#btn-newGame");
const letter = document.querySelector("#button-grid");
const PguessWord = document.querySelector("#word");
const failtext = document.querySelector("#fails");
const gameState = document.querySelector("#game-state");
let fails = 0;

NewGame.addEventListener("click", startNewGame);
letter.addEventListener("click", letterclick);
startNewGame();
function startNewGame() {
  word = words[getRandomInt(9)];
  hiddenword = "_ ".repeat(word.length);
  console.log(word);
  fails = 0;
  renderWord("");
  for (let i = 1; i <= 26; i++) {
    document.querySelector("#btn" + i).disabled = false;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function letterclick(event) {
  renderWord(event.target.innerText);
  event.target.disabled = true;
}

function renderWord(letter) {
  if (fails === 10) {
    PguessWord.innerText = "Game Over";
    return;
  }
  if (letter === "") {
    PguessWord.innerText = hiddenword;
    failtext.innerText = "FAILS:0/10";
    gameState.innerText = "ACTIVE";
  } else {
    const hiddenarr = hiddenword.split(" ");
    for (let i = 0; i < word.length; i++) {
      if (letter === word[i]) {
        hiddenarr[i] = letter;
      }
    }
    if (word.indexOf(letter) === -1) {
      fails++;
    }
    hiddenword = hiddenarr.join(" ");
    PguessWord.innerText = hiddenword;
    failtext.innerText = "FAILS:" + fails + "/10";
    check(hiddenarr.join(""));
  }
}
function check(checkword) {
  if (fails === 10) {
    gameState.innerText = "Game Over";
    for (let i = 1; i <= 26; i++) {
      document.querySelector("#btn" + i).disabled = true;
    }
  }
  if (word === checkword) {
    gameState.innerText = "Winner";
    for (let i = 1; i <= 26; i++) {
      document.querySelector("#btn" + i).disabled = true;
    }
  }
}

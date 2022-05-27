//
// Getting all the HTML elements
//
const homePage = document.querySelector(".homepage");
const gamePage = document.querySelector(".gamepage");

const playButton = document.getElementById("playButton");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");

const winMessage = document.querySelector("#win-message");
const loseMessage = document.querySelector("#lose-message");

// Sounds
const backgroundMusic = document.getElementById('background-music')
const shootingSound = document.getElementById('shoot-sound')
const explosionSound = document.getElementById('explosion-sound')
const invaderKilledSound = document.getElementById('invader-sound')


// Declaring my game to check later if a game is already on
let myNewGame = null

// Event listener on play button to start a game and make the HTML/CSS transition
playButton.addEventListener("click", () => {
  if (myNewGame) {return}
  homePage.classList.add("transform-left");
  gamePage.classList.add("transform-fade");

  gamePage.style.display = "flex";
  gamePage.style.visibility = "visible";

  myNewGame = new Game();
});

const homePage = document.querySelector("#homepage");
const gamePage = document.querySelector("#gamepage");

const playButton = document.getElementById("playButton");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
// const homepageButton = document.querySelector("#homepage-button");

const winMessage = document.querySelector("#win-message");
const loseMessage = document.querySelector("#lose-message");

let myNewGame = null;

playButton.addEventListener("click", () => {
  gamePage.style.display = "flex";
  homePage.style.display = "none";
  myNewGame = new Game();
  console.log(myNewGame);
  console.log("myNewGame.match", myNewGame.match);
});

// homepageButton.addEventListener("click", () => {
//   myNewGame.match = null;
//   myNewGame = null;
//   console.log(myNewGame);
//   gamePage.style.display = "none";
//   homePage.style.display = "flex";
// });

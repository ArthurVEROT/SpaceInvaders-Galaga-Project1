const homePage = document.querySelector(".homepage");
const gamePage = document.querySelector(".gamepage");

const playButton = document.getElementById("playButton");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");

const winMessage = document.querySelector("#win-message");
const loseMessage = document.querySelector("#lose-message");

const myNewGame = null

playButton.addEventListener("click", () => {
  if (myNewGame) {return}
  homePage.classList.add("transform-left");
  gamePage.classList.add("transform-fade");

  gamePage.style.display = "flex";
  gamePage.style.visibility = "visible";

  myNewGame = new Game();
});

// homepageButton.addEventListener("click", () => {
//   myNewGame.match = null;
//   myNewGame = null;
//   console.log(myNewGame);
//   gamePage.style.display = "none";
//   homePage.style.display = "flex";
// });

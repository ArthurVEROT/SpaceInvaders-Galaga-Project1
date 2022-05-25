
const homePage = document.querySelector('#homepage')
const gamePage = document.querySelector('#gamepage')
const playButton = document.querySelector('#playButton')
const winMessage = document.querySelector('#win-message')
const loseMessage = document.querySelector('#lose-message')

playButton.addEventListener('click', () => {
  gamePage.style.display = 'flex'
  homePage.style.display = 'none'
  const myNewGame = new Game();
})
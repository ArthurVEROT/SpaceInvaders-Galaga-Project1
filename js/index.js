
const homePage = document.querySelector('#homepage')
const gamePage = document.querySelector('#gamepage')
const playButton = document.querySelector('#playButton')

playButton.addEventListener('click', () => {
  gamePage.style.display = 'flex'
  homePage.style.display = 'none'
  const myNewGame = new Game();
})
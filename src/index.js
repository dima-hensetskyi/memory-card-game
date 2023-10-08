import { currentModal } from './modal.js'
import { MatchGrid } from './matchGrid.js'
import './animation.js'

import '../style.css'

const app = document.getElementById('app')
const controlsContainer = document.getElementById('controls-container')

const startButton = document.getElementById('start')
const startNewGameButton = document.getElementById('start-new-game')
const restartButton = document.getElementById('restart')
const stopButton = document.getElementById('stop')
const columns = document.getElementById('columns')
const rows = document.getElementById('rows')
const timeLimit = document.getElementById('timeLimit')
const promoHero = document.getElementById('promo-hero')
const themeGroup = document.getElementsByName('theme')

let currentMathGrid = null

// Start game
startButton.addEventListener('click', () => {
  app.classList.remove('hide')
  controlsContainer.classList.add('hide')
  promoHero.classList.add('hide')

  const timeLimitValue =
    Number(timeLimit.value) !== 0
      ? { minutes: timeLimit.value, seconds: 1 }
      : null

  if (currentMathGrid) {
    currentMathGrid.restartGame({
      columnsNumber: columns.value,
      rowsNumber: rows.value,
      timeLimit: timeLimitValue
    })
  } else {
    currentMathGrid = new MatchGrid({
      columnsNumber: columns.value,
      rowsNumber: rows.value,
      timeLimit: timeLimitValue
    })
  }
})

// Restart game
restartButton.addEventListener('click', () => {
  currentMathGrid?.restartGame()
})

// Stop game

const stopGame = () => {
  if (currentMathGrid) {
    currentMathGrid.removeEventListeners()
    currentMathGrid.statsContainer.resetToInitialState()
    currentMathGrid.statsContainer.clearTimers()
  }
  app.classList.add('hide')
  controlsContainer.classList.remove('hide')
  promoHero.classList.remove('hide')
}

stopButton.addEventListener('click', stopGame)

startNewGameButton.addEventListener('click', () => {
  currentModal.isOpen = false
  stopGame()
})

// Palette
themeGroup.forEach((radio) => {
  radio.addEventListener('change', function () {
    if (this.checked) {
      const primaryElement = this.nextElementSibling.querySelector(
        '[data-name="primary"]'
      )

      const secondaryElement = this.nextElementSibling.querySelector(
        '[data-name="secondary"]'
      )

      const regularElement = this.nextElementSibling.querySelector(
        '[data-name="regular"]'
      )

      document.documentElement.style.setProperty(
        '--primary',
        getComputedStyle(primaryElement).getPropertyValue('background-color')
      )

      document.documentElement.style.setProperty(
        '--secondary',
        getComputedStyle(secondaryElement).getPropertyValue('background-color')
      )

      document.documentElement.style.setProperty(
        '--regular',
        getComputedStyle(regularElement).getPropertyValue('background-color')
      )
    }
  })
})

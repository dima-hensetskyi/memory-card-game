import { Card } from './card.js'
import { StatsContainer } from './statsContainer.js'
import { currentModal } from './modal.js'

const gameContainer = document.querySelector('.game-container')
const app = document.getElementById('app')

class MatchGrid {
  constructor ({ columnsNumber, rowsNumber, timeLimit }) {
    this.rowsNumber = rowsNumber
    this.columnsNumber = columnsNumber
    this.timeLimit = timeLimit

    this.winCount = 0
    this.activeCardListIdx = null
    this.statsContainer = new StatsContainer(timeLimit, this.endGame)

    this.createGrid(rowsNumber, columnsNumber)
  }

  set activeCard (listIdx) {
    if (!this.activeCardListIdx) {
      this.activeCardListIdx = listIdx
    } else if (this.activeCardListIdx !== listIdx) {
      this.compareCards(this.activeCardListIdx, listIdx)
      this.activeCardListIdx = null
    }
  }

  endGame = (isUserWon) => {
    currentModal.isOpen = {
      val: true,
      description: `<div>Moves: ${this.statsContainer.movesCount}</div>
            <div>Time: ${this.statsContainer.getTime}</div>`,
      isUserWon
    }
    this.removeEventListeners()
    this.statsContainer.clearTimers()
  }

  compareCards (firstListIdx, secondListIdx) {
    this.statsContainer.movesCount += 1

    if (this._cells[firstListIdx].idx === this._cells[secondListIdx].idx) {
      this._cells[firstListIdx].matched = true
      this._cells[secondListIdx].matched = true
      this.winCount += 1

      if (this.winCount === this._cells.length / 2) {
        this.endGame(true)
      }
    } else {
      setTimeout(() => {
        this._cells[firstListIdx].flipped = false
        this._cells[secondListIdx].flipped = false
      }, 600)
    }
  }

  handleClick = (evt) => {
    const listIdx = evt.target.parentNode.getAttribute('data-cell-idx')
    const isFlipped = evt.target.parentNode.classList.contains('card-flipped')
    if (listIdx && !isFlipped) {
      this._cells[listIdx].flipped = true
      this.activeCard = listIdx
    }
  }

  handleLeave = () => {
    app.classList.add('wrapper--on-pause')
    this.statsContainer.clearTimers()
  }

  handleMouseEnter = () => {
    app.classList.remove('wrapper--on-pause')
    this.statsContainer.startTimers()
  }

  addEventListeners = () => {
    gameContainer.addEventListener('click', this.handleClick)
    window.addEventListener('blur', this.handleLeave)
    window.addEventListener('focus', this.handleMouseEnter)
  }

  removeEventListeners = () => {
    gameContainer.removeEventListener('click', this.handleClick)
    window.removeEventListener('blur', this.handleLeave)
    window.removeEventListener('focus', this.handleMouseEnter)
  }

  restartGame = (args) => {
    this.removeEventListeners()
    if (args?.rowsNumber && args?.columnsNumber) {
      this.rowsNumber = args.rowsNumber
      this.columnsNumber = args.columnsNumber
    }

    this.createGrid(
      args?.rowsNumber || this.rowsNumber,
      args?.columnsNumber || this.columnsNumber
    )

    if (args?.timeLimit !== undefined) {
      this.statsContainer.initialTimeLimit = args.timeLimit
    }
    this.statsContainer.resetToInitialState()
    this.winCount = 0
    this.activeCardListIdx = null
  }

  createGrid = (rowsNumber, columnsNumber) => {
    gameContainer.innerHTML = ''
    gameContainer.style.gridTemplateRows = `repeat(${rowsNumber}, 1fr)`
    gameContainer.style.gridTemplateColumns = `repeat(${columnsNumber}, 1fr)`

    const ids = [...Array(Math.floor((rowsNumber * columnsNumber) / 2)).keys()]

    const cellIds = [...ids, ...ids]

    const cells = Array.from({ length: cellIds.length }, (_, idx) => {
      const randomIdx = Math.floor(Math.random() * cellIds.length)

      const cardNode = document.createElement('div')
      const card = new Card(cellIds[randomIdx] + 1, idx, cardNode)

      gameContainer.appendChild(card.generate())
      cellIds.splice(randomIdx, 1)
      return card
    })

    this._cells = cells
    this.statsContainer.renderMovesCount()
    this.statsContainer.startTimers()
    this.addEventListeners()
  }
}

export { MatchGrid }

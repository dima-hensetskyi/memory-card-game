const moves = document.getElementById('moves-count')
const timeLimit = document.getElementById('time-remaining')
const timeValue = document.getElementById('time')

class StatsContainer {
  constructor (timeLimit, onTimeUp) {
    this.time = { seconds: -1, minutes: 0 }
    this.timeLimit = timeLimit
    this.initialTimeLimit = timeLimit
    this.movesCount = 0
    this.onTimeUp = onTimeUp
    this.renderTime()
  }

  get movesCount () {
    return this.currentMovesCount
  }

  get getTime () {
    return this.formatTime(this.time)
  }

  set initialTimeLimit (val) {
    this.initialLimit = val
  }

  set movesCount (num) {
    this.currentMovesCount = num
    this.renderMovesCount()
  }

  formatTime = (time) => {
    const { minutes, seconds } = time
    const secondsValue = seconds < 10 ? `0${seconds}` : seconds
    const minutesValue = minutes < 10 ? `0${minutes}` : minutes
    return `${minutesValue}:${secondsValue}`
  }

  startTimers = () => {
    if (!this.interval) this.interval = setInterval(this.renderTime, 1000)
  }

  clearTimers = () => {
    clearInterval(this.interval)
    this.interval = null
  }

  renderMovesCount = () => {
    moves.innerHTML = `<span>Moves:</span>${this.currentMovesCount}`
  }

  renderTime = () => {
    this.time = { ...this.time, seconds: this.time.seconds + 1 }
    if (this.timeLimit) {
      this.timeLimit = {
        ...this.timeLimit,
        seconds: this.timeLimit.seconds - 1
      }
    }

    // minutes logic
    if (this.time.seconds >= 60) {
      this.time = { seconds: 0, minutes: this.time.minutes + 1 }
    }

    if (this.timeLimit && this.timeLimit.seconds < 0) {
      if (this.timeLimit.minutes - 1 < 0) {
        this.onTimeUp(false)
        return
      }
      this.timeLimit = {
        minutes: Math.max(this.timeLimit.minutes - 1, 0),
        seconds: 59
      }
    }

    // format time before displaying
    const time = this.formatTime(this.time)
    timeValue.innerHTML = `<span>Time:</span>${time}`

    if (this.timeLimit) {
      const timeLimitValue = this.formatTime(this.timeLimit)
      timeLimit.innerHTML = `<span>Time Remaining:</span>${timeLimitValue}`
    } else {
      timeLimit.innerHTML = ''
    }
  }

  resetToInitialState = () => {
    this.clearTimers()
    this.timeLimit = this.initialLimit
    this.interval = null
    this.time = { seconds: -1, minutes: 0 }
    this.renderTime()
    this.movesCount = 0
    this.startTimers()
  }
}

export { StatsContainer }

class Timer {
  timer = null
  isPause = true
  time = 0

  constructor(time = 0) {
    this.time = time
    this.display = document.querySelector("#display")
  }

  set setTime(time) {
    this.time = time
  }

  get getTime() {
    return this.time
  }

  isPaused() {
    return this.isPause
  }

  newTime() {
    this.time += 1000
    this.updateDisplay()
  }

  pause() {
    clearInterval(this.timer)
    this.isPause = true
  }

  play() {
    this.timer = setInterval(() => {
      this.newTime()
    }, 1000)
    this.isPause = false
  }

  resume() {
    this.play()
  }

  stop() {
    clearInterval(this.timer)
    this.timer = null
    this.time = 0
    this.isPause = true
    this.updateDisplay()
  }

  updateDisplay() {
    this.display.innerText = this.coventTime(this.time)
  }

  coventTime(s) {
    function pad(n, z) {
      z = z || 2
      return ("00" + n).slice(-z)
    }

    var ms = s % 1000
    s = (s - ms) / 1000
    var secs = s % 60
    s = (s - secs) / 60
    var mins = s % 60
    var hrs = (s - mins) / 60

    return pad(hrs) + ":" + pad(mins) + ":" + pad(secs)
  }
}

export default Timer

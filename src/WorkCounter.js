import Timer from "./Timer.js"
import History from "./Hitory.js"

class WorkCounter {

  state = 'finished'

  constructor(){
    this.timer = new Timer()
    this.history = new History()
  }

  isWorking(){
    const states = {
      'working': true,
      'break': false,
      'finished': false
    }

    return states[this.state]
  }

  getState(){
    return this.state
  }

  startToWork(){
    this.timer.play()
    this.history.newRegister()
    this.state = 'working'
  }

  toggleBreak(){
    if(this.timer.isPaused()){
      this.timer.resume()
    this.state = 'working'
    }
    else {
      this.timer.pause()
      this.state = 'break'
    }
  }

  stopToWork(str){
    this.history.saveRegister(this.timer.time, str)
    this.timer.stop()
    this.state = 'finished'
  }
}

export default WorkCounter

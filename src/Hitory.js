import moment from "moment"
import Item from "./Item.js"

class History {

  constructor(){
    this.History = []
    this.current = null
  }

  getRegister(){
    return this.History
  }

  setRegister(list){
    this.History = list.map(i => new Item(i.time, i.date))
  }

  newRegister(){
    this.current = new Item()
  }

  saveRegister(time){
    this.current.setTime(time)
    if(this.current !== null) this.History.push(this.current)
    this.current = null
    console.log(this.History)
  }
}

export default History

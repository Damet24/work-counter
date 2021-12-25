import moment from 'moment'

class Item {

  constructor(time = 0, date = ''){
    this.date = moment(date)
    this.time = time
  }

  getDate(){
    return this.date.format('LLL')
  }

  setTime(time){
    this.time = time
  }

  getTime(){
    return this.time
  }
}

export default Item

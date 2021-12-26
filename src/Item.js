import moment from 'moment'

class Item {

  constructor(time = 0, date = ''){
    this.date = date === '' ? moment() : moment(date)
    this.time = time
  }

  getDate(){
    return this.date.format('LTS')
  }

  setTime(time){
    this.time = time
  }

  getTime(){
    return this.time
  }
}

export default Item

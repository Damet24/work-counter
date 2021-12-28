import moment from 'moment'

class Item {

  title = ''

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

  setTitle(str){
    this.title = str
  }

  getTitle(){
    return this.title
  }
}

export default Item

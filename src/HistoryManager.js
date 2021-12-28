class HistoryManager {
  constructor() {
    this.display = document.querySelector("#historydisplay")
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

  updateHistory(list) {
    const template = (info) => `<div class="item">
      <span>Time: ${this.coventTime(info.getTime())}</span>
      <span>info: ${info.getTitle()}</span>
      <span>Date: ${info.getDate()}</span>
    </div>`
    let html = ""

    list.forEach((item) => {
      html += template(item)
    })

    this.display.innerHTML = html
  }
}

export default HistoryManager

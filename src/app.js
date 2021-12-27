import WorkCounter from "./WorkCounter.js"
import HistoryManager from "./HistoryManager.js"
import { saveAs } from "file-saver"

const workCounter = new WorkCounter()
const historyManager = new HistoryManager()
const toggle = document.querySelector("#toggle")
const stop = document.querySelector("#stop")
const save = document.querySelector("#save")
const load = document.querySelector("#load")
const file = document.querySelector("#file")
const modal = document.querySelector('.modal')

toggle.addEventListener("click", (e) => {
  switch (workCounter.getState()) {
    case "working":
    case "break":
      if (workCounter.getState() === "working")
        toggle.innerText = "Continue working"
      else toggle.innerText = "Break"
      workCounter.toggleBreak()
      break

    case "finished":
      workCounter.startToWork()
      e.target.innerText = "Break"
      stop.disabled = false
      save.disabled = true
      break
  }
})

stop.addEventListener("click", (e) => {
  modal.classList.toggle('active')
  workCounter.stopToWork()
  e.target.disabled = true
  save.disabled = false
  historyManager.updateHistory(workCounter.history.getRegister())
  toggle.innerText = "Start to work"
})

save.addEventListener("click", () => {
  let h = workCounter.history.getRegister()

  const blob = new Blob([JSON.stringify(h)], {
    type: "text/plain;charset=utf-8",
  })
  saveAs(blob, "history.txt")
})

load.addEventListener("click", () => {
  file.click()
})

file.onchange = function () {
  var fr = new FileReader()
  fr.onload = function () {
    workCounter.history.setRegister(JSON.parse(fr.result))
    historyManager.updateHistory(workCounter.history.getRegister())
  }

  fr.readAsText(this.files[0])
}

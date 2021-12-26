import WorkCounter from "./WorkCounter.js"
import HistoryManager from "./HistoryManager.js"

const workCounter = new WorkCounter()
const historyManager = new HistoryManager()
const toggle = document.querySelector("#toggle")
const stop = document.querySelector("#stop")
const save = document.querySelector("#save")
const load = document.querySelector("#load")
const file = document.querySelector("#file")

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
  workCounter.stopToWork()
  e.target.disabled = true
  save.disabled = false
  historyManager.updateHistory(workCounter.history.getRegister())
  toggle.innerText = "Start to work"
})

import { saveAs } from "file-saver"

save.addEventListener("click", (e) => {
  let h = workCounter.history.getRegister()

  const blob = new Blob([JSON.stringify(h)], {
    type: "text/plain;charset=utf-8",
  })
  saveAs(blob, "history.txt")
})

load.addEventListener("click", (e) => {
  file.click()
})

file.onchange = function (event) {
  var fr = new FileReader()
  fr.onload = function () {
    workCounter.history.setRegister(JSON.parse(fr.result))
    historyManager.updateHistory(workCounter.history.getRegister())
  }

  fr.readAsText(this.files[0])
}

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
const form = document.querySelector('#form')

function onToggleClick(e) {
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
}

function onStopClick(e) {
  modal.classList.toggle('active')
  workCounter.stopToWork()
  e.target.disabled = true
  save.disabled = false
  historyManager.updateHistory(workCounter.history.getRegister())
  toggle.innerText = "Start to work"
}

function onSaveClick() {
  let h = workCounter.history.getRegister()

  const blob = new Blob([JSON.stringify(h)], {
    type: "text/plain;charset=utf-8",
  })
  saveAs(blob, "history.txt")
}

function onLoadClick() {
  file.click()
}

function onChangeFile() {
  var fr = new FileReader()
  fr.onload = function () {
    workCounter.history.setRegister(JSON.parse(fr.result))
    historyManager.updateHistory(workCounter.history.getRegister())
  }

  fr.readAsText(this.files[0])
}

function onFormSubmit(e) {
  e.preventDefault()
  console.log('prevenio papa')
}

toggle.addEventListener("click", onToggleClick)
stop.addEventListener("click", onStopClick)
save.addEventListener("click", onSaveClick)
load.addEventListener("click", onLoadClick)
file.addEventListener('change', onChangeFile)
form.addEventListener('submit', onFormSubmit)

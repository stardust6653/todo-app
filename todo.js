const toDoForm = document.querySelector('#todoForm')
const toDoInput = document.querySelector('.todoInput')
const toDoList = document.querySelector('.todoList')
const deleteBtn = document.querySelector('.deleteBtn')

const date = new Date()
const hours = String(date.getHours()).padStart(2, '0')
const minutes = String(date.getMinutes()).padStart(2, '0')
const seconds = String(date.getSeconds()).padStart(2, '0')
const nowTime = `${hours}:${minutes}`

let toDoArray = []

function saveToDos() {
  localStorage.setItem('todos', JSON.stringify(toDoArray))
}

function deleteTodo(event) {
  const li = event.target.parentElement
  li.remove()
  toDoArray = toDoArray.filter((toDo) => toDo.id !== parseInt(li.id))
  console.log(toDoArray)
  saveToDos()
}

function createTodo(toDoObj) {
  const li = document.createElement('li')
  li.classList.add('todoItem')
  li.id = toDoObj.id

  const addCheckBox = document.createElement('input')
  addCheckBox.setAttribute('type', 'checkbox')
  addCheckBox.classList.add('todoCheck')

  const addTodo = document.createElement('p')
  addTodo.textContent = toDoObj.text

  const addInputTime = document.createElement('span')
  addInputTime.classList.add('inputTime')
  addInputTime.textContent = nowTime

  const addDeleteBtn = document.createElement('span')
  addDeleteBtn.classList.add('deleteBtn')
  addDeleteBtn.textContent = '🗑'

  li.appendChild(addCheckBox)
  li.appendChild(addTodo)
  li.appendChild(addInputTime)
  li.appendChild(addDeleteBtn)
  toDoList.appendChild(li)

  addDeleteBtn.addEventListener('click', deleteTodo)
}

function submitTodo(event) {
  event.preventDefault()
  const todoValue = toDoInput.value
  toDoInput.value = ''
  const toDoObj = {
    text: todoValue,
    id: Date.now(),
  }
  toDoArray.push(toDoObj)
  createTodo(toDoObj)
  saveToDos()
}

toDoForm.addEventListener('submit', submitTodo)

const savedToDos = localStorage.getItem('todos')

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos)
  toDoArray = parsedToDos

  parsedToDos.forEach(createTodo)
}

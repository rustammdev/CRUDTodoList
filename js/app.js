const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')

/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')


let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []

if (todos.length) showTodos();

// setTodos to localstorage
function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos))
}

// time
function getTime() {
    const now = new Date()

    let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    let month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth()
    let year = now.getFullYear()
    let hour = now.getHours()

    console.log(date, month, year);
}
getTime();

// show todos
function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML = ''; 
    
    todos.forEach((item, i) => {
        listGroupTodo.innerHTML += `
        <li class="list-group-item d-flex justify-content-between">
            ${item.text}
            <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
            <img src="./img/edit.svg" alt="edit icon" width="25" height="25">
            <img src="./img/delete.svg" alt="delete icon" width="25" height="25">
            </div>
        </li>
        `
    })
}

// show error
function showMessage(where, message) {
    document.getElementById(`${where}`).textContent = message

    setTimeout(() => {
        document.getElementById(`${where}`).textContent = '';
    }, 2500);
}

formCreate.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const todoText = formCreate['input-create'].value.trim()
    
    if (todoText.length) {
        todos.push({text : todoText, time : '22:24, 03.01.2024', complate : false})
        setTodos();
        showTodos();
    }else{
        showMessage('message-create', 'Please, enter some text...');
    }   
    formCreate.reset()
})

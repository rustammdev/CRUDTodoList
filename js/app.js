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

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']

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

    let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    let sekund = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()

    let month_title = now.getMonth()
    fullDay.textContent = `${date} ${months[month_title]}, ${year}`
    
    hourEl.textContent = hour
    minuteEl.textContent = minute
    secondEl.textContent = sekund

    return `${hour}:${minute} ${date}.${month}.${year}`
}
setInterval(() => {
    getTime();
}, 1000);


// show todos
function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML = ''; 
    
    todos.forEach((item, i) => {
        listGroupTodo.innerHTML += `
        <li ondblclick="setCompeted(${i})" class="list-group-item d-flex justify-content-between ${item.complate == true ? 'complated' : ''}">
            ${item.text}
            <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
            <img src="./img/edit.svg" alt="edit icon" width="25" height="25" onclick="editTode(${i})">
            <img src="./img/delete.svg" onclick="deleteTode(${i})" alt="delete icon" width="25" height="25">
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
        todos.push({text : todoText, time : getTime(), complate : false})
        setTodos();
        showTodos();
    }else{
        showMessage('message-create', 'Please, enter some text...');
    }   
    formCreate.reset()
})

// delete todo
function deleteTode(id){
    const deleteTodos = todos.filter((item, i) => {
        return i !== id
    })

    todos = deleteTodos
    setTodos()
    showTodos()
}

// setComplated
function setCompeted(id) {
    const complateTodo = todos.map((item, i) => {
        if (id == i) {
            return {...item, complate :  !item.complate }
        }else {
            return {...item }
        }
    }) 

    todos = complateTodo
    setTodos()
    showTodos()
    console.log('bosdi');
}

// edit form
formEdit.addEventListener('submit', (e) => {
    e.preventDefault()
    const todoText = formEdit['input-edit'].value.trim()
    
    formEdit.reset()
    if (todoText.length) {
        todos.splice(editItemId, 1, {text : todoText, time : getTime(), complate : false})
        setTodos();
        showTodos();
        close()
    }else{
        showMessage('message-edit', 'Please, enter some text...');
    }   
})

// edit todo
let editItemId = null
function editTode(id) {
    open()
    editItemId = id
}

function open() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
function close() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')  
}

// close modal
overlay.addEventListener('click', close)
closeEl.addEventListener('click', close)
document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') close () 
})

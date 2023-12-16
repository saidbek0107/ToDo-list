const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')


const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')

let editItem

/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')

// check
let todos = JSON.parse(localStorage.getItem('list'))
    ? JSON.parse(localStorage.getItem('list'))
    : []

if (todos.length) showTodos()



// setTodos to localstorage
function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos))
}


// show todos
function showTodos() {
    localStorage.setItem('list', JSON.stringify(todos))
    listGroupTodo.innerHTML = ''

    todos.forEach((item, i) => {
        listGroupTodo.innerHTML +=
            `
<li ondblclick = "setCompleted(${i})" style = "align-items:center"  class="list-group-item d-flex 
 ${item.completed == true ? 'completed' : ''}  justify-content-between ">

        ${item.text}
    <div style = "align-items:center; display:flex; " class="todo-icons">
        <i onclick = (editTodo(${i}))  style = "color:blue; font-size:25px" class="ri-edit-2-line"></i>
        <i onclick = (deleteTodo(${i}))  style = "color:red;  font-size:22px" class="ri-delete-bin-6-line"></i>
    </div>
</li>
 `
    })


}


// showError 
function showMessage(where, message) {
    document.getElementById(`${where}`).textContent = message

    setTimeout(() => {
        document.getElementById(`${where}`).textContent = ''
    }, 1800)

}

/*<li class="list-group-item d-flex justify-content-between">
    Hello world
    <div class="todo-icons">
        <span class="opacity-50 me-2">16.12.2023</span>
        <i class="ri-edit-2-line"></i>
        <i class="ri-delete-bin-6-line"></i>
    </div>
</li>
*/


// get todos
formCreate.addEventListener('submit', (e) => {
    e.preventDefault()

    const todoText = formCreate['input-create'].value.trim()
    formCreate.reset()
    if (todoText.length) {
        todos.push({
            text: todoText, time: '16.12.2023', completed:
                false
        })
        setTodos()
        showTodos()
    } else {
        showMessage('message-create', "Please, enter some text . . .")
    }

})


// delete todo

function deleteTodo(id) {
    const deletedTodos = todos.filter((item, i) => {
        return i !== id
    })

    todos = deletedTodos
    setTodos()
    showTodos()
}


// setCompleted

function setCompleted(id) {
    const completedTodos = todos.map((item, i) => {
        if (id == i) {
            return { ...item, completed: item.completed == true ? false : true }
        } else {
            return { ...item }
        }
    })

    todos = completedTodos
    setTodos()
    showTodos()

}

// editForm

formEdit.addEventListener('submit', (e) => {
    e.preventDefault()

    const todoText = formEdit['input-edit'].value.trim()
    formEdit.reset()
    if (todoText.length) {
        todos.splice(editItem, 1, {
            text: todoText,
            // time: '16.12.2023',
            completed:false
        })
        setTodos()
        showTodos()
        close()
    } else {
        showMessage('message-edit', "Please, enter some text . . .")
    }

})


// edit Todo

function editTodo(id) {
    open()
    editItem = id
}

function open() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')

}

function close() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}


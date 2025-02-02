document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    
    // Event Listeners
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
    document.getElementById('taskInput').addEventListener('keypress', (e) => {
        if(e.key === 'Enter') addTask();
    });
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if(taskText === '') return;

    const li = createTaskElement(taskText);
    document.getElementById('taskList').appendChild(li);
    saveTaskToStorage(taskText);
    taskInput.value = '';
}

function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    li.querySelector('.edit-btn').addEventListener('click', editTask);
    li.querySelector('.delete-btn').addEventListener('click', deleteTask);
    
    return li;
}

function editTask() {
    const li = this.parentElement;
    const span = li.querySelector('span');
    const originalText = span.textContent;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalText;

    li.replaceChild(input, span);
    
    this.textContent = 'Save';
    this.removeEventListener('click', editTask);
    this.addEventListener('click', saveTask);
    this.dataset.original = originalText;

    input.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') this.click();
    });
}

function saveTask() {
    const li = this.parentElement;
    const input = li.querySelector('input');
    const newText = input.value.trim();
    const originalText = this.dataset.original;

    if(newText === '') {
        alert('Task cannot be empty!');
        return;
    }

    const span = document.createElement('span');
    span.textContent = newText;
    li.replaceChild(span, input);

    this.textContent = 'Edit';
    this.removeEventListener('click', saveTask);
    this.addEventListener('click', editTask);
    delete this.dataset.original;

    updateTaskInStorage(originalText, newText);
}

function deleteTask() {
    const taskText = this.previousElementSibling.previousElementSibling.textContent;
    this.parentElement.remove();
    removeTaskFromStorage(taskText);
}

// Storage Functions
function saveTaskToStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task);
        document.getElementById('taskList').appendChild(li);
    });
}

function updateTaskInStorage(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.map(task => task === oldText ? newText : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Load tasks from localStorage when page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// PSEUDO CODE:
// 1. Capture user input
// 2. Create new task element
// 3. Add to list
// 4. Save to localStorage
// 5. Handle task deletion
// 6. Persist data

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    // Create new task element
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
                <span>${taskText}</span>
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
            `;

    // Add to list
    document.getElementById('taskList').appendChild(li);

    // Save to localStorage
    saveTaskToStorage(taskText);

    // Clear input
    taskInput.value = '';
}

function saveTaskToStorage(task) {
    let tasks = localStorage.getItem('tasks') ?
        JSON.parse(localStorage.getItem('tasks')) :
        [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
                    <span>${task}</span>
                    <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
                `;
        document.getElementById('taskList').appendChild(li);
    });
}

function deleteTask(element) {
    const taskText = element.previousElementSibling.textContent;
    element.parentElement.remove();
    removeTaskFromStorage(taskText);
}

function removeTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Handle Enter key
document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
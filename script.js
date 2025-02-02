// Mendapatkan referensi ke elemen HTML
const addButton = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Fungsi untuk menambahkan tugas
function addTodo() {
    const taskText = todoInput.value.trim();

    // Jika input kosong, jangan lakukan apa-apa
    if (taskText === '') return;

    // Buat elemen list item
    const li = document.createElement('li');
    li.className = 'todo-item';

    // Buat span untuk teks tugas
    const span = document.createElement('span');
    span.textContent = taskText;

    // Buat tombol hapus
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.className = 'delete-button';

    // Tambahkan event listener untuk tombol hapus
    deleteButton.addEventListener('click', function () {
        todoList.removeChild(li);
    });

    // Gabungkan span dan tombol ke dalam list item
    li.appendChild(span);
    li.appendChild(deleteButton);

    // Tambahkan list item ke dalam todo list
    todoList.appendChild(li);

    // Kosongkan input setelah tugas ditambahkan
    todoInput.value = '';
}

// Tambahkan event listener untuk tombol tambah
addButton.addEventListener('click', addTodo);

// Juga, tambahkan event listener untuk menambahkan tugas ketika tombol Enter ditekan
todoInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});
// Mendapatkan referensi ke elemen HTML
const addButton = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Fungsi untuk menambahkan tugas beserta waktu dan tombol edit
function addTodo() {
  const taskText = todoInput.value.trim();
  
  // Jika input kosong, jangan lakukan apa-apa
  if (taskText === '') return;
  
  // Buat elemen list item
  const li = document.createElement('li');
  li.className = 'todo-item';
  
  // Buat elemen span untuk teks tugas
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  
  // Buat elemen span untuk menampilkan waktu
  const timeSpan = document.createElement('span');
  timeSpan.className = 'timestamp';
  
  // Mendapatkan waktu sekarang
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  
  // Menambahkan angka 0 di depan jika kurang dari 10
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  
  // Format waktu menjadi "HH:MM:SS"
  timeSpan.textContent = `${hours}:${minutes}:${seconds}`;
  
  // Buat tombol edit
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.className = 'edit-button';
  // Event listener untuk tombol edit
  editButton.addEventListener('click', function() {
    const newText = prompt('Edit tugas:', taskSpan.textContent);
    if (newText !== null && newText.trim() !== '') {
      taskSpan.textContent = newText.trim();
    }
  });
  
  // Buat tombol hapus
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Hapus';
  deleteButton.className = 'delete-button';
  // Event listener untuk tombol hapus
  deleteButton.addEventListener('click', function() {
    todoList.removeChild(li);
  });
  
  // Gabungkan elemen: tugas, waktu, tombol edit, dan tombol hapus
  li.appendChild(taskSpan);
  li.appendChild(timeSpan);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  
  // Tambahkan list item ke dalam todo list
  todoList.appendChild(li);
  
  // Kosongkan input setelah tugas ditambahkan
  todoInput.value = '';
}

// Tambahkan event listener untuk tombol tambah
addButton.addEventListener('click', addTodo);

// Menambahkan tugas ketika tombol Enter ditekan
todoInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});

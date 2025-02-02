// Mendapatkan referensi ke modal dan elemennya
const addButton = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const modal = document.getElementById('edit-modal');
const closeModal = document.querySelector('.close');
const saveButton = document.querySelector('.save-button');
const cancelButton = document.querySelector('.cancel-button');
const editInput = document.getElementById('edit-input');

// Variabel global untuk menyimpan elemen taskSpan yang sedang diedit
let currentTaskSpan = null;

// Fungsi untuk membuka modal edit dengan nilai teks awal
function openEditModal(taskSpan) {
  currentTaskSpan = taskSpan;
  console.log("Modal", currentTaskSpan);
  editInput.value = taskSpan.textContent;
  modal.style.display = 'block';
  editInput.focus();
}

// Event listener untuk tombol close dan batal
closeModal.addEventListener('click', () => modal.style.display = 'none');
cancelButton.addEventListener('click', () => modal.style.display = 'none');

// Event listener untuk tombol simpan
saveButton.addEventListener('click', () => {
  const newText = editInput.value.trim();
  if (newText !== '') {
    currentTaskSpan.textContent = newText;
  }
  modal.style.display = 'none';
});

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
  
  // Tombol Done
  const doneButton = document.createElement('button');
  doneButton.textContent = 'Done';
  doneButton.className = 'done-button';
  doneButton.addEventListener('click', function() {
    // Toggle kelas 'completed' pada taskSpan
    taskSpan.classList.toggle('completed');
  });

  // Buat tombol edit
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.className = 'edit-button';
  // Event listener untuk tombol edit
  editButton.addEventListener('click', function() {
    openEditModal(taskSpan);
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
  li.appendChild(doneButton);
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

// Tutup modal jika klik di luar modal-content
window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
});

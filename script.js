const users = JSON.parse(localStorage.getItem('users') || '{}');

const formTitle = document.getElementById('form-title');
const actionBtn = document.getElementById('action-btn');
const toggleText = document.getElementById('toggle-text');
const toggleLink = document.getElementById('toggle-link');

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

let isLogin = true;

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

function switchForm() {
  isLogin = !isLogin;
  if (isLogin) {
    formTitle.textContent = 'Login';
    actionBtn.textContent = 'Login';
    toggleText.innerHTML = 'Belum punya akun? <a href="#" id="toggle-link">Register</a>';
  } else {
    formTitle.textContent = 'Register';
    actionBtn.textContent = 'Register';
    toggleText.innerHTML = 'Sudah punya akun? <a href="#" id="toggle-link">Login</a>';
  }
  usernameInput.value = '';
  passwordInput.value = '';

  // Re-attach event listener for new toggle link
  document.getElementById('toggle-link').addEventListener('click', (e) => {
    e.preventDefault();
    switchForm();
  });
}

toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  switchForm();
});

actionBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    alert('Masukkan username dan password!');
    return;
  }

  if (isLogin) {
    // login
    if (users[username] && users[username] === password) {
      alert('Login berhasil!');
      localStorage.setItem('loggedInUser', username);
      window.location.href = 'store.html';
    } else {
      alert('Username atau password salah!');
    }
  } else {
    // register
    if (users[username]) {
      alert('Username sudah terdaftar!');
    } else {
      users[username] = password;
      saveUsers();
      alert('Registrasi berhasil! Silakan login.');
      switchForm();
    }
  }
});

// Jika sudah login, langsung redirect ke store
if (localStorage.getItem('loggedInUser')) {
  window.location.href = 'store.html';
}

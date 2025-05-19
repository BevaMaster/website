// --- LOGIN & REGISTER --- //
let users = JSON.parse(localStorage.getItem('users')) || {};

const formTitle = document.getElementById('form-title');
const actionBtn = document.getElementById('action-btn');
const toggleText = document.getElementById('toggle-text');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

let isLogin = true;

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

function bindToggleLink() {
  const toggleLink = document.getElementById('toggle-link');
  toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm();
  });
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

  bindToggleLink();
}

actionBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    alert('Masukkan username dan password!');
    return;
  }

  if (isLogin) {
    // Login
    if (users[username] && users[username] === password) {
      alert('Login berhasil!');
      localStorage.setItem('loggedInUser', username);
      window.location.href = 'store.html';
    } else {
      alert('Username atau password salah!');
    }
  } else {
    // Register
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

bindToggleLink();

if (localStorage.getItem('loggedInUser')) {
  window.location.href = 'store.html';
}

// --- GYROSCOPE BACKGROUND MOVEMENT --- //

window.addEventListener('deviceorientation', (event) => {
  const maxOffset = 20;

  let xOffset = (event.gamma / 90) * maxOffset;
  let yOffset = (event.beta / 90) * maxOffset;

  if (xOffset > maxOffset) xOffset = maxOffset;
  if (xOffset < -maxOffset) xOffset = -maxOffset;
  if (yOffset > maxOffset) yOffset = maxOffset;
  if (yOffset < -maxOffset) yOffset = -maxOffset;

  document.body.style.backgroundPosition = `calc(50% + ${xOffset}px) calc(50% + ${yOffset}px)`;
});

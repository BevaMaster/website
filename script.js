btnSubmitChange.addEventListener('click', () => {
  const oldPass = document.getElementById('oldPass').value;
  const newPass = document.getElementById('newPass').value;
  const confirmNewPass = document.getElementById('confirmNewPass').value;

  if (!oldPass || !newPass || !confirmNewPass) {
    alert('Semua field harus diisi!');
    return;
  }
  if (newPass !== confirmNewPass) {
    alert('Password baru dan konfirmasi tidak sama!');
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || {};

  if (!users[loggedUser]) {
    alert('User tidak ditemukan!');
    return;
  }

  if (users[loggedUser] !== oldPass) {
    alert('Password lama salah!');
    return;
  }

  users[loggedUser] = newPass;
  localStorage.setItem('users', JSON.stringify(users));

  alert('Password berhasil diubah! Silakan login ulang.');

  // Logout otomatis setelah ganti password
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
});

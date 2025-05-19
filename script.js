// Validasi username max 4, password 5-10
function validUsername(u) {
  return u.length > 0 && u.length <= 4;
}
function validPassword(p) {
  return p.length >= 5 && p.length <= 10;
}

// === Fungsi login/register untuk index.html ===
if (document.getElementById('btnLogin')) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // Toggle form
  document.getElementById('toggleBtn').addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  });
  document.getElementById('toggleBtn2').addEventListener('click', () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
  });

  document.getElementById('btnLogin').addEventListener('click', () => {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    if (!validUsername(username)) {
      alert('Username harus 1-4 karakter!');
      return;
    }
    if (!validPassword(password)) {
      alert('Password harus 5-10 karakter!');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[username]) {
      alert('User tidak ditemukan!');
      return;
    }
    if (users[username].password !== password) {
      alert('Password salah!');
      return;
    }
    if (users[username].role !== role) {
      alert(`User ini bukan ${role}!`);
      return;
    }

    localStorage.setItem('loggedInUser', username);
    localStorage.setItem('loggedInRole', role);

    alert('Login berhasil!');
    window.location.href = 'store.html';
  });

  document.getElementById('btnRegister').addEventListener('click', () => {
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;

    if (!validUsername(username)) {
      alert('Username harus 1-4 karakter!');
      return;
    }
    if (!validPassword(password)) {
      alert('Password harus 5-10 karakter!');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]) {
      alert('Username sudah terdaftar!');
      return;
    }

    users[username] = { password, role };
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registrasi berhasil! Silakan login.');
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
  });
}

// === Fungsi store.html ===
if (document.getElementById('btnLogout')) {
  const usernameDisplay = document.getElementById('usernameDisplay');
  const roleDisplay = document.getElementById('roleDisplay');
  const loggedUser = localStorage.getItem('loggedInUser');
  const loggedRole = localStorage.getItem('loggedInRole');

  if (!loggedUser || !loggedRole) {
    alert('Silakan login dulu!');
    window.location.href = 'index.html';
  } else {
    usernameDisplay.textContent = loggedUser;
    roleDisplay.textContent = loggedRole;
  }

  // Produk awal kalau belum ada
  let products = JSON.parse(localStorage.getItem('products')) || [
    {name: "Produk 1", desc: "Deskripsi produk 1", img: "https://via.placeholder.com/250x150?text=Produk+1"},
    {name: "Produk 2", desc: "Deskripsi produk 2", img: "https://via.placeholder.com/250x150?text=Produk+2"},
    {name: "Produk 3", desc: "Deskripsi produk 3", img: "https://via.placeholder.com/250x150?text=Produk+3"},
  ];
  localStorage.setItem('products', JSON.stringify(products));

  const productList = document.getElementById('productList');
  const adminControls = document.getElementById('adminControls');

  // Render produk di store
  function renderProducts() {
    productList.innerHTML = '';
    products.forEach((p, i) => {
      const div = document.createElement('div');
      div.className = 'product';

      div.innerHTML = `
        <img src="${p.img}" alt="${p.name}" />
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
        <button class="waBtn">Chat WhatsApp</button>
        ${loggedRole === 'admin' ? `<button class="delBtn" data-index="${i}">Hapus Produk</button>` : ''}
      `;

      productList.appendChild(div);
    });

    // Event tombol WhatsApp
    document.querySelectorAll('.waBtn').forEach(btn => {
      btn.onclick = () => {
        window.open('https://wa.me/6282182572850', '_blank');
      };
    });

    // Event hapus produk admin
    if (loggedRole === 'admin') {
      document.querySelectorAll('.delBtn').forEach(btn => {
        btn.onclick = (e) => {
          const idx = e.target.getAttribute('data-index');
          if (confirm('Hapus produk ini?')) {
            products.splice(idx, 1);
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts();
          }
        };
      });
    }
  }

  renderProducts();

  // Tampilkan admin controls kalau admin
  if (loggedRole === 'admin') {
    adminControls.style.display = 'block';
  }

  document.getElementById('btnAddProduct').addEventListener('click', () => {
    const name = document.getElementById('newProductName').value.trim();
    const desc = document.getElementById('newProductDesc').value.trim();
    const img = document.getElementById('newProductImg').value.trim();

    if (!name || !desc || !img) {
      alert('Isi semua kolom produk!');
      return;
    }

    products.push({name, desc, img});
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();

    // Reset form
    document.getElementById('newProductName').value = '';
    document.getElementById('newProductDesc').value = '';
    document.getElementById('newProductImg').value = '';
  });

  // Logout
  document.getElementById('btnLogout').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInRole');
    alert('Logout berhasil!');
    window.location.href = 'index.html';
  });

  // Ganti password toggle
  const changePassForm = document.getElementById('changePassForm');
  document.getElementById('btnChangePass').addEventListener('click', () => {
    changePassForm.style.display = 'block';
  });
  document.getElementById('btnCancelChange').addEventListener('click', () => {
    changePassForm.style.display = 'none';
  });

  // Ganti password simpan
  document.getElementById('btnSubmitChange').addEventListener('click', () => {
    const oldPass = document.getElementById('oldPass').value;
    const newPass = document.getElementById('newPass').value;
    const confirmNewPass = document.getElementById('confirmNewPass').value;

    if (!oldPass || !newPass || !confirmNewPass) {
      alert('Isi semua kolom password!');
      return;
    }
    if (oldPass !== JSON.parse(localStorage.getItem('users'))[loggedUser].password) {
      alert('Password lama salah!');
      return;
    }
    if (!validPassword(newPass)) {
      alert('Password baru harus 5-10 karakter!');
      return;
    }
    if (newPass !== confirmNewPass) {
      alert('Konfirmasi password tidak sama!');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users'));
    users[loggedUser].password = newPass;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Password berhasil diganti, silakan login ulang.');

    // Logout otomatis
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInRole');
    window.location.href = 'index.html';
  });
}

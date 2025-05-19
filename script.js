document.getElementById("registerForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;
  localStorage.setItem(username, password);
  alert("Registrasi berhasil!");
  window.location.href = "login.html";
});

document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const savedPassword = localStorage.getItem(username);
  if (savedPassword === password) {
    alert("Login berhasil!");
    window.location.href = "../website1/store.html";
  } else {
    alert("Username atau password salah.");
  }
});

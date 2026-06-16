// ============================================================
//  AUTH.JS — Autentikasi: login, logout, session management
// ============================================================

const AUTH_KEY = "edupath_user";

const VALID_USERS = [
  { username: "siswa",   password: "belajar123", nama: "Faiz Thahir" },
  { username: "admin",   password: "admin123",   nama: "Admin EduPath" }
];

/**
 * Menyimpan sesi pengguna ke localStorage.
 * @param {Object} user - Objek user yang berhasil login.
 */
function saveSession(user) {
  const session = { username: user.username, nama: user.nama };
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

/**
 * Mengambil sesi pengguna yang tersimpan.
 * @returns {Object|null} Sesi user atau null jika belum login.
 */
function getSession() {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Menghapus sesi pengguna (logout).
 */
function clearSession() {
  localStorage.removeItem(AUTH_KEY);
}

/**
 * Memvalidasi kredensial login.
 * @param {string} username
 * @param {string} password
 * @returns {Object|null} User yang cocok atau null.
 */
function validateCredentials(username, password) {
  if (!username || !password) return null;
  return VALID_USERS.find(
    u => u.username === username.trim() && u.password === password
  ) || null;
}

/**
 * Inisialisasi modul autentikasi.
 * Menangani event login/logout dan cek sesi aktif.
 */
function initAuth() {
  const btnLogin    = document.getElementById("btn-login");
  const btnLogout   = document.getElementById("btn-logout");
  const pwToggleBtn = document.getElementById("pw-toggle-btn");
  const inputPass   = document.getElementById("input-password");
  const loginError  = document.getElementById("login-error");

  // Cek sesi aktif — langsung masuk ke dashboard
  const session = getSession();
  if (session) {
    showPage("page-dashboard");
    applyUserSession(session);
  }

  // Toggle tampilkan/sembunyikan password
  pwToggleBtn.addEventListener("click", function () {
    const isHidden = inputPass.type === "password";
    inputPass.type = isHidden ? "text" : "password";
    pwToggleBtn.textContent = isHidden ? "🙈" : "👁";
  });

  // Handle tombol login
  btnLogin.addEventListener("click", handleLogin);

  // Handle Enter key di input
  document.getElementById("input-username").addEventListener("keydown", function(e) {
    if (e.key === "Enter") document.getElementById("input-password").focus();
  });
  inputPass.addEventListener("keydown", function(e) {
    if (e.key === "Enter") handleLogin();
  });

  // Handle tombol logout
  btnLogout.addEventListener("click", handleLogout);

  function handleLogin() {
    const username = document.getElementById("input-username").value;
    const password = document.getElementById("input-password").value;

    loginError.style.display = "none";

    if (!username || !password) {
      showError("Username dan password tidak boleh kosong.");
      return;
    }

    const user = validateCredentials(username, password);
    if (!user) {
      showError("Username atau password salah. Coba lagi.");
      document.getElementById("input-password").value = "";
      return;
    }

    saveSession(user);
    applyUserSession(user);
    showPage("page-dashboard");
    showToast("Selamat datang, " + user.nama + "! 👋", "success");
  }

  function handleLogout() {
    clearSession();
    showPage("page-login");
    document.getElementById("input-username").value = "";
    document.getElementById("input-password").value = "";
    loginError.style.display = "none";
  }

  function showError(msg) {
    loginError.textContent = msg;
    loginError.style.display = "block";
  }
}

/**
 * Menerapkan data sesi ke elemen UI (nama pengguna, avatar, dll).
 * @param {Object} session - Objek sesi pengguna.
 */
function applyUserSession(session) {
  const heroUsername = document.getElementById("hero-username");
  const navAvatar    = document.getElementById("nav-avatar");

  if (heroUsername) heroUsername.textContent = session.nama + "!";
  if (navAvatar)    navAvatar.textContent    = session.nama.charAt(0).toUpperCase();

  updateGreeting();
}

/**
 * Menampilkan salam berdasarkan jam saat ini.
 */
function updateGreeting() {
  const hour = new Date().getHours();
  const greetEl = document.getElementById("greeting-text");
  if (!greetEl) return;

  if (hour >= 5  && hour < 11) greetEl.textContent = "Selamat Pagi,";
  else if (hour >= 11 && hour < 15) greetEl.textContent = "Selamat Siang,";
  else if (hour >= 15 && hour < 18) greetEl.textContent = "Selamat Sore,";
  else greetEl.textContent = "Selamat Malam,";
}

// ============================================================
//  APP.JS — Entry point utama aplikasi EduPath
//  Mengatur navigasi antar tab dan koordinasi semua modul
// ============================================================

/**
 * Menampilkan satu page (login atau dashboard) dan menyembunyikan yang lain.
 * @param {string} pageId - ID elemen page yang akan ditampilkan.
 */
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(pageId);
  if (target) target.classList.add("active");
}

/**
 * Menampilkan satu tab di dalam dashboard dan menyembunyikan yang lain.
 * @param {string} tabName - Nama tab: "home", "materi", "kuis", "progress".
 */
function showTab(tabName) {
  // Update tampilan tab
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  const targetTab = document.getElementById("tab-" + tabName);
  if (targetTab) targetTab.classList.add("active");

  // Update state nav link
  document.querySelectorAll(".nav-link").forEach(l => {
    l.classList.toggle("active", l.dataset.page === tabName);
  });

  // Refresh data setiap kali tab dibuka
  if (tabName === "home")     refreshHomeTab();
  if (tabName === "progress") refreshProgressTab();
  if (tabName === "kuis")     renderKuisList();
  if (tabName === "materi") {
    // Reset search & filter saat kembali ke tab materi
    const grid = document.getElementById("materi-grid");
    renderMateriGrid(grid, MATERI_DATA);
  }
}

/**
 * Merefresh seluruh tampilan yang mungkin berubah setelah aksi pengguna
 * (misal: setelah menyelesaikan materi atau kuis).
 */
function refreshAllViews() {
  refreshHomeTab();
  renderProgressOverview();
  renderKuisHistory();
  renderCompletedMateri();
  renderKuisList();
  renderContinueCards();
}

/**
 * Merefresh konten halaman home.
 */
function refreshHomeTab() {
  updateOverallRing();
  renderContinueCards();
  renderQuizPreviewCards();
}

/**
 * Merefresh konten halaman progress.
 */
function refreshProgressTab() {
  renderProgressOverview();
  renderKuisHistory();
  renderCompletedMateri();
}

/**
 * Menampilkan toast notification.
 * @param {string} msg   - Pesan yang ditampilkan.
 * @param {string} type  - Tipe: "success" | "warn" | "danger" | "" (default biru).
 */
function showToast(msg, type = "") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast" + (type ? " " + type : "");
  toast.textContent = msg;
  container.appendChild(toast);

  // Hapus setelah animasi selesai (3.6 detik)
  setTimeout(() => {
    toast.remove();
  }, 3600);
}

/**
 * Inisialisasi navigasi navbar dan tombol shortcut di halaman home.
 */
function initNavigation() {
  // Nav links di navbar
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => showTab(link.dataset.page));
  });

  // Tombol "Lihat semua" di halaman home
  document.querySelectorAll("[data-goto]").forEach(btn => {
    btn.addEventListener("click", () => showTab(btn.dataset.goto));
  });
}

/**
 * Inisialisasi fitur notifikasi (simulasi).
 */
function initNotifications() {
  const notifBtn   = document.getElementById("notif-btn");
  const notifBadge = document.getElementById("notif-badge");

  notifBtn.addEventListener("click", () => {
    showToast("📢 Kuis baru tersedia: Kuis Statistika!", "success");
    showToast("🎉 Kamu sudah belajar selama 3 hari berturut-turut!", "");
    notifBadge.style.display = "none";
  });
}

// ============================================================
//  MAIN — Titik masuk aplikasi
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  // Inisialisasi semua modul
  initAuth();
  initMateri();
  initKuis();
  initProgress();
  initNavigation();
  initNotifications();

  // Tampilkan tab home sebagai default jika sudah login
  const session = getSession();
  if (session) {
    showTab("home");
    refreshHomeTab();
  }
});

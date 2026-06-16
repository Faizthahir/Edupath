// ============================================================
//  MATERI.JS — Modul halaman materi pelajaran
// ============================================================

const PROGRESS_KEY = "edupath_progress";

/**
 * Mengambil data progress dari localStorage.
 * @returns {Object} Map dari materi id ke status selesai.
 */
function getProgress() {
  const raw = localStorage.getItem(PROGRESS_KEY);
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return {}; }
}

/**
 * Menyimpan satu item progress ke localStorage.
 * @param {string} materiId
 */
function markMateriDone(materiId) {
  const progress = getProgress();
  if (!progress[materiId]) {
    progress[materiId] = { selesai: true, tanggal: new Date().toISOString() };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }
}

/**
 * Mengembalikan true jika materi dengan id tertentu sudah selesai.
 * @param {string} materiId
 * @returns {boolean}
 */
function isMateriDone(materiId) {
  const progress = getProgress();
  return !!(progress[materiId] && progress[materiId].selesai);
}

/**
 * Merender satu kartu materi.
 * @param {Object} m - Objek materi dari MATERI_DATA.
 * @returns {HTMLElement}
 */
function renderMateriCard(m) {
  const done = isMateriDone(m.id);
  const card = document.createElement("div");
  card.className = "materi-card" + (done ? " done" : "");
  card.dataset.id = m.id;

  card.innerHTML = `
    ${done ? '<span class="card-done-badge">✓ Selesai</span>' : ""}
    <span class="card-emoji">${m.emoji}</span>
    <div class="card-cat">${m.kategori}</div>
    <div class="card-title">${m.judul}</div>
    <div class="card-desc">${m.deskripsi}</div>
    <div class="card-progress-bar-wrap">
      <div class="card-progress-bar" style="width: ${done ? "100" : "0"}%"></div>
    </div>
  `;

  card.addEventListener("click", () => openMateriDetail(m));
  return card;
}

/**
 * Merender semua kartu materi ke dalam container.
 * @param {HTMLElement} container
 * @param {Array} data - Array materi yang akan ditampilkan.
 */
function renderMateriGrid(container, data) {
  container.innerHTML = "";
  if (data.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="es-emoji">🔍</span>
        <p>Tidak ada materi yang cocok.</p>
      </div>`;
    return;
  }
  data.forEach(m => container.appendChild(renderMateriCard(m)));
}

/**
 * Membuka halaman detail materi (full-screen overlay).
 * @param {Object} m - Objek materi.
 */
function openMateriDetail(m) {
  const overlay  = document.getElementById("materi-detail");
  const area     = document.getElementById("detail-content-area");
  const done     = isMateriDone(m.id);

  area.innerHTML = `
    <div class="detail-content-wrap">
      <span class="detail-hero-emoji">${m.emoji}</span>
      <div class="detail-cat">${m.kategori}</div>
      <h2 class="detail-title">${m.judul}</h2>
      <p class="detail-meta">⏱ Estimasi waktu: ${m.durasi}</p>
      <div class="detail-body">${m.body}</div>
      <div class="detail-actions">
        ${done
          ? '<span style="color:var(--clr-success);font-weight:600;">✓ Sudah Diselesaikan</span>'
          : `<button class="btn-primary" id="btn-selesai-materi">Tandai Selesai ✓</button>`
        }
      </div>
    </div>
  `;

  overlay.style.display = "block";
  document.body.style.overflow = "hidden";

  // Tombol tandai selesai
  const btnSelesai = document.getElementById("btn-selesai-materi");
  if (btnSelesai) {
    btnSelesai.addEventListener("click", () => {
      markMateriDone(m.id);
      showToast(`"${m.judul}" ditandai selesai! 🎉`, "success");
      overlay.style.display = "none";
      document.body.style.overflow = "";
      refreshAllViews();
    });
  }
}

/**
 * Inisialisasi modul materi: render grid, search, filter, tombol kembali.
 */
function initMateri() {
  const grid       = document.getElementById("materi-grid");
  const searchInp  = document.getElementById("materi-search");
  const filterSel  = document.getElementById("materi-filter");
  const backBtn    = document.getElementById("back-from-detail");
  const overlay    = document.getElementById("materi-detail");

  renderMateriGrid(grid, MATERI_DATA);

  // Search & filter real-time
  function applyFilter() {
    const q   = searchInp.value.toLowerCase();
    const cat = filterSel.value;
    const filtered = MATERI_DATA.filter(m => {
      const matchQ   = m.judul.toLowerCase().includes(q) || m.deskripsi.toLowerCase().includes(q);
      const matchCat = cat === "all" || m.kategori === cat;
      return matchQ && matchCat;
    });
    renderMateriGrid(grid, filtered);
  }

  searchInp.addEventListener("input", applyFilter);
  filterSel.addEventListener("change", applyFilter);

  // Tombol kembali dari detail
  backBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    document.body.style.overflow = "";
    applyFilter(); // refresh grid
  });
}

/**
 * Merender kartu materi "lanjut belajar" di halaman home (maksimal 3 yang belum selesai).
 */
function renderContinueCards() {
  const container = document.getElementById("continue-cards");
  if (!container) return;

  const belumSelesai = MATERI_DATA.filter(m => !isMateriDone(m.id)).slice(0, 3);
  container.innerHTML = "";

  if (belumSelesai.length === 0) {
    container.innerHTML = `<div class="empty-state" style="text-align:left;padding:0;"><span>🎉 Semua materi sudah selesai!</span></div>`;
    return;
  }

  belumSelesai.forEach(m => container.appendChild(renderMateriCard(m)));
}

// ============================================================
//  PROGRESS.JS — Modul halaman progress belajar
// ============================================================

/**
 * Menghitung total materi yang sudah diselesaikan.
 * @returns {number}
 */
function getTotalMateriDone() {
  const progress = getProgress();
  return Object.values(progress).filter(p => p.selesai).length;
}

/**
 * Menghitung rata-rata skor kuis dari semua riwayat.
 * @returns {number}
 */
function getAverageScore() {
  const history = getKuisHistory();
  if (history.length === 0) return 0;
  const total = history.reduce((sum, h) => sum + h.score, 0);
  return Math.round(total / history.length);
}

/**
 * Menghitung jumlah kuis unik yang sudah pernah dikerjakan.
 * @returns {number}
 */
function getTotalKuisDone() {
  const history  = getKuisHistory();
  const uniqueId = new Set(history.map(h => h.kuisId));
  return uniqueId.size;
}

/**
 * Merender kartu statistik progress di bagian atas halaman progress.
 */
function renderProgressOverview() {
  const container = document.getElementById("progress-overview");
  if (!container) return;

  const materiDone  = getTotalMateriDone();
  const totalMateri = MATERI_DATA.length;
  const kuisDone    = getTotalKuisDone();
  const avgScore    = getAverageScore();
  const pct         = Math.round((materiDone / totalMateri) * 100);

  container.innerHTML = `
    <div class="progress-stat-card">
      <div class="psc-icon">📖</div>
      <div class="psc-num">${materiDone}<span style="font-size:1rem;color:var(--clr-text-muted);">/${totalMateri}</span></div>
      <div class="psc-label">Materi Diselesaikan</div>
    </div>
    <div class="progress-stat-card">
      <div class="psc-icon">✅</div>
      <div class="psc-num">${kuisDone}<span style="font-size:1rem;color:var(--clr-text-muted);">/${KUIS_DATA.length}</span></div>
      <div class="psc-label">Kuis Dikerjakan</div>
    </div>
    <div class="progress-stat-card">
      <div class="psc-icon">⭐</div>
      <div class="psc-num" style="color:var(--clr-warn);">${avgScore}</div>
      <div class="psc-label">Rata-rata Skor Kuis</div>
    </div>
    <div class="progress-stat-card">
      <div class="psc-icon">📈</div>
      <div class="psc-num" style="color:var(--clr-accent);">${pct}%</div>
      <div class="psc-label">Progress Keseluruhan</div>
    </div>
  `;
}

/**
 * Merender riwayat kuis yang sudah dikerjakan.
 */
function renderKuisHistory() {
  const container = document.getElementById("quiz-history-list");
  if (!container) return;

  const history = getKuisHistory();
  if (history.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="es-emoji">📋</span>
        <p>Belum ada kuis yang dikerjakan.</p>
      </div>`;
    return;
  }

  container.innerHTML = "";
  history.forEach(h => {
    const scoreClass =
      h.score >= 80 ? "score-green" :
      h.score >= 60 ? "score-yellow" : "score-red";

    const tgl = new Date(h.tanggal).toLocaleDateString("id-ID", {
      day: "2-digit", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });

    const item = document.createElement("div");
    item.className = "quiz-history-item";
    item.innerHTML = `
      <div>
        <div class="qhi-title">${h.judul}</div>
        <div class="qhi-date">${tgl} &nbsp;|&nbsp; ${h.benar}/${h.total} benar</div>
      </div>
      <div class="qhi-score ${scoreClass}">${h.score}</div>
    `;
    container.appendChild(item);
  });
}

/**
 * Merender daftar materi yang sudah diselesaikan.
 */
function renderCompletedMateri() {
  const container = document.getElementById("completed-materi-list");
  if (!container) return;

  const progress  = getProgress();
  const completed = MATERI_DATA.filter(m => progress[m.id] && progress[m.id].selesai);

  if (completed.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="es-emoji">📚</span>
        <p>Belum ada materi yang diselesaikan.</p>
      </div>`;
    return;
  }

  container.innerHTML = "";
  completed.forEach(m => {
    const tgl = new Date(progress[m.id].tanggal).toLocaleDateString("id-ID", {
      day: "2-digit", month: "long", year: "numeric"
    });
    const item = document.createElement("div");
    item.className = "completed-item";
    item.innerHTML = `
      <span class="ci-emoji">${m.emoji}</span>
      <div class="ci-info">
        <div class="ci-title">${m.judul}</div>
        <div class="ci-cat">${m.kategori} &nbsp;·&nbsp; Selesai ${tgl}</div>
      </div>
      <span class="ci-check">✓</span>
    `;
    container.appendChild(item);
  });
}

/**
 * Memperbarui ring progress keseluruhan di halaman home.
 */
function updateOverallRing() {
  const done  = getTotalMateriDone();
  const total = MATERI_DATA.length;
  const pct   = Math.round((done / total) * 100);

  const ring   = document.getElementById("overall-ring");
  const pctEl  = document.getElementById("overall-pct");
  const subEl  = document.getElementById("overall-sub");

  if (!ring) return;

  // Circumference = 2π × r = 2 × π × 50 ≈ 314
  const circumference = 314;
  const offset = circumference - (pct / 100) * circumference;
  ring.style.strokeDashoffset = offset;

  if (pctEl) pctEl.textContent = pct + "%";
  if (subEl) subEl.textContent = `${done} dari ${total} materi selesai`;
}

/**
 * Inisialisasi modul progress.
 */
function initProgress() {
  renderProgressOverview();
  renderKuisHistory();
  renderCompletedMateri();
}

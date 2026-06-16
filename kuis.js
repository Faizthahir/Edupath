// ============================================================
//  KUIS.JS — Modul kuis: tampil soal, timer, dan skor
// ============================================================

const KUIS_HISTORY_KEY = "edupath_kuis_history";

let activeKuis      = null;  // Data kuis yang sedang berjalan
let currentQIndex   = 0;     // Indeks soal saat ini
let selectedAnswers = {};    // Map: index soal → indeks pilihan yang dipilih
let timerInterval   = null;  // Referensi setInterval timer
let timeLeft        = 0;     // Sisa waktu dalam detik

/**
 * Mengambil riwayat kuis dari localStorage.
 * @returns {Array}
 */
function getKuisHistory() {
  const raw = localStorage.getItem(KUIS_HISTORY_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

/**
 * Menyimpan hasil kuis ke riwayat.
 * @param {string} kuisId
 * @param {string} judul
 * @param {number} score - Skor 0–100
 * @param {number} benar - Jumlah jawaban benar
 * @param {number} total - Total soal
 */
function saveKuisResult(kuisId, judul, score, benar, total) {
  const history = getKuisHistory();
  history.unshift({
    kuisId,
    judul,
    score,
    benar,
    total,
    tanggal: new Date().toISOString()
  });
  localStorage.setItem(KUIS_HISTORY_KEY, JSON.stringify(history));
}

/**
 * Mengambil skor terbaik untuk kuis tertentu.
 * @param {string} kuisId
 * @returns {number|null}
 */
function getBestScore(kuisId) {
  const history = getKuisHistory();
  const relevant = history.filter(h => h.kuisId === kuisId);
  if (relevant.length === 0) return null;
  return Math.max(...relevant.map(h => h.score));
}

// -------- RENDER QUIZ LIST --------

/**
 * Merender satu kartu kuis.
 * @param {Object} k - Objek kuis dari KUIS_DATA.
 * @returns {HTMLElement}
 */
function renderKuisCard(k) {
  const best = getBestScore(k.id);
  const card = document.createElement("div");
  card.className = "quiz-card" + (best !== null ? " done-quiz" : "");

  card.innerHTML = `
    <span class="card-emoji">${k.emoji}</span>
    <div class="card-title">${k.judul}</div>
    <div class="card-desc">${k.deskripsi}</div>
    <div class="quiz-meta">📋 ${k.soal.length} soal &nbsp;|&nbsp; ⏱ ${k.waktu / 60} menit</div>
    ${best !== null ? `<span class="quiz-best-score">🏆 Skor Terbaik: ${best}</span>` : ""}
  `;

  card.addEventListener("click", () => startKuis(k));
  return card;
}

/**
 * Merender semua kartu kuis.
 */
function renderKuisList() {
  const listContainer = document.getElementById("quiz-list-cards");
  if (!listContainer) return;
  listContainer.innerHTML = "";
  KUIS_DATA.forEach(k => listContainer.appendChild(renderKuisCard(k)));
}

/**
 * Merender preview kuis di halaman home (maksimal 2).
 */
function renderQuizPreviewCards() {
  const container = document.getElementById("quiz-preview-cards");
  if (!container) return;
  container.innerHTML = "";
  KUIS_DATA.slice(0, 2).forEach(k => container.appendChild(renderKuisCard(k)));
}

// -------- KUIS AKTIF --------

/**
 * Memulai sesi kuis.
 * @param {Object} k - Objek kuis.
 */
function startKuis(k) {
  activeKuis      = k;
  currentQIndex   = 0;
  selectedAnswers = {};
  timeLeft        = k.waktu;

  showKuisView("active");
  document.getElementById("quiz-title-bar").textContent = k.judul;
  renderQuestion();
  startTimer();
}

/**
 * Menampilkan soal yang sedang aktif.
 */
function renderQuestion() {
  const soal  = activeKuis.soal;
  const total = soal.length;
  const q     = soal[currentQIndex];

  // Progress bar
  const pct = ((currentQIndex + 1) / total) * 100;
  document.getElementById("quiz-progress-bar").style.width = pct + "%";

  // Counter
  document.getElementById("quiz-q-counter").textContent =
    `${currentQIndex + 1} / ${total}`;

  // Body soal
  const body = document.getElementById("quiz-body");
  body.innerHTML = `
    <div class="quiz-q-num">SOAL ${currentQIndex + 1}</div>
    <div class="quiz-q-text">${q.pertanyaan}</div>
    <div class="quiz-options" id="quiz-options"></div>
  `;

  const optContainer = document.getElementById("quiz-options");
  q.pilihan.forEach((pil, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = `${String.fromCharCode(65 + idx)}. ${pil}`;

    // Tandai jika sudah dipilih sebelumnya
    if (selectedAnswers[currentQIndex] === idx) btn.classList.add("selected");

    btn.addEventListener("click", () => selectAnswer(idx));
    optContainer.appendChild(btn);
  });

  // Tombol navigasi
  document.getElementById("btn-prev-q").disabled = currentQIndex === 0;
  const btnNext = document.getElementById("btn-next-q");
  btnNext.textContent = currentQIndex === total - 1 ? "Selesai ✓" : "Selanjutnya →";
}

/**
 * Memilih jawaban untuk soal saat ini.
 * @param {number} idx - Indeks pilihan yang dipilih.
 */
function selectAnswer(idx) {
  selectedAnswers[currentQIndex] = idx;
  const opts = document.querySelectorAll(".quiz-option");
  opts.forEach((o, i) => {
    o.classList.toggle("selected", i === idx);
  });
}

/**
 * Pindah ke soal berikutnya atau submit kuis.
 */
function nextQuestion() {
  if (selectedAnswers[currentQIndex] === undefined) {
    showToast("Pilih jawaban terlebih dahulu!", "warn");
    return;
  }

  if (currentQIndex < activeKuis.soal.length - 1) {
    currentQIndex++;
    renderQuestion();
  } else {
    submitKuis();
  }
}

/**
 * Pindah ke soal sebelumnya.
 */
function prevQuestion() {
  if (currentQIndex > 0) {
    currentQIndex--;
    renderQuestion();
  }
}

/**
 * Menghitung dan menampilkan hasil kuis.
 */
function submitKuis() {
  clearInterval(timerInterval);

  const soal  = activeKuis.soal;
  let benar   = 0;
  soal.forEach((q, i) => {
    if (selectedAnswers[i] === q.jawaban) benar++;
  });

  const total = soal.length;
  const score = Math.round((benar / total) * 100);

  saveKuisResult(activeKuis.id, activeKuis.judul, score, benar, total);

  showKuisView("result");
  renderKuisResult(score, benar, total);
  refreshAllViews();
}

/**
 * Merender tampilan hasil kuis.
 * @param {number} score
 * @param {number} benar
 * @param {number} total
 */
function renderKuisResult(score, benar, total) {
  let emoji, label, color;
  if (score >= 80)      { emoji = "🏆"; label = "Luar Biasa!";    color = "var(--clr-success)"; }
  else if (score >= 60) { emoji = "😊"; label = "Bagus!";         color = "var(--clr-warn)"; }
  else                  { emoji = "📚"; label = "Terus Belajar!"; color = "var(--clr-danger)"; }

  const salah = total - benar;
  document.getElementById("quiz-result-card").innerHTML = `
    <span class="result-emoji">${emoji}</span>
    <div class="result-score-big" style="color:${color};">${score}</div>
    <p class="result-label">${label} Skor kamu ${score} dari 100.</p>
    <div class="result-breakdown">
      <div class="breakdown-item">
        <div class="breakdown-num" style="color:var(--clr-success);">${benar}</div>
        <div class="breakdown-lbl">Benar</div>
      </div>
      <div class="breakdown-item">
        <div class="breakdown-num" style="color:var(--clr-danger);">${salah}</div>
        <div class="breakdown-lbl">Salah</div>
      </div>
      <div class="breakdown-item">
        <div class="breakdown-num">${total}</div>
        <div class="breakdown-lbl">Total Soal</div>
      </div>
    </div>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <button class="btn-primary" id="btn-kuis-lagi">Coba Lagi</button>
      <button class="btn-outline" id="btn-kuis-selesai">Kembali ke Kuis</button>
    </div>
  `;

  document.getElementById("btn-kuis-lagi").addEventListener("click", () => startKuis(activeKuis));
  document.getElementById("btn-kuis-selesai").addEventListener("click", () => {
    showKuisView("list");
    renderKuisList();
  });
}

// -------- TIMER --------

/**
 * Memulai countdown timer.
 */
function startTimer() {
  clearInterval(timerInterval);
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showToast("Waktu habis! Kuis disubmit otomatis.", "warn");
      // Isi jawaban yang belum dijawab dengan -1
      activeKuis.soal.forEach((_, i) => {
        if (selectedAnswers[i] === undefined) selectedAnswers[i] = -1;
      });
      submitKuis();
    }
  }, 1000);
}

/**
 * Memperbarui tampilan timer.
 */
function updateTimerDisplay() {
  const m = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const s = String(timeLeft % 60).padStart(2, "0");
  const timerEl = document.getElementById("quiz-timer");
  if (timerEl) {
    timerEl.textContent = `⏱ ${m}:${s}`;
    timerEl.style.color = timeLeft <= 30 ? "var(--clr-danger)" : "var(--clr-accent2)";
  }
}

// -------- VIEW SWITCHER --------

/**
 * Menampilkan salah satu dari tiga sub-view kuis: list, active, result.
 * @param {"list"|"active"|"result"} view
 */
function showKuisView(view) {
  document.getElementById("quiz-list-view").style.display   = view === "list"   ? "block" : "none";
  document.getElementById("quiz-active-view").style.display = view === "active" ? "block" : "none";
  document.getElementById("quiz-result-view").style.display = view === "result" ? "block" : "none";
}

// -------- INIT --------

/**
 * Inisialisasi modul kuis: render list dan pasang event listener.
 */
function initKuis() {
  renderKuisList();
  showKuisView("list");

  document.getElementById("btn-next-q").addEventListener("click", nextQuestion);
  document.getElementById("btn-prev-q").addEventListener("click", prevQuestion);

  document.getElementById("btn-quit-quiz").addEventListener("click", () => {
    if (confirm("Yakin ingin keluar dari kuis? Progress tidak akan disimpan.")) {
      clearInterval(timerInterval);
      showKuisView("list");
      renderKuisList();
    }
  });
}

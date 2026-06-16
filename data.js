// ============================================================
//  DATA.JS — Semua data materi dan kuis aplikasi EduPath
// ============================================================

const MATERI_DATA = [
  {
    id: "mat-01",
    kategori: "Matematika",
    emoji: "📐",
    judul: "Aljabar Dasar",
    deskripsi: "Pengenalan variabel, persamaan linear, dan operasi aljabar.",
    durasi: "20 menit",
    body: `
      <h4>Apa itu Aljabar?</h4>
      <p>Aljabar adalah cabang matematika yang menggunakan simbol (variabel) untuk mewakili bilangan yang tidak diketahui. Variabel biasanya ditulis dengan huruf seperti <code>x</code>, <code>y</code>, atau <code>z</code>.</p>
      <h4>Persamaan Linear</h4>
      <p>Persamaan linear adalah persamaan yang variabelnya berpangkat satu. Contoh: <code>2x + 3 = 7</code></p>
      <p>Cara menyelesaikannya:</p>
      <ul>
        <li>Pindahkan konstanta ke sisi kanan: <code>2x = 7 - 3 = 4</code></li>
        <li>Bagi kedua sisi dengan koefisien: <code>x = 4 / 2 = 2</code></li>
      </ul>
      <h4>Operasi Dasar Aljabar</h4>
      <p>Dalam aljabar, kamu bisa menjumlahkan, mengurangkan, mengalikan, dan membagi suku-suku yang sejenis (suku dengan variabel yang sama).</p>
      <ul>
        <li>Penjumlahan: <code>3x + 2x = 5x</code></li>
        <li>Pengurangan: <code>5x - 3x = 2x</code></li>
        <li>Perkalian: <code>2 × 3x = 6x</code></li>
      </ul>
      <h4>Latihan Mandiri</h4>
      <p>Coba selesaikan: <code>4x - 5 = 11</code>. Berapa nilai x?</p>
    `
  },
  {
    id: "mat-02",
    kategori: "Matematika",
    emoji: "📊",
    judul: "Statistika Dasar",
    deskripsi: "Mean, median, modus, dan cara interpretasi data sederhana.",
    durasi: "25 menit",
    body: `
      <h4>Pengertian Statistika</h4>
      <p>Statistika adalah ilmu yang mempelajari cara mengumpulkan, mengolah, menganalisis, dan menyajikan data. Tiga ukuran pemusatan data yang paling umum adalah mean, median, dan modus.</p>
      <h4>Mean (Rata-rata)</h4>
      <p>Mean adalah jumlah semua nilai dibagi banyaknya data.</p>
      <p>Contoh: Data <code>4, 7, 3, 8, 3</code> → Mean = (4+7+3+8+3) / 5 = <code>5</code></p>
      <h4>Median (Nilai Tengah)</h4>
      <p>Median adalah nilai yang berada di tengah setelah data diurutkan.</p>
      <p>Contoh: Urutkan <code>3, 3, 4, 7, 8</code> → Median = <code>4</code></p>
      <h4>Modus (Nilai Terbanyak)</h4>
      <p>Modus adalah nilai yang paling sering muncul.</p>
      <p>Contoh: Data <code>3, 3, 4, 7, 8</code> → Modus = <code>3</code></p>
    `
  },
  {
    id: "mat-03",
    kategori: "Sains",
    emoji: "⚗️",
    judul: "Reaksi Kimia",
    deskripsi: "Konsep reaksi kimia, reaktan, produk, dan penyetaraan persamaan.",
    durasi: "30 menit",
    body: `
      <h4>Apa itu Reaksi Kimia?</h4>
      <p>Reaksi kimia adalah proses perubahan zat kimia (reaktan) menjadi zat baru (produk). Reaksi ini selalu melibatkan perubahan ikatan kimia antar atom.</p>
      <h4>Ciri-ciri Reaksi Kimia</h4>
      <ul>
        <li>Perubahan warna</li>
        <li>Terbentuknya endapan</li>
        <li>Terbentuknya gas</li>
        <li>Perubahan suhu (eksoterm/endoterm)</li>
      </ul>
      <h4>Persamaan Reaksi</h4>
      <p>Persamaan reaksi menggambarkan reaktan di kiri dan produk di kanan, dipisahkan tanda panah (→).</p>
      <p>Contoh: <code>2H₂ + O₂ → 2H₂O</code> (pembakaran hidrogen menghasilkan air)</p>
      <h4>Penyetaraan Persamaan</h4>
      <p>Jumlah atom di kiri harus sama dengan di kanan (Hukum Kekekalan Massa). Seimbangkan dengan mengatur koefisien reaksi.</p>
    `
  },
  {
    id: "mat-04",
    kategori: "Sains",
    emoji: "🔭",
    judul: "Tata Surya",
    deskripsi: "Planet, bintang, dan struktur tata surya kita.",
    durasi: "20 menit",
    body: `
      <h4>Struktur Tata Surya</h4>
      <p>Tata surya kita terdiri dari Matahari sebagai pusatnya, dikelilingi oleh 8 planet, bulan, asteroid, dan komet yang semuanya terikat oleh gravitasi Matahari.</p>
      <h4>Delapan Planet</h4>
      <ul>
        <li><strong>Merkurius</strong> — planet terkecil dan terdekat dari Matahari</li>
        <li><strong>Venus</strong> — planet terpanas akibat efek rumah kaca</li>
        <li><strong>Bumi</strong> — satu-satunya planet berpenghuni yang diketahui</li>
        <li><strong>Mars</strong> — planet merah dengan gunung tertinggi di tata surya</li>
        <li><strong>Jupiter</strong> — planet terbesar, memiliki 95 bulan</li>
        <li><strong>Saturnus</strong> — terkenal dengan cincin esnya yang indah</li>
        <li><strong>Uranus</strong> — berotasi miring hampir 90 derajat</li>
        <li><strong>Neptunus</strong> — planet terjauh dengan angin terkencang</li>
      </ul>
      <h4>Matahari</h4>
      <p>Matahari adalah bintang berukuran sedang yang menghasilkan energi melalui reaksi fusi nuklir. Diameternya sekitar 109 kali diameter Bumi.</p>
    `
  },
  {
    id: "mat-05",
    kategori: "Bahasa",
    emoji: "📝",
    judul: "Menulis Paragraf Efektif",
    deskripsi: "Cara menyusun paragraf yang kohesif dan mudah dipahami.",
    durasi: "15 menit",
    body: `
      <h4>Struktur Paragraf yang Baik</h4>
      <p>Sebuah paragraf yang efektif terdiri dari tiga komponen utama: kalimat topik, kalimat penjelas, dan kalimat penutup.</p>
      <h4>Kalimat Topik</h4>
      <p>Kalimat topik adalah kalimat pertama yang menyatakan ide utama paragraf. Semua kalimat lain harus mendukung ide ini.</p>
      <h4>Kalimat Penjelas</h4>
      <p>Kalimat penjelas memberikan detail, contoh, bukti, atau elaborasi dari kalimat topik. Gunakan kata penghubung seperti "selain itu", "misalnya", "dengan demikian".</p>
      <h4>Kalimat Penutup</h4>
      <p>Kalimat penutup merangkum atau menegaskan kembali ide utama dengan kata-kata yang berbeda. Jangan memperkenalkan ide baru di sini.</p>
      <h4>Tips Menulis</h4>
      <ul>
        <li>Satu paragraf, satu ide utama</li>
        <li>Gunakan kalimat pendek dan jelas</li>
        <li>Hindari kata-kata berlebihan</li>
        <li>Baca ulang untuk memastikan alur logis</li>
      </ul>
    `
  },
  {
    id: "mat-06",
    kategori: "Bahasa",
    emoji: "🗣️",
    judul: "Keterampilan Berbicara",
    deskripsi: "Teknik public speaking dan komunikasi yang percaya diri.",
    durasi: "25 menit",
    body: `
      <h4>Mengapa Public Speaking Penting?</h4>
      <p>Kemampuan berbicara di depan umum adalah salah satu skill paling berharga dalam kehidupan profesional maupun sosial. Ini bisa dipelajari dan ditingkatkan oleh siapa saja.</p>
      <h4>Teknik Dasar</h4>
      <ul>
        <li><strong>Persiapan</strong> — Kuasai materi dengan baik sebelum presentasi</li>
        <li><strong>Kontak Mata</strong> — Tatap audiens, jangan baca catatan terus</li>
        <li><strong>Intonasi</strong> — Variasikan nada suara agar tidak monoton</li>
        <li><strong>Jeda</strong> — Gunakan jeda strategis untuk penekanan</li>
        <li><strong>Gestur</strong> — Gunakan bahasa tubuh yang terbuka dan percaya diri</li>
      </ul>
      <h4>Mengatasi Rasa Gugup</h4>
      <p>Rasa gugup adalah hal normal. Tarik napas dalam sebelum mulai, fokus pada pesan yang ingin disampaikan bukan pada penilaian orang lain, dan ingat bahwa audiens ingin kamu berhasil.</p>
    `
  },
  {
    id: "mat-07",
    kategori: "Teknologi",
    emoji: "💻",
    judul: "Dasar-dasar HTML",
    deskripsi: "Struktur dokumen web, tag HTML, dan cara kerja browser.",
    durasi: "35 menit",
    body: `
      <h4>Apa itu HTML?</h4>
      <p>HTML (HyperText Markup Language) adalah bahasa markup standar untuk membuat halaman web. HTML mendefinisikan struktur dan konten halaman web menggunakan "tag".</p>
      <h4>Struktur Dasar HTML</h4>
      <p>Setiap dokumen HTML memiliki struktur dasar berikut:</p>
      <ul>
        <li><code>&lt;!DOCTYPE html&gt;</code> — deklarasi tipe dokumen</li>
        <li><code>&lt;html&gt;</code> — elemen root</li>
        <li><code>&lt;head&gt;</code> — metadata (judul, CSS, dll)</li>
        <li><code>&lt;body&gt;</code> — konten yang tampil di browser</li>
      </ul>
      <h4>Tag-tag Penting</h4>
      <ul>
        <li><code>&lt;h1&gt; - &lt;h6&gt;</code> — heading</li>
        <li><code>&lt;p&gt;</code> — paragraf</li>
        <li><code>&lt;a href=""&gt;</code> — tautan</li>
        <li><code>&lt;img src="" alt=""&gt;</code> — gambar</li>
        <li><code>&lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;</code> — daftar</li>
        <li><code>&lt;div&gt;, &lt;span&gt;</code> — container</li>
      </ul>
      <h4>Atribut HTML</h4>
      <p>Atribut memberikan informasi tambahan pada elemen. Contoh: <code>&lt;a href="https://example.com"&gt;Klik&lt;/a&gt;</code> — atribut <code>href</code> menentukan tujuan tautan.</p>
    `
  },
  {
    id: "mat-08",
    kategori: "Teknologi",
    emoji: "🎨",
    judul: "CSS untuk Pemula",
    deskripsi: "Styling web, selector, properti, dan box model CSS.",
    durasi: "30 menit",
    body: `
      <h4>Apa itu CSS?</h4>
      <p>CSS (Cascading Style Sheets) adalah bahasa yang digunakan untuk mendeskripsikan tampilan dan format dokumen HTML. Dengan CSS, kamu bisa mengubah warna, font, ukuran, tata letak, dan banyak lagi.</p>
      <h4>Cara Menerapkan CSS</h4>
      <ul>
        <li><strong>Inline</strong>: <code>&lt;p style="color: red;"&gt;</code></li>
        <li><strong>Internal</strong>: dalam tag <code>&lt;style&gt;</code> di head</li>
        <li><strong>Eksternal</strong>: file <code>.css</code> terpisah (direkomendasikan)</li>
      </ul>
      <h4>Selector CSS</h4>
      <ul>
        <li><code>p</code> — memilih semua elemen &lt;p&gt;</li>
        <li><code>.class-name</code> — memilih berdasarkan class</li>
        <li><code>#id-name</code> — memilih berdasarkan ID</li>
      </ul>
      <h4>Box Model</h4>
      <p>Setiap elemen HTML adalah kotak yang terdiri dari: <strong>content</strong> → <strong>padding</strong> → <strong>border</strong> → <strong>margin</strong>. Memahami box model adalah kunci untuk mengatur tata letak.</p>
    `
  }
];

const KUIS_DATA = [
  {
    id: "kuis-01",
    emoji: "📐",
    judul: "Kuis Aljabar",
    deskripsi: "Uji pemahaman aljabar dasarmu dengan 5 soal pilihan ganda.",
    kategori: "Matematika",
    waktu: 300,
    soal: [
      {
        pertanyaan: "Jika 3x + 6 = 18, maka nilai x adalah...",
        pilihan: ["2", "3", "4", "6"],
        jawaban: 2
      },
      {
        pertanyaan: "Bentuk sederhana dari 5x + 3x - 2x adalah...",
        pilihan: ["4x", "5x", "6x", "8x"],
        jawaban: 2
      },
      {
        pertanyaan: "Jika 2y - 4 = 10, maka nilai y adalah...",
        pilihan: ["5", "6", "7", "8"],
        jawaban: 2
      },
      {
        pertanyaan: "Hasil dari 4(x + 3) - 2x jika x = 2 adalah...",
        pilihan: ["12", "14", "16", "18"],
        jawaban: 2
      },
      {
        pertanyaan: "Persamaan yang benar untuk 'dua kali suatu bilangan ditambah 5 sama dengan 13' adalah...",
        pilihan: ["x + 5 = 13", "2x - 5 = 13", "2x + 5 = 13", "5x + 2 = 13"],
        jawaban: 2
      }
    ]
  },
  {
    id: "kuis-02",
    emoji: "⚗️",
    judul: "Kuis Kimia Dasar",
    deskripsi: "Soal pilihan ganda tentang reaksi kimia dan unsur.",
    kategori: "Sains",
    waktu: 240,
    soal: [
      {
        pertanyaan: "Zat yang bereaksi dalam suatu reaksi kimia disebut...",
        pilihan: ["Produk", "Reaktan", "Katalis", "Elektrolit"],
        jawaban: 1
      },
      {
        pertanyaan: "Rumus kimia air adalah...",
        pilihan: ["CO₂", "H₂O", "O₂", "NaCl"],
        jawaban: 1
      },
      {
        pertanyaan: "Reaksi kimia yang menghasilkan energi (panas) disebut reaksi...",
        pilihan: ["Endoterm", "Oksidasi", "Eksoterm", "Reduksi"],
        jawaban: 2
      },
      {
        pertanyaan: "Hukum yang menyatakan massa zat sebelum dan sesudah reaksi adalah sama disebut...",
        pilihan: ["Hukum Avogadro", "Hukum Boyle", "Hukum Kekekalan Massa", "Hukum Newton"],
        jawaban: 2
      },
      {
        pertanyaan: "Simbol kimia untuk emas adalah...",
        pilihan: ["Go", "Gd", "Au", "Ag"],
        jawaban: 2
      }
    ]
  },
  {
    id: "kuis-03",
    emoji: "🌍",
    judul: "Kuis Tata Surya",
    deskripsi: "Uji pengetahuanmu tentang planet dan benda langit.",
    kategori: "Sains",
    waktu: 240,
    soal: [
      {
        pertanyaan: "Planet manakah yang paling besar di tata surya?",
        pilihan: ["Saturnus", "Neptunus", "Jupiter", "Uranus"],
        jawaban: 2
      },
      {
        pertanyaan: "Planet yang dikenal dengan cincinnya yang paling indah adalah...",
        pilihan: ["Jupiter", "Saturnus", "Uranus", "Neptunus"],
        jawaban: 1
      },
      {
        pertanyaan: "Planet manakah yang paling dekat dengan Matahari?",
        pilihan: ["Venus", "Bumi", "Mars", "Merkurius"],
        jawaban: 3
      },
      {
        pertanyaan: "Bumi mengelilingi Matahari dalam waktu...",
        pilihan: ["24 jam", "28 hari", "365 hari", "100 hari"],
        jawaban: 2
      },
      {
        pertanyaan: "Planet terpanas di tata surya adalah...",
        pilihan: ["Merkurius", "Venus", "Mars", "Bumi"],
        jawaban: 1
      }
    ]
  },
  {
    id: "kuis-04",
    emoji: "💻",
    judul: "Kuis HTML & CSS",
    deskripsi: "Tes pemahamanmu tentang dasar-dasar web development.",
    kategori: "Teknologi",
    waktu: 300,
    soal: [
      {
        pertanyaan: "Kepanjangan dari HTML adalah...",
        pilihan: ["Hyper Text Making Language", "HyperText Markup Language", "High Text Markup Language", "HyperText Making Link"],
        jawaban: 1
      },
      {
        pertanyaan: "Tag HTML yang digunakan untuk membuat tautan (link) adalah...",
        pilihan: ["<link>", "<url>", "<a>", "<href>"],
        jawaban: 2
      },
      {
        pertanyaan: "Dalam CSS, cara memilih elemen berdasarkan class adalah...",
        pilihan: ["#nama-class", ".nama-class", "*nama-class", "@nama-class"],
        jawaban: 1
      },
      {
        pertanyaan: "Tag HTML yang digunakan untuk gambar adalah...",
        pilihan: ["<picture>", "<image>", "<photo>", "<img>"],
        jawaban: 3
      },
      {
        pertanyaan: "Properti CSS untuk mengubah warna teks adalah...",
        pilihan: ["text-color", "font-color", "color", "text-style"],
        jawaban: 2
      }
    ]
  }
];

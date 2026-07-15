# Project Issues & Tasks: Personal Productivity Space

Di bawah ini adalah daftar issue terstruktur untuk proses development aplikasi dari awal hingga selesai. Kamu bisa menyalin daftar ini ke GitHub Issues atau Kanban board pilihanmu.

---

## 🛠️ EPIC 1: Project Setup & Routing

### [TASK] #1: Initialize Vue 3 Project & Install Dependencies
**Description:** Inisialisasi project Vue 3 baru dengan konfigurasi standar dan install library pendukung yang dibutuhkan.

**To-Do:**
- [ ] Install dan konfigurasi Tailwind CSS untuk styling.
- [ ] Install `js-cookie` untuk kemudahan manipulasi cookies di client-side.

---

### [TASK] #2: Setup Routing & Navigation Guards
**Description:** Konfigurasi router agar user tidak bisa langsung mengakses halaman space jika belum menentukan nama space (belum ada cookie).

**To-Do:**
- [ ] Buat route `/` yang mengarah ke `LandingPage.vue`.
- [ ] Buat route `/:spaceName` yang mengarah ke `SpaceWorkspace.vue`.
- [ ] Implementasikan Navigation Guard (`router.beforeEach`):
  - Jika user mencoba masuk ke `/:spaceName` tetapi cookie nama space kosong/tidak cocok, arahkan kembali ke `/`.
  - Jika user sudah punya cookie space dan mengakses `/`, langsung redirect ke `/:spaceName`.

---

## 🚪 EPIC 2: Landing Gate (Space Creation)

### [TASK] #3: Create Landing Page Component & Cookie Handler
**Description:** Membuat UI Landing Page minimalis yang meminta user memasukkan nama space sebelum masuk ke workspace utama.

**To-Do:**
- [ ] Buat input teks untuk nama space beserta tombol "Enter Space".
- [ ] Tambahkan validasi input (tidak boleh kosong, tidak boleh mengandung karakter khusus/spasi).
- [ ] Implementasikan handler ketika form di-submit:
  - Simpan value input ke dalam Cookie (key: `user_space_name`, expires: 7 hari).
  - Lakukan routing secara programmatik ke `/:spaceName` sesuai dengan input user.

---

## 📝 EPIC 3: Core Features - Space Page

### [TASK] #4: Setup Dashboard Layout & Theme
**Description:** Membuat layout dasar (dashboard grid) pada halaman `SpaceWorkspace.vue` untuk menampung ketiga fitur utama.

**To-Do:**
- [ ] Buat header yang menampilkan nama space aktif (diambil dari parameter URL atau cookie).
- [ ] Buat layout grid responsive (contoh: 3 kolom di desktop, 1 kolom di mobile).
- [ ] Siapkan placeholder card untuk To-Do List, Pomodoro, dan Music Corner.

---

### [TASK] #5: Implement To-Do List with Pinia
**Description:** Membangun fitur manajemen tugas menggunakan Pinia store agar datanya terpusat.

**To-Do:**
- [ ] Buat file `useTodoStore.js` di dalam direktori Pinia store.
- [ ] Definisikan state `todos` (array of objects: `{ id, text, isCompleted }`).
- [ ] Buat actions: `addTodo(text)`, `toggleTodo(id)`, `deleteTodo(id)`.
- [ ] *(Optional but recommended)* Gunakan plugin `pinia-plugin-persistedstate` atau sync manual state Pinia dengan `localStorage`.
- [ ] Buat UI `TodoList.vue` dengan form input tugas baru dan daftar tugas yang bisa di-checklist serta dihapus.

---

### [TASK] #6: Implement Pomodoro Timer Component
**Description:** Membuat widget Pomodoro Timer fungsional dengan sirkulasi waktu fokus dan istirahat.

**To-Do:**
- [ ] Buat komponen `PomodoroTimer.vue`.
- [ ] Set up state lokal untuk mengontrol detik tersisa (`timeLeft`), status aktif (`isRunning`), dan mode saat ini (`isBreakMode`).
- [ ] Implementasikan fungsi `startTimer`, `pauseTimer`, dan `resetTimer` menggunakan `setInterval`.
- [ ] Buat transisi otomatis: jika waktu fokus habis (25:00 -> 00:00), otomatis ganti ke mode istirahat (05:00) dan sebaliknya.
- [ ] Tambahkan audio cue sederhana (misal bunyi bel/beep) saat waktu habis.

---

### [TASK] #7: Implement Music Corner Component (Lo-Fi Player)
**Description:** Membuat widget audio player sederhana yang memutar daftar musik Lo-Fi tanpa hak cipta.

**To-Do:**
- [ ] Siapkan dataset lagu lo-fi minimalis (bisa menggunakan direct link audio MP3 dari public source/cloud storage).
- [ ] Buat komponen `MusicCorner.vue` menggunakan HTML5 `<audio>` element (akses via Vue `ref`).
- [ ] Hubungkan kontrol UI kustom (Play/Pause, Next, Previous) dengan objek audio.
- [ ] Tambahkan volume slider untuk mengatur kekerasan suara.
- [ ] Tampilkan informasi judul lagu dan artis yang sedang aktif diputar.

---

## 🎨 EPIC 4: Polish & Refinement

### [TASK] #8: Styling & Micro-interactions
**Description:** Merapikan visual secara keseluruhan agar workspace terasa nyaman digunakan berjam-jam (aesthetic & cozy vibe).

**To-Do:**
- [ ] Terapkan palette warna yang menenangkan (misal tema dark mode cozy atau pastel hangat).
- [ ] Berikan transisi halus saat item to-do dicoret atau dihapus.
- [ ] Sediakan tombol "Change Space" di header untuk menghapus cookie dan kembali ke halaman Landing Gate secara aman.
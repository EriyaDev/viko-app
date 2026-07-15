Product Requirement Document (PRD)Project Name: Personal Space Productivity AppTech Stack Recommended: Vue 3 (Composition API), Vue Router, Pinia, Tailwind CSS, js-cookie (atau Native Cookie API)

1. Overview & Objective
Aplikasi ini adalah all-in-one productivity workspace berbasis web yang minimalis dan estetik. Pengguna dapat membuat "Space" pribadi mereka sendiri melalui URL unik, di mana di dalamnya terdapat tiga fitur utama untuk mendukung produktivitas dan fokus: To-Do List, Pomodoro Timer, dan Music Corner (Pemutar musik Lo-Fi).

2. User Flow & Core Features

User Flow Diagram (Mental Model)
Landing Page (/): User menginput nama Space -> Nama disimpan di Cookie -> Redirect ke /space/:spaceName.
Space Page (/:spaceName): Membaca parameter URL & Cookie -> Jika valid, tampilkan 3 widget utama dalam satu dashboard. Jika tidak valid/cookie kosong, redirect kembali ke /.

Feature Specifications
Fitur	Deskripsi	Kebutuhan Teknis / State
Landing Gate & Cookies	Form input nama space dengan validasi karakter alphanumeric saja.	Simpan nama space di cookie (durasi default: 7 hari). Redirect menggunakan Vue Router.
To-Do List	Pencatatan tugas harian yang interaktif.	State dikelola menggunakan Pinia Store. Fitur: Tambah, hapus, dan toggle selesai (complete).
Pomodoro Timer	Timer fokus dengan mode Kerja (25 mnt) dan Istirahat (5 mnt).	State lokal/Pinia. Play, Pause, Reset, dan pergantian fase otomatis disertai audio cue/notifikasi sederhana.
Music Corner	Mini audio player yang menyediakan daftar lagu Lo-Fi terkurasi.	Menggunakan HTML5 <audio> element. Fitur: Play, Pause, Next/Prev track, dan Volume Control.

3. Non-Functional Requirements

Responsiveness: Tampilan harus bersahabat di layar mobile (tumpuk vertikal) maupun desktop (layout grid/dashboard).
Performance: Transisi antar-elemen mulus, terutama saat memutar audio atau menjalankan timer tanpa ada blocking lag.
State Persistence: Data to-do list di Pinia disarankan terintegrasi dengan localStorage agar tidak hilang saat halaman di-refresh.
# 📸 CatMedia

CatMedia adalah aplikasi web modern yang dibangun menggunakan **Laravel** sebagai backend dan **React.js** melalui **Inertia.js** sebagai frontend. Proyek ini menggabungkan kekuatan Laravel dan fleksibilitas React dalam pengalaman Single Page Application (SPA) tanpa API tambahan.

---

## 🚀 Teknologi yang Digunakan

- ⚙️ Laravel (PHP Backend Framework)
- 🔄 Inertia.js (Bridge antara Laravel & React)
- ⚛️ React.js (Frontend UI)
- 🎨 Tailwind CSS (Opsional untuk styling)
- ⚡ Vite (Bundler modern)

---

## 📂 Struktur Proyek

CatMedia/
├── app/ # Kode backend Laravel
├── resources/
│ ├── js/
│ │ ├── Pages/ # Komponen React untuk setiap halaman
│ │ └── App.jsx # Entry point React
│ └── views/ # File blade utama Inertia
├── routes/web.php # Rute aplikasi Laravel
├── database/ # Migration dan Seeder
├── public/
└── ...

---

## 🛠️ Instalasi

1. **Clone repository:**
   ```bash
   git clone https://github.com/Rezeon/CatMedia.git
   cd CatMedia
2.Install dependency:
composer install
npm install

3.Setup environment:
cp .env.example .env
php artisan key:generate

4.Jalankan migrasi database:
php artisan migrate

5.Compile asset React:
npm run dev    # mode development
npm run build  # mode produksi

6.Jalankan Server Lokal:
php artisan serve

#####

 *Fitur (Roadmap)
 -Autentikasi pengguna
 -Postingan media (gambar/video)
 -Like & komentar
 -Sistem pertemanan
 -Chat pengguna (realtime)
 -Upload foto profile

*Kebutuhan Sistem
-PHP 8.1+
-Composer
-Node.js 18+
-NPM
-MySQL / PostgreSQL

📄 Lisensi
Lisensi: MIT

👤 Developer
Rheyno Fernando Velga Wesi Aji
📍 Solo, Jawa Tengah
📧 Rheynoternando@gmail.com
🐙 GitHub - Rezeon

# Backend Marketplace Katering (Laravel REST API)

Proyek ini adalah backend (sisi server) untuk aplikasi **Marketplace Katering**, dibangun sepenuhnya menggunakan framework PHP **Laravel 11.x**. Backend ini bertugas menyediakan API endpoints (RESTful) untuk dikonsumsi secara terpisah (decoupled) oleh sisi Frontend.

## 🚀 Fitur Utama
- **Arsitektur API Murni**: Mengirim dan menerima data dalam format JSON.
- **Autentikasi Aman**: Logika regristrasi dan sesi otorisasi multi-peran (JWT/Cookie/Sanctum based concept).
- **Relasi Database (Eloquent ORM)**: Relasi antar entitas kompleks seperti `Users`, `Customers`, `Merchants`, `Menus`, `Orders`, dan `Invoices`.
- **Tidak Bergantung pada Builder**: Seluruh logika `Controller` dan `Model` ditulis khusus untuk sistem (TIDAK menggunakan auto-CRUD library semacam Filament).

## 🛠️ Persyaratan Sistem
- PHP >= 8.2
- Composer
- MySQL/MariaDB

## 📦 Cara Memulai (Setup Lokal)

1. **Masuk ke folder backend**  
   ```bash
   cd backend
   ```

2. **Instal dependensi project**  
   ```bash
   composer install
   ```

3. **Salin konfigurasi Environment**  
   Salin file `.env.example` menjadi `.env` (Jika belum ada).  
   Sesuaikan `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` dengan database lokal Anda.

4. **Generate Application Key**  
   ```bash
   php artisan key:generate
   ```

5. **Jalankan Migrasi Database**  
   ```bash
   php artisan migrate
   ```

6. **Jalankan Server Lokal Laravel**  
   ```bash
   php artisan serve
   ```  
   *Server backend akan berjalan di `http://127.0.0.1:8000` dan siap diakses oleh Frontend Vite.*

---
**Catatan untuk Pengevaluasi:**  
Backend ini sengaja dipisahkan secara monolitik dari *views* reguler (`resources/views`) untuk menunjukkan pemahaman arsitektur *Headless/Decoupled modern*. Seluruh rute dapat dilihat di `routes/web.php` atau `routes/api.php`.

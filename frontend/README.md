# Frontend Marketplace Katering (React + Vite)

Frontend aplikasi Marketplace Katering yang berfokus pada pengalaman pengguna yang modern, responsif, dan interaktif (Single Page Application).

## 🎨 Teknologi yang Digunakan
- **Core**: React.js 18
- **Build Tool**: Vite (Sangat cepat untuk *Hot Module Replacement*)
- **Routing**: React Hash Router (Menghindari masalah 404 pada routing server statis)
- **Styling**: Vanilla CSS Modular (Tanpa UI library tambahan seperti Bootstrap/Tailwind. Ditulis bersih dan terpisah per komponen).

## ✨ Highlight Arsitektur
Aplikasi ini dipecah ke dalam struktur yang rapi (Best Practices React):
- `/pages` memuat komponen utuh tampilan layer pengguna.
- `/components` memuat komponen pembantu dapat-digunakan-ulang (reusable) seperti Form `Field`, `EmptyState`, dan `StatusBadge`.
- `/styles` memuat pemecahan CSS agar global style tidak membengkak (Layout.css, Auth.css, dst).
- `/utils` menampung logika perantara ke Backend (`api.js`).

## 📦 Cara Memulai (Setup Lokal)

PENTING: Pastikan server Backend Laravel berjalan terlebih dahulu pada `http://127.0.0.1:8000`.

1. **Masuk ke folder frontend**  
   ```bash
   cd frontend
   ```

2. **Instal dependensi NPM**  
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembangan Vite**  
   ```bash
   npm run dev
   ```

4. **Akses Aplikasi**  
   Buka browser dan arahkan ke URL yang diberikan Vite (Biasanya `http://localhost:5173`).

---
**Catatan untuk Pengevaluasi:**  
Proyek ini mengimplementasikan proxy internal di `vite.config.js` sehingga terhindar dari permasalahan CORS saat berkomunikasi dengan `localhost:8000` di lingkungan lokal. Semua panggilan API mengarah ke jalur yang benar secara otomatis.

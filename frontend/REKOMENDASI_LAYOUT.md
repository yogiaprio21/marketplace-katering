# Rekomendasi Optimalisasi Layout & UX

## Evaluasi Layout Dua Kolom (Register)
- Layout dua kolom efektif di desktop untuk memisahkan form dan panel edukasi.
- Di tablet/mobile, kolom wajib ditumpuk vertikal agar fokus tetap pada form.
- Gunakan grid dengan breakpoint min-width 960px untuk menjaga keterbacaan field.

## Rekomendasi Layout Responsif
- Desktop: gunakan grid dua kolom untuk area yang berisi form dan informasi pendukung.
- Tablet: pertahankan satu kolom tetapi tetap gunakan grid untuk merapikan spacing.
- Mobile: fokus pada alur satu kolom dengan tombol aksi penuh lebar.

## Pedoman Spacing & Grid
- Gunakan jarak vertikal konsisten 16–24px antar section.
- Terapkan grid form 2 kolom pada layar ≥640px, dengan field penting melebar penuh.
- Hindari inline style; gunakan kelas utilitas agar mudah dirawat.

## Pedoman Typography
- Judul utama gunakan ukuran clamp agar tetap proporsional di berbagai layar.
- Subjudul gunakan warna muted dan ukuran lebih kecil dari body.
- Pastikan heading selalu diikuti deskripsi singkat untuk konteks halaman.

## Pedoman Warna & Kontras
- Warna utama untuk CTA; warna muted untuk teks pendukung.
- Pastikan rasio kontras memadai di dark mode, terutama label dan input.
- Gunakan satu variasi warna aksen agar hierarki visual tetap jelas.

## Pedoman Komponen UI
- Form: gunakan input dengan tinggi minimum 44px untuk kenyamanan tap.
- Card: gunakan radius konsisten dan shadow ringan agar fokus konten meningkat.
- CTA: tombol utama selalu ditempatkan pada akhir form dengan lebar penuh.

## Konsistensi Antar Halaman
- Gunakan kelas layout global (container, page, card, grid) di semua halaman.
- Standarisasi empty state dan pesan feedback agar UX terasa seragam.
- Buat satu pola header halaman yang digunakan di semua modul.

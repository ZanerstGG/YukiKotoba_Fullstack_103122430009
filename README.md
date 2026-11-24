### Nama: Izzan Maula Rifqi 
### NIM: 103122430009
<br>

# ❄️ YukiKotoba

<p align="center">
  <strong>Belajar bahasa Jepang dengan langkah kecil, materi terarah, dan latihan yang menyenangkan.</strong>
</p>

<p align="center">
  <a href="#fitur-utama">Fitur</a> ·
  <a href="#arsitektur">Arsitektur</a> ·
  <a href="#dokumentasi-api">API</a> ·
  <a href="#menjalankan-proyek">Menjalankan proyek</a> ·
  <a href="#pengujian">Pengujian</a>
</p>

YukiKotoba adalah aplikasi web **fullstack** untuk belajar bahasa Jepang bagi pemula. Pengguna dapat menjelajahi huruf Jepang, kanji dasar, latihan kuis, dan mengelola daftar kosakata pribadi.

Proyek ini terdiri dari dua bagian yang berjalan terpisah:

- **Frontend** (`frontend/`): antarmuka web dengan React dan Vite.
- **Backend** (`backend/`): REST API dengan NestJS yang mengikuti pola MVC dan mengelola data **Kosakata**.

| Informasi | Keterangan |
|---|---|
| Mata kuliah | Perancangan dan Pemrograman Web |
| Tugas | Bab 9: NestJS Dasar + Struktur MVC |
| NIM | 103122430009 |

## Fitur Utama

- **Peta level** untuk melihat perjalanan belajar secara bertahap.
- **Materi Hiragana, Katakana, dan Kanji dasar** yang mudah dijelajahi.
- **Kosakata praktis** lengkap dengan romaji, arti, kategori, level JLPT, dan pelafalan.
- **Kelola kosakata lewat backend**: menambah kosakata baru, menandai kosakata yang sudah dihafal, dan menghapus kosakata. Semua perubahan tersimpan di server.
- **Pesan error yang jelas** saat data tidak valid, kosakata duplikat, atau server tidak dapat dihubungi.
- **Latihan kuis dan lencana** untuk menjaga motivasi belajar.
- **Mode terang/gelap** dan **efek sakura** agar suasana belajar lebih nyaman.

> Pelafalan menggunakan fitur *Speech Synthesis* pada browser. Ketersediaan suara bahasa Jepang dapat berbeda pada setiap perangkat dan browser.

## Arsitektur

```text
┌──────────────────────┐   HTTP + JSON    ┌────────────────────────┐
│  Frontend (React)    │ ───────────────► │  Backend (NestJS)      │
│  localhost:5173      │ ◄─────────────── │  localhost:3001        │
│                      │                  │                        │
│  pages/Kosakata.jsx  │                  │  KosakataController    │
│  hooks/useKosakata   │                  │        │               │
│  services/kosakataApi│                  │  KosakataService       │
└──────────────────────┘                  │        │               │
                                          │  Array di memori       │
                                          └────────────────────────┘
```

Frontend tidak pernah menyimpan data kosakata sendiri. Semua data diambil dan diubah melalui REST API di backend.

### Pola MVC pada Backend

| Bagian NestJS | File | Peran | Padanan MVC |
|---|---|---|---|
| Module | `kosakata.module.ts` | Mengelompokkan controller dan service fitur Kosakata | — |
| Controller | `kosakata.controller.ts` | Menerima request HTTP dan menentukan rute | Controller |
| Service | `kosakata.service.ts` | Logika bisnis dan penyimpanan data (CRUD) | Model (logika) |
| Entity | `entities/kosakata.entity.ts` | Bentuk satu data Kosakata | Model (data) |
| DTO | `dto/create-kosakata.dto.ts`, `dto/update-kosakata.dto.ts` | Bentuk dan aturan validasi data dari client | — |
| Respons JSON | — | Hasil yang dikirim ke frontend | View |

Controller memanggil Service melalui **dependency injection**: `KosakataService` didaftarkan sebagai provider di `KosakataModule`, lalu disediakan oleh NestJS lewat constructor Controller.

### Data Utama: Kosakata

| Field | Tipe | Keterangan |
|---|---|---|
| `id` | `string` | UUID yang dibuat otomatis oleh backend |
| `nihongo` | `string` | Tulisan Jepang, harus unik |
| `romaji` | `string` | Cara baca dalam huruf Latin |
| `arti` | `string` | Arti dalam bahasa Indonesia |
| `category` | `string` | Kategori, misalnya "Salam & Sopan Santun" |
| `tag` | `string \| null` | Keterangan tambahan (opsional) |
| `level` | `'N5' \| 'N4' \| 'N3' \| 'N2' \| 'N1'` | Level JLPT, bawaan `N5` |
| `sudahHafal` | `boolean` | Status hafalan, bawaan `false` |
| `createdAt` | `string` | Waktu dibuat (ISO 8601) |
| `updatedAt` | `string` | Waktu terakhir diubah (ISO 8601) |

Saat backend dijalankan, 30 kosakata awal (salam, keluarga, makanan, dan perjalanan) otomatis dimuat dari `backend/src/kosakata/data/kosakata-awal.ts`.

## Dokumentasi API

Base URL: `http://localhost:3001`

| Method | Endpoint | Keterangan | Status berhasil |
|---|---|---|---|
| `GET` | `/kosakata` | Mengambil semua kosakata (terbaru di atas) | `200 OK` |
| `GET` | `/kosakata/:id` | Mengambil satu kosakata berdasarkan id | `200 OK` |
| `POST` | `/kosakata` | Menambah kosakata baru | `201 Created` |
| `PATCH` | `/kosakata/:id` | Mengubah sebagian data kosakata | `200 OK` |
| `DELETE` | `/kosakata/:id` | Menghapus kosakata | `200 OK` |

Contoh body untuk `POST /kosakata`:

```json
{
  "nihongo": "ねこ",
  "romaji": "neko",
  "arti": "Kucing",
  "category": "Hewan",
  "tag": "Peliharaan",
  "level": "N5"
}
```

Contoh body untuk `PATCH /kosakata/:id` (cukup kirim field yang ingin diubah):

```json
{
  "sudahHafal": true
}
```

### Validasi Data

Validasi menggunakan `class-validator` pada DTO dan `ValidationPipe` yang aktif secara global.

| Field | Aturan |
|---|---|
| `nihongo`, `romaji`, `arti`, `category` | Wajib, berupa teks, tidak boleh kosong, dan dibatasi panjangnya (`@IsString`, `@IsNotEmpty`, `@MaxLength`) |
| `tag` | Opsional, berupa teks (`@IsOptional`, `@IsString`, `@MaxLength`) |
| `level` | Opsional, harus salah satu dari N5, N4, N3, N2, N1 (`@IsIn`) |
| `sudahHafal` | Opsional, harus `true` atau `false` (`@IsBoolean`) |

Field di luar daftar di atas (misalnya `id` atau `createdAt`) akan ditolak, sehingga client tidak dapat mengubah data yang dikelola server.

### Penanganan Error

| Status | Exception | Kapan terjadi |
|---|---|---|
| `404 Not Found` | `NotFoundException` | Kosakata dengan id tersebut tidak ditemukan |
| `409 Conflict` | `ConflictException` | Tulisan Jepang (`nihongo`) yang sama sudah ada |
| `400 Bad Request` | `ValidationPipe` | Data tidak lolos aturan validasi DTO |
| `400 Bad Request` | `ParseUUIDPipe` | Format id bukan UUID |

Contoh respons error:

```json
{
  "message": "Kosakata \"ねこ\" sudah ada",
  "error": "Conflict",
  "statusCode": 409
}
```

## Teknologi

| Bagian | Teknologi |
|---|---|
| Frontend | [React](https://react.dev/) 19, [Vite](https://vite.dev/) 8, [Bootstrap](https://getbootstrap.com/) 5 dan Bootstrap Icons, Web Speech API |
| Backend | [NestJS](https://nestjs.com/) 12, TypeScript, class-validator, class-transformer |
| Pengujian | [Vitest](https://vitest.dev/), Supertest, ekstensi REST Client |
| Kualitas kode | ESLint (frontend), Oxlint (backend) |

## Menjalankan Proyek

### Prasyarat

- [Node.js](https://nodejs.org/) 22 LTS atau lebih baru (disarankan 24 LTS)
- npm

### 1. Jalankan backend

```bash
cd backend
npm install
npm run start:dev
```

Backend berjalan di `http://localhost:3001`.

### 2. Jalankan frontend

Buka terminal kedua, lalu jalankan:

```bash
cd frontend
npm install
npm run dev
```

Buka `http://localhost:5173` di browser, lalu pilih menu **語 Kosakata** untuk mengelola kosakata.

> Backend dan frontend harus berjalan bersamaan. Data kosakata disimpan di memori, sehingga akan kembali ke 30 kosakata awal setiap kali backend di-restart.

### Konfigurasi (opsional)

| Variabel | Lokasi | Nilai bawaan | Keterangan |
|---|---|---|---|
| `PORT` | backend | `3001` | Port server backend |
| `FRONTEND_URL` | backend | `http://localhost:5173` | Alamat frontend yang diizinkan oleh CORS |
| `VITE_API_URL` | frontend (`.env`) | `http://localhost:3001` | Alamat backend yang dipanggil frontend (lihat `frontend/.env.example`) |

## Pengujian

### Backend

```bash
cd backend
npm run lint        # memeriksa kualitas kode
npm test            # unit test Service, Controller, dan DTO (19 test)
npm run test:e2e    # e2e test skenario error 404, 409, dan 400 (5 test)
```

### Pengujian Manual dengan REST Client

File [`backend/http/kosakata.http`](backend/http/kosakata.http) berisi 9 request untuk menguji semua endpoint, termasuk skenario error. Cara menggunakannya:

1. Pasang ekstensi **REST Client** (Huachao Mao) di VS Code.
2. Jalankan backend dengan `npm run start:dev`.
3. Buka `kosakata.http`, lalu klik **Send Request** di atas setiap request secara berurutan.

### Frontend

```bash
cd frontend
npm run lint        # memeriksa kualitas kode
npm run build       # membuat build produksi
```

## Struktur Proyek

```text
YukiKotoba_JapaneseStudy_103122430009/
├── README.md
├── backend/                      # REST API NestJS
│   ├── http/
│   │   └── kosakata.http         # Pengujian endpoint dengan REST Client
│   ├── src/
│   │   ├── kosakata/
│   │   │   ├── data/             # Data awal kosakata
│   │   │   ├── dto/              # DTO dan aturan validasi
│   │   │   ├── entities/         # Entity Kosakata
│   │   │   ├── kosakata.controller.ts
│   │   │   ├── kosakata.module.ts
│   │   │   ├── kosakata.service.ts
│   │   │   └── *.spec.ts         # Unit test
│   │   ├── app.module.ts         # Module akar
│   │   └── main.ts               # Titik masuk: port, CORS, ValidationPipe
│   ├── test/                     # E2E test
│   └── package.json
├── docs/
│   ├── daftar-screenshot.md      # Daftar dan judul screenshot pengerjaan tugas
│   ├── images/                   # Gambar untuk README
│   └── screenshots/              # Screenshot pengerjaan tugas
└── frontend/                     # Aplikasi React + Vite
    ├── public/                   # Aset publik (favicon, gambar banner)
    ├── src/
    │   ├── components/           # Komponen antarmuka (form dan daftar kosakata, dll.)
    │   ├── data/                 # Data materi Hiragana, Katakana, Kanji, kuis, lencana
    │   ├── hooks/                # useKosakata: state dan aksi data kosakata
    │   ├── pages/                # Halaman materi dan latihan
    │   ├── services/             # kosakataApi: pemanggilan REST API ke backend
    │   ├── utils/                # Utilitas, termasuk pelafalan
    │   └── App.jsx               # Navigasi dan tema aplikasi
    ├── .env.example
    └── package.json
```

## Dokumentasi Pengerjaan

Screenshot setiap tahapan pengerjaan Tugas 9 tersimpan di [`docs/screenshots/`](docs/screenshots/). Judul dan urutan setiap screenshot tercantum di [`docs/daftar-screenshot.md`](docs/daftar-screenshot.md).

---

<p align="center">Dibuat untuk menemani langkah pertama belajar bahasa Jepang. がんばりましょう！</p>

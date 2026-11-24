# Daftar Screenshot Tugas 9 — NestJS Dasar + Struktur MVC

Semua file berada di folder [`screenshots/`](screenshots/). Kolom **Bagian** mengikuti nomor langkah pada soal Tugas 9.

| No | File | Judul | Bagian |
|----|------|-------|--------|
| 1 | `01-instalasi-nest-cli.png` | Instalasi Nest CLI dan pengecekan versi Node.js, npm, dan Nest | Persiapan |
| 2 | `02-struktur-folder-backend.png` | Struktur folder proyek backend NestJS dan port 3001 pada `main.ts` | Persiapan |
| 3 | `03-server-nestjs-berjalan.png` | Server NestJS berjalan di `http://localhost:3001` | Persiapan |
| 4 | `04-generate-resource-kosakata.png` | Membuat resource Kosakata dengan `nest g resource kosakata` | Langkah 1–2: Data utama dan resource |
| 5 | `05-entity-kosakata.png` | Entity `Kosakata` dengan 10 field dan tipe data yang bervariasi | Langkah 2: Entity |
| 6 | `06-service-crud.png` | Service Kosakata dengan operasi CRUD (create, findAll, findOne, update, remove) di array memori | Langkah 3: Service |
| 7 | `07-unit-test-service.png` | Hasil unit test Service Kosakata dengan Vitest (8 test lulus) | Langkah 3: Service (tambahan) |
| 8 | `08-controller-kosakata.png` | Controller Kosakata dengan method GET, POST, PATCH, DELETE dan dependency injection Service | Langkah 4: Controller |
| 9 | `09-route-terdaftar.png` | Server NestJS memetakan rute GET, POST, PATCH, DELETE untuk `/kosakata` | Langkah 4: Controller |
| 10 | `10-dto-validasi.png` | DTO `CreateKosakataDto` dengan aturan class-validator (`@IsString`, `@IsNotEmpty`, `@MaxLength`, `@IsIn`, `@IsBoolean`, `@IsOptional`) | Langkah 5: DTO dan validasi |
| 11 | `11-validation-pipe-global.png` | Mengaktifkan `ValidationPipe` secara global di `main.ts` | Langkah 5: DTO dan validasi |
| 12 | `12-unit-test-dto.png` | Hasil unit test validasi DTO (17 test lulus) | Langkah 5: DTO dan validasi (tambahan) |
| 13 | `13-exception-handling.png` | `NotFoundException` dan `ConflictException` di Service Kosakata | Langkah 6: Penanganan error |
| 14 | `14-e2e-test-error.png` | Hasil e2e test skenario error 404, 409, dan 400 (5 test lulus) | Langkah 6: Penanganan error (tambahan) |
| 15 | `15-rest-post-tambah.png` | REST Client: POST `/kosakata` menambah kosakata (201 Created) | Langkah 7: Pengujian REST Client |
| 16 | `16-rest-get-semua.png` | REST Client: GET `/kosakata` mengambil semua kosakata (200 OK) | Langkah 7: Pengujian REST Client |
| 17 | `17-rest-get-satu.png` | REST Client: GET `/kosakata/:id` mengambil satu kosakata (200 OK) | Langkah 7: Pengujian REST Client |
| 18 | `18-rest-patch-ubah.png` | REST Client: PATCH `/kosakata/:id` mengubah kosakata (200 OK) | Langkah 7: Pengujian REST Client |
| 19 | `19-rest-error-409.png` | REST Client: menambah kosakata duplikat ditolak (409 Conflict) | Langkah 7: Pengujian REST Client (error) |
| 20 | `20-rest-delete-hapus.png` | REST Client: DELETE `/kosakata/:id` menghapus kosakata (200 OK) | Langkah 7: Pengujian REST Client |
| 21 | `21-rest-error-404.png` | REST Client: kosakata yang sudah dihapus tidak ditemukan (404 Not Found) | Langkah 7: Pengujian REST Client (error) |
| 22 | `22-rest-error-400-validasi.png` | REST Client: data tidak lolos validasi DTO (400 Bad Request) | Langkah 7: Pengujian REST Client (error) |
| 23 | `23-rest-error-400-uuid.png` | REST Client: format id bukan UUID (400 Bad Request) | Langkah 7: Pengujian REST Client (error, tambahan) |
| 24 | `24-cors-main.png` | Mengaktifkan CORS di `main.ts` agar frontend (`localhost:5173`) dapat mengakses backend | Langkah 8: Integrasi frontend |
| 25 | `25-data-awal-backend.png` | Data awal kosakata kini disediakan backend di `GET /kosakata` | Langkah 8: Integrasi frontend |
| 26 | `26-api-service-frontend.png` | Service API frontend (`kosakataApi.js`) untuk GET, POST, PATCH, DELETE ke backend | Langkah 8: Integrasi frontend |
| 27 | `27-frontend-memuat-data-backend.png` | Halaman Kosakata memuat 30 kosakata dari backend (`GET /kosakata` di tab Network) | Langkah 8: Integrasi frontend |
| 28 | `28-frontend-tambah-kosakata.png` | Alur menambah data: kosakata baru tersimpan lewat `POST /kosakata` (201) dan tampil di daftar | Langkah 8: Integrasi frontend (tambah data) |
| 29 | `29-frontend-error-duplikat.png` | Pesan error dari backend tampil di form saat kosakata duplikat (409) | Langkah 8: Integrasi frontend (error) |
| 30 | `30-frontend-ubah-hafal.png` | Alur mengubah data: menandai kosakata sudah dihafal lewat `PATCH /kosakata/:id` (200) | Langkah 8: Integrasi frontend (ubah data) |
| 31 | `31-frontend-konfirmasi-hapus.png` | Dialog konfirmasi sebelum menghapus kosakata | Langkah 8: Integrasi frontend (hapus data) |
| 32 | `32-frontend-hapus-berhasil.png` | Alur menghapus data: kosakata terhapus lewat `DELETE /kosakata/:id` (200) | Langkah 8: Integrasi frontend (hapus data) |
| 33 | `33-frontend-data-tersimpan-backend.png` | Setelah halaman di-refresh, perubahan tetap ada karena tersimpan di backend | Langkah 8: Integrasi frontend |

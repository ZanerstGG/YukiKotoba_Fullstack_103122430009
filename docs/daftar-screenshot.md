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

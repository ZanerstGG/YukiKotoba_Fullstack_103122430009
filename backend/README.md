# YukiKotoba Backend

REST API untuk data **Kosakata** aplikasi YukiKotoba, dibangun dengan [NestJS](https://nestjs.com/) mengikuti pola MVC (Module, Controller, Service, Entity, DTO).

Penjelasan lengkap arsitektur, daftar endpoint, validasi, dan penanganan error ada di [README utama](../README.md).

## Menjalankan

```bash
cd backend
npm install
npm run start:dev
```

Server berjalan di `http://localhost:3001`.

## Perintah Lainnya

```bash
npm run lint        # memeriksa kualitas kode
npm test            # menjalankan unit test (Vitest)
npm run test:e2e    # menjalankan e2e test
npm run build       # build produksi ke folder dist/
```

Untuk pengujian manual, buka [`http/kosakata.http`](http/kosakata.http) dengan ekstensi REST Client.

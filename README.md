# Technical-Test

Technical test ini menggunakan studi kasus Marketplace yang berarti aplikasi e-commerce yang memungkinkan pengguna untuk menambah produk, memesan produk, dan mengelola kategori produk. Aplikasi ini menggunakan MongoDB, Express, React, dan Node.js (MERN stack).

## Teknologi yang Digunakan

- **[MongoDB]**: Database NoSQL untuk penyimpanan data.
- **[Express]**: Fast Node.js network app framework.
- **[React]**: Library frontend untuk membangun UI.
- **[Node.js]**: Evented I/O untuk backend.
- **[Tailwind CSS]**: Framework CSS untuk styling yang cepat dan efisien.
- **[Passport.js]**: Middleware untuk autentikasi di Node.js.

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

## Cara Install

Install the dependencies and devDependencies and start the server.

Clone repository:
```bash
   git clone https://github.com/rezza66/technical-test.git
```

masuk ke direktori proyek: 
```sh
    cd technical-test
```
install depencies backend: 
```sh
cd backend
npm install
```
Install dependencies frontend: Buka terminal baru dan jalankan:
```sh
cd frontend
npm install
```

backend .env
```sh
PORT=5000
MONGO_URI=mongodb://localhost:27017/marketplace
JWT_SECRET=svsf7v6s7df6v8sdf75v8
```

Jalankan server backend: 
```sh
nodemon index
```
Jalankan server frontend: 
```sh
npm run dev
```

Contoh API:
-endpoint Get /products
```sh
 {
        "_id": "66fcd21e5b38af6da5e38b9b",
        "pd_code": "B001",
        "pd_ct_id": {
            "_id": "66fcd10212b1875602cde185",
            "ct_name": "Pria"
        },
        "pd_name": "Kemeja Batik",
        "pd_price": 100000,
        "createdAt": "2024-10-02T04:54:54.625Z",
        "updatedAt": "2024-10-30T03:37:25.425Z",
        "__v": 0
    },
```

Waktu pengerjaan
```sh
Technical test ini diselesaikan dalam waktu 4 hari dengan rincian:
    Hari 1: Setup project dan backend [4 jam].
    Hari 2: Pengembangan frontend dan integrasi API [4 jam].
    Hari 3: Testing, debugging, dan dokumentasi [3 jam].
    Hari 4: Penyempurnaan UI dan optimasi [3 jam].
Total waktu pengerjaan: 14 jam.
```

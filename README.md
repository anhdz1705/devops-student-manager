# 🎓 DevOps Student Manager

> **Bài Kiểm Tra Giữa Kỳ** — Ứng dụng quản lý sinh viên fullstack, triển khai bằng Docker & Docker Compose theo kiến trúc microservices (Frontend – Backend – Database).

**Sinh viên:** Lê Ngọc Anh  
**MSSV:** 2251220067  
**Lớp:** 22CT2  

---

## 📖 Mô Tả Dự Án

Ứng dụng web cho phép quản lý thông tin sinh viên với các chức năng CRUD cơ bản. Dự án được thiết kế theo mô hình **3-tier architecture** và container hóa hoàn toàn bằng Docker, đảm bảo triển khai nhất quán trên mọi môi trường.

---

## 🚀 Công Nghệ Sử Dụng

| Thành phần | Công nghệ | Phiên bản |
|:---|:---|:---|
| **Frontend** | HTML, CSS, JavaScript, Bootstrap | Bootstrap 5.3 |
| **Web Server** | Nginx (Alpine) | Latest |
| **Backend** | Node.js, Express.js | Node 18, Express 5.2 |
| **Database** | MongoDB | Latest |
| **ORM/ODM** | Mongoose | 9.3 |
| **DevOps** | Docker, Docker Compose | Compose v3 |

---

## 📌 Tính Năng

### Quản lý sinh viên
- ✅ Xem danh sách toàn bộ sinh viên
- ✅ Thêm sinh viên mới (Tên, MSSV, Lớp)
- ✅ Xóa sinh viên khỏi danh sách
- ✅ Hiển thị trạng thái rỗng khi chưa có dữ liệu

### API Endpoints
- ✅ `GET /students` — Lấy danh sách sinh viên
- ✅ `POST /students` — Thêm sinh viên mới
- ✅ `DELETE /students/:id` — Xóa sinh viên theo ID
- ✅ `GET /health` — Health Check trả về `{ "status": "ok" }`
- ✅ `GET /about` — Thông tin sinh viên thực hiện dự án

### Giao diện
- ✅ UI hiện đại với gradient, card layout, responsive design
- ✅ Trang **About** hiển thị profile sinh viên
- ✅ Loading spinner khi tải dữ liệu
- ✅ Thông báo thành công (success message)
- ✅ Xử lý lỗi và hiển thị cảnh báo khi mất kết nối server
- ✅ Bảo vệ XSS với hàm `escapeHtml()`

---

## 📂 Cấu Trúc Dự Án

```
devops-student-manager/
├── backend/
│   ├── Dockerfile           # Image Node.js 18, chạy server.js
│   ├── server.js            # Express server + Mongoose + REST API
│   ├── package.json         # Dependencies: express, mongoose, cors, dotenv
│   ├── package-lock.json
│   └── .env                 # Biến môi trường local (DB_URL localhost)
│
├── frontend/
│   ├── Dockerfile           # Image Nginx Alpine, serve static files
│   ├── index.html           # Trang chính — quản lý sinh viên (CRUD)
│   └── about.html           # Trang giới thiệu thông tin sinh viên
│
├── docker-compose.yml       # Orchestrate 3 services: backend, frontend, mongo
├── .env                     # Biến môi trường cho Docker (DB_URL dùng service name)
├── .env.example             # Template biến môi trường
└── README.md
```

---

## ⚙️ Hướng Dẫn Cài Đặt & Chạy

### Yêu Cầu Hệ Thống

- [Docker](https://www.docker.com/) (>= 20.x)
- [Docker Compose](https://docs.docker.com/compose/) (>= 2.x)
- Git

### 1. Clone dự án

```bash
git clone https://github.com/anhdz1705/devops-student-manager.git
cd devops-student-manager
```

### 2. Cấu hình biến môi trường

Tạo file `.env` tại thư mục gốc (hoặc sử dụng file có sẵn):

```env
PORT=5000
DB_URL=mongodb://mongo:27017/studentdb
APP_NAME=Student Manager
```

> **Lưu ý:** Trong Docker, `DB_URL` sử dụng tên service `mongo` thay vì `localhost`.

### 3. Build & chạy bằng Docker Compose

```bash
docker compose up --build
```

Hệ thống sẽ khởi tạo 3 container:

| Service | Mô tả | Port |
|:---|:---|:---|
| `frontend` | Nginx serve HTML/JS/CSS | `3000` → `80` |
| `backend` | Node.js Express API server | `5000` → `5000` |
| `mongo` | MongoDB database | `27017` → `27017` |

### 4. Dừng hệ thống

```bash
docker compose down
```

---

## 🌐 Truy Cập Ứng Dụng

| Trang | URL |
|:---|:---|
| 🏠 Trang chính (Quản lý SV) | [http://localhost:3000](http://localhost:3000) |
| ℹ️ Trang About | [http://localhost:3000/about.html](http://localhost:3000/about.html) |
| 🔌 Backend API | [http://localhost:5000](http://localhost:5000) |
| ❤️ Health Check | [http://localhost:5000/health](http://localhost:5000/health) |
| 👤 About API | [http://localhost:5000/about](http://localhost:5000/about) |

---

## 🧪 Kiểm Thử

### Health Check

```bash
curl http://localhost:5000/health
```

Kết quả mong đợi:

```json
{ "status": "ok" }
```

### About API

```bash
curl http://localhost:5000/about
```

Kết quả mong đợi:

```json
{
  "name": "Le Ngoc Anh",
  "studentId": "2251220067",
  "class": "22CT2"
}
```

### Thêm sinh viên qua API

```bash
curl -X POST http://localhost:5000/students \
  -H "Content-Type: application/json" \
  -d '{"name": "Nguyen Van A", "studentId": "2251220001", "class": "22CT1"}'
```

### Lấy danh sách sinh viên

```bash
curl http://localhost:5000/students
```

### Kiểm thử qua giao diện

1. Truy cập [http://localhost:3000](http://localhost:3000)
2. Nhập thông tin sinh viên vào form (Tên, MSSV, Lớp)
3. Nhấn **"🚀 Thêm Sinh Viên"**
4. Sinh viên mới hiển thị trong bảng danh sách
5. Nhấn **"🗑️ Xóa"** để xóa sinh viên (có hộp thoại xác nhận)

---

## 🐳 Chi Tiết Docker

### docker-compose.yml

Hệ thống gồm **3 services**:

```yaml
version: '3'
services:
  backend:        # Node.js API server (port 5000)
    build: ./backend
    depends_on: mongo
    env_file: .env

  frontend:       # Nginx static server (port 3000 → 80)
    build: ./frontend

  mongo:          # MongoDB database (port 27017)
    image: mongo
```

### Backend Dockerfile

- **Base image:** `node:18`
- **Strategy:** Copy `package*.json` trước → `npm install` → Copy source code (tối ưu Docker layer caching)
- **Entrypoint:** `node server.js`

### Frontend Dockerfile

- **Base image:** `nginx:alpine` (lightweight ~5MB)
- **Strategy:** Copy toàn bộ file HTML/CSS/JS vào `/usr/share/nginx/html`

---

## 🏗️ Kiến Trúc Hệ Thống

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│                  │     │                  │     │                  │
│   Frontend       │────▶│   Backend        │────▶│   MongoDB        │
│   (Nginx:3000)   │     │   (Express:5000) │     │   (:27017)       │
│                  │     │                  │     │                  │
│  index.html      │     │  GET /students   │     │  Collection:     │
│  about.html      │     │  POST /students  │     │  students        │
│                  │     │  DELETE /students │     │                  │
│                  │     │  GET /health     │     │  Fields:         │
│                  │     │  GET /about      │     │  - name          │
│                  │     │                  │     │  - studentId     │
│                  │     │                  │     │  - class         │
└──────────────────┘     └──────────────────┘     └──────────────────┘
       Browser                REST API              Mongoose ODM
```

---

## 📝 Ghi Chú Kỹ Thuật

- **Kết nối DB tự động retry:** Backend sẽ tự động thử kết nối lại MongoDB mỗi 5 giây nếu thất bại
- **CORS:** Đã bật CORS để Frontend có thể gọi API từ origin khác (port 3000 → 5000)
- **XSS Protection:** Frontend sử dụng hàm `escapeHtml()` để sanitize dữ liệu trước khi render
- **Responsive:** Giao diện hỗ trợ đầy đủ trên mobile (breakpoint 768px)

---

## 📄 License

Dự án phục vụ mục đích học tập — Bài kiểm tra giữa kỳ môn DevOps.

---

<p align="center">
  Made with ❤️ by <strong>Lê Ngọc Anh</strong> — MSSV 2251220067 — Lớp 22CT2
</p>
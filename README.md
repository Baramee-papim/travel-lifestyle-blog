# Travel Lifestyle Blog (Frontend)

Frontend ของระบบ Travel Lifestyle Blog พัฒนาด้วย React + TypeScript + Vite รองรับทั้งฝั่งผู้ใช้งานทั่วไปและฝั่งแอดมิน โดยเชื่อมต่อ API backend ผ่าน `VITE_API_BASE_URL`

## Project Summary

ระบบนี้เป็นเว็บบล็อกสำหรับอ่านบทความท่องเที่ยว/ไลฟ์สไตล์ พร้อมความสามารถหลักดังนี้:

- ผู้ใช้ทั่วไปดูบทความทั้งหมดและหน้าอ่านบทความรายชิ้น
- ระบบสมาชิก (สมัครสมาชิก, ล็อกอิน, เก็บ session)
- ผู้ใช้ที่ล็อกอินสามารถกดไลก์และคอมเมนต์บทความ
- หน้า Account Settings ของผู้ใช้ (`/profile`, `/reset-password`)
- หน้า Admin Panel สำหรับจัดการบทความและหมวดหมู่ รวมถึงโปรไฟล์และรีเซ็ตรหัสผ่านแอดมิน

## Tech Stack

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios
- Sonner (toast notifications)
- Supabase client (ใช้ env สำหรับ integration ที่เกี่ยวข้อง)

## Main Features

### Public

- Home page แสดงรายการบทความ
- View post page (`/post/:id`)
  - แสดงรายละเอียดบทความ
  - แสดง/โพสต์คอมเมนต์
  - กดไลก์บทความ (ต้องล็อกอิน)
  - แชร์ลิงก์บทความ

### Authentication

- Signup (`/signup`)
- Login (`/login`)
- Auth context + localStorage session persistence

### User Account

- Profile page (`/profile`)
  - อัปโหลดรูปโปรไฟล์
  - แก้ไขชื่อและ username
- Reset password page (`/reset-password`)

### Admin

- Admin area (`/admin/*`) เฉพาะ role `admin`
- Article management
  - สร้างบทความ
  - แก้ไขบทความ
  - ลบ/จัดการสถานะบทความ
- Category management
  - สร้าง/แก้ไขหมวดหมู่
- Admin profile + reset password

## Routing Overview

- `/` Home
- `/post/:id` View post
- `/signup` Signup
- `/login` Login
- `/profile` User profile (authenticated)
- `/reset-password` User reset password (authenticated)
- `/admin/*` Admin panel (admin only)

## Environment Variables

สร้างไฟล์ `.env` ที่ root ของโปรเจกต์ (frontend) และกำหนดค่า:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

หมายเหตุ:

- `VITE_API_BASE_URL` จำเป็นสำหรับการเรียก API หลัก
- ค่า Supabase ต้องถูกต้องหากใช้งาน flow ที่พึ่งพา Supabase

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

### 5) Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  components/
    admin/        # admin panel UI and route elements
    account/      # user account settings UI
    view-post/    # post detail page sections
    ui/           # shared UI components
  context/        # AuthContext
  hooks/          # business logic hooks
  lib/            # utilities, social share, supabase client
  pages/          # page-level components
  services/       # API service layer (axios)
  types/          # shared TypeScript types
```

## Backend Dependency

โปรเจกต์นี้เป็น frontend เท่านั้น ต้องมี backend API ทำงานอยู่ก่อนใช้งานจริง

- Frontend repo: `travel-lifestyle-blog`
- Backend repo (แยก): `server-travel-lifestyle-blog`

## Notes

- หากเข้า `/profile` หรือ `/reset-password` โดยยังไม่ล็อกอิน ระบบจะพาไป `/login`
- หากผู้ใช้ role เป็น admin แล้วเข้าเส้นทาง user profile/reset password ระบบจะ redirect ไปเส้นทาง `/admin/...` ที่ตรงกัน

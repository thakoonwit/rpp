# RPSZZ — ของดี ไม่ต้องแพง

ร้านสินค้ามือสองคุณภาพที่คัดเอง เช็คเอง ซ่อมเอง ขายเอง

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Supabase** (PostgreSQL + Auth + Storage)
- **Vercel** (Deployment)

## เริ่มต้นใช้งาน

### 1. ตั้งค่า Supabase

1. สร้าง project ใหม่ที่ [supabase.com](https://supabase.com)
2. ไปที่ **SQL Editor** และ run ไฟล์ตามลำดับนี้:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`
   - `supabase/seed.sql` (ข้อมูลตัวอย่าง)

### 2. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` (คือ `.env.local.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=https://rpszz.com
```

### 3. รัน Development Server

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

### 4. Deploy บน Vercel

1. Push code ไป GitHub
2. Import project บน [vercel.com](https://vercel.com)
3. เพิ่ม Environment Variables ใน Vercel Dashboard
4. Deploy!

## Admin Panel

เข้าสู่ระบบผู้ดูแลที่: `/administrator`

เช็คเข้า Supabase Auth (Email + Password)

สร้าง Admin User:
1. ไปที่ Supabase Dashboard > Authentication > Users
2. กด "Invite user" หรือสร้างด้วย SQL:
   ```sql
   SELECT auth.create_user('admin@rpszz.com', 'your-password');
   ```

## โครงสร้างไฟล์

```
src/
├── app/
│   ├── (public)/          # หน้าเว็บสาธารณะ
│   ├── administrator/     # Admin Panel
│   ├── globals.css
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/               # UI พื้นฐาน
│   ├── layout/           # Navbar, Footer
│   ├── home/             # ส่วน Homepage
│   ├── products/         # Product components
│   └── admin/            # Admin components
├── lib/
│   ├── supabase/         # Supabase clients
│   ├── actions/          # Server Actions
│   └── utils.ts
└── types/
    └── database.types.ts

supabase/
├── migrations/
│   ├── 001_initial_schema.sql
│   └── 002_rls_policies.sql
└── seed.sql
```

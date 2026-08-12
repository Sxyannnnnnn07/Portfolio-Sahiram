# คู่มือเปิดใช้งานบล็อก + CMS (Sveltia CMS)

เว็บนี้เป็น static site ที่มีบล็อกอ่านได้ทันที แต่**การเขียน/แก้ไขบทความผ่านหน้า admin ต้อง deploy ขึ้น Vercel ก่อน** ตามขั้นตอนด้านล่าง (ใช้เวลาประมาณ 15 นาที)

> หมายเหตุ: ระบบ CMS นี้ล็อกอินด้วย **GitHub Personal Access Token โดยตรง** (ไม่พึ่ง Netlify Identity หรือ Git Gateway) — จึงเปลี่ยนผู้ให้บริการโฮสต์เป็น Vercel ได้โดยไม่ต้องแก้ config อะไรเลย

---

## ขั้นที่ 1 — สร้าง repo บน GitHub และ push โค้ด

1. สร้าง repo ใหม่ที่ https://github.com/new
   - **Repository name**: `Portfolio-Sahiram`
   - ตั้งเป็น **Public** · ไม่ต้อง tick "Add a README"
2. git ในโปรเจกต์นี้ **init + commit เรียบร้อยแล้ว** — เหลือแค่เพิ่ม remote และ push:

```bash
git remote add origin https://github.com/Sxyannnnnnn07/Portfolio-Sahiram.git
git push -u origin main
```

## ขั้นที่ 2 — ตรวจชื่อ repo ใน config ของ CMS

`admin/config.yml` ตั้งชื่อ repo ให้เรียบร้อยแล้ว (`Sxyannnnnnn07/Portfolio-Sahiram`) — ตรวจได้ที่บรรทัดนี้:

```yaml
backend:
  repo: Sxyannnnnnn07/Portfolio-Sahiram
```

> ถ้าตอนสร้าง repo บน GitHub ใช้ชื่ออื่น ให้แก้บรรทัดนี้ให้ตรง แล้ว commit + push ใหม่

## ขั้นที่ 3 — เชื่อมต่อ Vercel (ฟรี)

1. เข้า https://vercel.com → **Add New... → Project**
2. เลือก **Import Git Repository** → เชื่อมบัญชี GitHub (ครั้งแรก) → เลือก repo `Portfolio-Sahiram`
3. ตั้งค่า (ใช้ค่าเริ่มต้นได้เลย):
   - Framework Preset: **Other**
   - Build Command: **เว้นว่าง** (ตั้งไว้ใน `vercel.json` แล้ว)
   - Output Directory: `.`
4. กด **Deploy** รอสักครู่ — ได้ลิงก์ประมาณ `https://portfolio-sahiram.vercel.app`

> โปรเจกต์ static แบบนี้ใช้ฟรี 100% ไม่มีค่าใช้จ่าย ไม่กิน credit

## ขั้นที่ 4 — สร้าง GitHub Personal Access Token (ใช้ครั้งเดียว)

1. ไปที่ https://github.com/settings/personal-access-tokens/new
2. **Token name**: `sveltia-cms` · **Expiration**: ตั้งได้นานสุด (เช่น 90 วัน)
3. **Repository access**: เลือก **Only select repositories** → เลือก repo `Portfolio-Sahiram`
4. **Permissions**:
   - `Contents` → **Read and write**
   - `Metadata` → **Read-only**
5. กด Generate แล้ว**เก็บ token ไว้ก่อน** (แสดงให้ดูครั้งเดียวเท่านั้น)

## ขั้นที่ 5 — เริ่มเขียนบทความ

1. เปิดเว็บที่ deploy แล้ว ต่อท้าย URL ด้วย `/admin/`
   เช่น `https://portfolio-sahiram.vercel.app/admin/`
2. ที่หน้า login กดปุ่ม **"Sign In Using Access Token"** (⚠️ ห้ามกด "Sign In with GitHub" — ปุ่มนั้นต้องตั้ง OAuth App เพิ่มเติม ซึ่งไม่ได้ตั้งไว้)
3. วาง Personal Access Token จากขั้นที่ 4 ลงในช่อง → กด **Sign In**
4. เลือก **บทความทั้งหมด** (รายการเดียวของคอลเลกชัน "บล็อก")
5. กด **Add** → ใส่หัวข้อ วันที่ แท็ก คำโปรย และเนื้อหา
6. กด **Save** — บทความถูก commit ขึ้น GitHub แล้ว Vercel deploy ให้อัตโนมัติ
7. รีเฟรชหน้าเว็บ → บทความใหม่โผล่ในส่วน "บล็อก" เรียบร้อย

## อัปโหลดรูป

ในหน้า admin ให้ใช้ปุ่มเลือกไฟล์ของฟิลด์ (หรือปุ่ม Media) — รูปจะถูกเก็บไว้ที่ `content/uploads/` และแสดงผลในบทความได้เลย

## แก้ไขสไตล์/โครงสร้างบล็อก

- การ์ดบทความ: `style.css` (ส่วน `/* ---------- Blog ---------- */`)
- โหลดและแสดงบทความ: `blog.js`
- ส่วนบล็อกบนหน้าแรก: `index.html` (`<section id="blog">`)

## Troubleshooting

| ปัญหา | วิธีแก้ |
|---|---|
| กด login แล้ว error | ตรวจ token ว่ามีสิทธิ์ `Contents: Read and write` และเลือก repo ถูกตัว |
| เข้า `/admin/` แล้วหน้าเปล่า | เป็นไปได้ว่า Sveltia CMS โหลดจาก CDN ไม่ได้ — ลองอีกครั้ง/เปลี่ยนเบราว์เซอร์ |
| บทความไม่อัปเดตหลังบันทึก | รอ deploy สัก 30–60 วินาที แล้ว hard refresh (`Ctrl+Shift+R`) |
| ลบบทความแล้วยังโผล่ | เช็คว่ากด Save แล้วจริง ๆ และ repo ไม่ถูกแคช |

---

**ลิงก์ที่เกี่ยวข้อง**
- Sveltia CMS: https://www.sveltia.dev/
- Vercel: https://vercel.com
- วิธีสร้าง Fine-grained PAT: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

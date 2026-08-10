# وب‌سایت پرستو خوئینی — وکیل پایه یک دادگستری

وب‌سایت معرفی و جذب موکل برای وکیل پایه یک دادگستری، ساخته‌شده با React + Vite.

## اجرای پروژه به‌صورت محلی

```bash
npm install
npm run dev
```

سپس آدرس نمایش‌داده‌شده در ترمینال (معمولاً `http://localhost:5173`) را در مرورگر باز کنید.

## ساخت نسخه Production

```bash
npm run build
npm run preview
```

خروجی نهایی در پوشه `dist/` ایجاد می‌شود.

## استقرار (Deploy) روی Vercel

1. پروژه را در یک ریپازیتوری GitHub قرار دهید.
2. در Vercel یک پروژه جدید از روی همان ریپازیتوری بسازید.
3. Vercel به‌صورت خودکار فریم‌ورک Vite را تشخیص می‌دهد:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. دکمه Deploy را بزنید.

## ساختار پروژه

```
├── public/              فایل‌های استاتیک (robots.txt, sitemap.xml, favicon)
├── src/
│   ├── assets/          تصاویر
│   ├── components/      کامپوننت‌های صفحه (Header, Hero, Services, ...)
│   ├── data/            محتوای متنی سایت (content.js)
│   ├── hooks/           هوک‌های سفارشی (useReveal برای انیمیشن اسکرول)
│   ├── App.jsx          چیدمان اصلی صفحه
│   ├── index.css        توکن‌های طراحی و استایل‌های پایه
│   └── main.jsx         نقطه ورود React
├── index.html           متادیتای SEO، Open Graph، Schema.org
```

## نکات مهم برای توسعه بعدی

- **فرم درخواست مشاوره** (`src/components/ConsultationForm.jsx`) در حال حاضر
  با یک تابع Mock کار می‌کند. برای اتصال به بک‌اند واقعی، تابع
  `mockSubmitConsultation` را با یک فراخوانی API واقعی جایگزین کنید. به‌دلیل
  حساس بودن اطلاعات موکل، از ذخیره‌سازی در LocalStorage خودداری شده است.
- **آدرس دقیق دفتر** فعلاً به‌صورت Placeholder در بخش تماس درج شده و باید
  پس از تأیید نهایی جایگزین شود.
- **نقشه دفتر** (`src/components/Contact.jsx`) به‌صورت Placeholder طراحی شده
  و پس از دریافت آدرس نهایی می‌تواند با یک نقشه واقعی (مثلاً Neshan یا
  Google Maps Embed) جایگزین شود.
- محتوای متنی سایت (خدمات، مقالات، سوالات متداول و ...) در فایل
  `src/data/content.js` نگهداری می‌شود و ویرایش آن ساده است.
- تصویر پرتره در `src/assets/hero-portrait.jpg` قرار دارد و در بخش‌های Hero و
  About استفاده می‌شود.

## SEO

- Title، Meta Description، Canonical URL، Open Graph و Twitter Card در
  `index.html` تنظیم شده‌اند.
- Schema.org از نوع `Attorney` برای معرفی وکیل اضافه شده است.
- فایل‌های `robots.txt` و `sitemap.xml` در پوشه `public/` قرار دارند.
- پیش از انتشار نهایی، مقادیر `https://parastookhoeini.ir/` را در
  `index.html`، `robots.txt` و `sitemap.xml` با دامنه واقعی جایگزین کنید.

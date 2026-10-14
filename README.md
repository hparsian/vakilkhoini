# وب‌سایت پرستو خوئینی — وکیل پایه یک دادگستری

وب‌سایت معرفی و جذب موکل برای وکیل پایه یک دادگستری، ساخته‌شده با React + Vite (SPA، RTL فارسی).

## اجرای پروژه به‌صورت محلی

```bash
npm install
npm run dev
```

سپس آدرس `http://localhost:3000` را در مرورگر باز کنید (پورت در `package.json` و `vite.config.js` روی ۳۰۰۰ تنظیم شده است).

## ساخت نسخه Production

```bash
npm run build     # خروجی در dist/ — سitemap.xml هم پیش از بیلد تولید می‌شود
npm run preview   # پیش‌نمایش خروجی نهایی روی http://localhost:3000
```

اسکریپت `sitemap` (و هوک `prebuild`) فایل `public/sitemap.xml` را از `src/data/content.js` بازتولید می‌کند؛ بنابراین فهرست URLها همیشه با محتوای سایت هم‌خوان است.

## استقرار (Deploy)

**Cloudflare Workers (کانفیگ فعلی):** فایل `wrangler.json` سرو کردن پوشه `dist/` را به‌صورت SPA تنظیم کرده است.

```bash
npm run build
npx wrangler deploy
```

> توجه: `not_found_handling: single-page-application` باعث می‌شود آدرس‌های نامعتبر هم با کد HTTP 200 سرو شوند (Soft-404). برای سئوی دقیق‌تر به پررندر/سرور‌ساید رندر یا بازگرداندن ۴۰۴ واقعی نیاز است.

**گزینه جایگزین (Vercel):** Build Command `npm run build` و Output Directory `dist`.

## ساختار پروژه

```
├── public/                 robots.txt, sitemap.xml (تولیدشده), favicon.svg, og-image.jpg
├── scripts/
│   └── generate-sitemap.mjs تولید سایت‌مپ از محتوای سایت
├── src/
│   ├── assets/             تصویر پرتره
│   ├── components/         کامپوننت‌های مشترک و بخش‌های صفحه اصلی (Header, Hero, Footer, …)
│   ├── context/            ToastContext (پیام‌های سیستمی)
│   ├── data/               محتوای سایت (content.js) و شاخص‌های تورم (cpiIndexes.js)
│   ├── hooks/              useSEO (متادیتای هر مسیر) و useReveal (انیمیشن اسکرول)
│   ├── pages/              صفحات مسیر‌محور (مقالات، خدمات، محاسبه‌گرها، تماس، …)
│   ├── App.jsx             مسیریابی و چیدمان اصلی
│   ├── index.css           توکن‌های طراحی و استایل پایه
│   ├── main.jsx            نقطه ورود React
│   └── router.jsx          روتر سبک سفارشی (بدون وابستگی بیرونی)
├── index.html              متادیتای SEO، Open Graph، Schema.org
└── wrangler.json           کانفیگ استقرار Cloudflare
```

## نکات مهم برای توسعه بعدی

- **فرم درخواست مشاوره** (`src/components/ConsultationForm.jsx`) هنوز با یک تابع Mock کار می‌کند و
  هیچ درخواستی به دفتر ارسال نمی‌شود؛ متن موفقیت فرم تا اتصال به بک‌اند واقعی «نمایشی» است.
  برای اتصال، `submitConsultation` را با یک فراخوانی API واقعی جایگزین کنید. داده‌های موکل
  عمداً در LocalStorage یا کنسول ذخیره/چاپ نمی‌شوند.
- **محاسبه‌گرهای حقوقی** (`src/pages/CalculatorsPage.jsx`) بر پایه ماده ۵۲۲ ق.آ.د.م، تبصره الحاقی
  ماده ۱۰۸۲ قانون مدنی، تعرفه‌های قضایی و ماده ۹ آیین‌نامه تعرفه حق‌الوکاله محاسبه می‌کنند.
  مقادیر شاخص تورم در `src/data/cpiIndexes.js` نگهداری می‌شود و **باید هر سال با جدول رسمی
  بانک مرکزی به‌روز شود**؛ این اعداد برآوردی هستند و سند قضایی محسوب نمی‌شوند.
- **آدرس دقیق دفتر** و **نقشه دفتر** (`src/components/Contact.jsx`) فعلاً Placeholder هستند و پس از
  تأیید نهایی جایگزین می‌شوند.
- کل محتوای متنی (خدمات، مقالات، سؤالات متداول) در `src/data/content.js` است.
- تصویر پرتره در `src/assets/hero-portrait.jpg` و تصویر اشتراک‌گذاری در `public/og-image.jpg` قرار دارد
  (برای کارت‌های بزرگ شبکه‌های اجتماعی، تصویر ۱۲۰۰×۶۳۰ توصیه می‌شود).

## SEO

- عنوان، توضیحات، canonical، Open Graph و Twitter Card برای هر مسیر به‌صورت کلاینت‌ساید توسط
  `useSEO` تنظیم می‌شود؛ صفحاتی که جاوااسکریپت اجرا نمی‌کنند (مثل پیش‌نمایش لینک در واتساپ/تلگرام)
  متادیتای صفحه اصلی را می‌بینند — برای رفع این محدودیت به پررندر استاتیک نیاز است.
- Schema.org شامل `Attorney`/`LegalService`، `FAQPage`، `Article`، `BreadcrumbList` و `WebApplication`.
- `robots.txt` و `sitemap.xml` در `public/` هستند و دامنه مبنا `https://vakilkhoini.ir` است؛ در صورت
  تغییر دامنه، آن را در `index.html`، `public/robots.txt`، `src/hooks/useSEO.js` و
  `scripts/generate-sitemap.mjs` به‌روز کنید.
- فونت وزیرمتن self-hosted (بسته `vazirmatn`) است و به Google Fonts وابستگی ندارد.

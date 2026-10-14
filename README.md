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
npm run build     # dist/ : سایت‌مپ + باندل + ۳۷ فایل HTML پیش‌رندرشده (هر مسیر + 404)
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

### بررسی به‌روز بودن دیپلوی

پس از هر پوش، با این دستور مطمئن شو نسخه‌ای که روی دامنه سرو می‌شود همان بیلد محلی است:

```bash
npm run build
npm run verify:deploy                               # یک بررسی
npm run verify:deploy -- --wait 300 --interval 15   # تا ۵ دقیقه صبر می‌کند تا دیپلوی تمام شود
```

اسکریپت `scripts/verify-deploy.mjs` فایل‌های هش‌دار ارجاع‌شده در `dist/index.html` را استخراج می‌کند،
همان فهرست را از سایت زنده می‌خواند و به‌صورت پیش‌فرض محتوای هر فایل را هم بایت‌به‌بایت (sha256)
مقایسه می‌کند. کد خروج ۰ = سایت زنده دقیقاً همین بیلد است، ۱ = ناهم‌خوانی یا اتمام مهلت،
۲ = امکان بررسی نبود (مثلاً بیلد محلی موجود نیست).

گزینه‌ها: `--site <url>` • `--dir <path>` • `--wait <seconds>` • `--interval <seconds>` • `--names-only`
(در حالت `--names-only` فقط نام فایل‌ها مقایسه می‌شود، نه بایت‌های محتوا).

ورک‌فلوی `.github/workflows/verify-deploy.yml` همین بررسی را بعد از هر push روی `main` خودکار اجرا
می‌کند: نصب، بیلد و سپس مقایسه با سایت زنده با مهلت ۷ دقیقه. نیازمندی: Node ۱۸ یا بالاتر
(به‌خاطر `fetch`). اگر روزی محیط بیلد دیپلوی هش متفاوتی تولید کند، با `--names-only` هم می‌توان
فقط هم‌نامی دارایی‌ها را بررسی کرد.

## ساختار پروژه

```
├── public/                 robots.txt, sitemap.xml (تولیدشده), favicon.svg, og-image.jpg
├── .github/workflows/
│   └── verify-deploy.yml   بررسی خودکار به‌روز بودن دیپلوی بعد از هر push
├── scripts/
│   ├── generate-sitemap.mjs   تولید سایت‌مپ از فهرست مسیرها
│   ├── prerender.mjs          ساخت HTML استاتیک و متای اختصاصی هر مسیر
│   ├── generate-og-image.py   ساخت تصویر ۱۲۰۰×۶۳۰ اشتراک‌گذاری (اختیاری، نیازمند Pillow)
│   └── verify-deploy.mjs      مقایسه هش بیلد محلی با سایت زنده
├── src/
│   ├── assets/             تصویر پرتره
│   ├── components/         کامپوننت‌های مشترک و بخش‌های صفحه اصلی (Header, Hero, Footer, …)
│   ├── context/            ToastContext (پیام‌های سیستمی)
│   ├── data/               محتوای سایت (content.js)، فهرست مسیرها (routes.js) و شاخص‌های تورم (cpiIndexes.js)
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

- **هر مسیر HTML استاتیک اختصاصی دارد.** اسکریپت `scripts/prerender.mjs` (در `npm run build`)
  بعد از بیلد، هر مسیر را سرور‌ساید رندر می‌کند و فایل‌های `dist/<route>.html` را می‌سازد؛
  همراه با عنوان، توضیحات، canonical، Open Graph/Twitter و JSON-LD همان صفحه. پس کرالرها و
  پیش‌نمایش لینک‌ها (واتساپ، تلگرام، …) که جاوااسکریپت اجرا نمی‌کنند نیز محتوای درست هر صفحه را می‌بینند.
- در مرورگر `src/main.jsx` همان مارک‌آپ را **hydrate** می‌کند (بدون رندر دوباره). در `vite dev` که
  مارک‌آپ اولیه وجود ندارد، برنامه به‌صورت عادی mount می‌شود.
- **۴۰۴ واقعی:** `wrangler.json` روی `not_found_handling: "404-page"` تنظیم شده و `dist/404.html`
  با کد وضعیت ۴۰۴ و `noindex` سرو می‌شود (به‌جای بازگرداندن ۲۰۰ برای هر آدرس).
- فهرست مسیرها یک‌جا در `src/data/routes.js` است؛ هم سایت‌مپ و هم پیش‌رندر از همان استفاده می‌کنند
  و مسیرهای قدیمی (alias) در همان فایل تعریف شده‌اند. اسکریپت پیش‌رندر اگر مسیری به صفحهٔ
  واقعی resolve نشود، بیلد را با خطا متوقف می‌کند.
- تصویر اشتراک‌گذاری `public/og-image.jpg` استاندارد ۱۲۰۰×۶۳۰ است و با
  `python3 scripts/generate-og-image.py` (Pillow + Raqm) بازتولید می‌شود.
- Schema.org شامل `Attorney`/`LegalService`، `FAQPage`، `Article`، `BreadcrumbList` و `WebApplication`.
- `robots.txt` و `sitemap.xml` در `public/` هستند و دامنه مبنا `https://vakilkhoini.ir` است؛ در صورت
  تغییر دامنه، آن را در `index.html`، `public/robots.txt`، `src/hooks/useSEO.js` و
  `scripts/generate-sitemap.mjs` به‌روز کنید.
- فونت وزیرمتن self-hosted (بسته `vazirmatn`) است و به Google Fonts وابستگی ندارد.

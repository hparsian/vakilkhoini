import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import {
  HomeServicesPreview,
  HomeWhyChooseUs,
  HomeAboutSpotlight,
  HomeCalculatorsBanner,
  HomeProcessSummary,
  HomeArticlesPreview,
  HomeFAQPreview,
  HomeContactCTA,
} from './components/HomePortalSections.jsx'
import Footer from './components/Footer.jsx'
import StickyMobileCTA from './components/StickyMobileCTA.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import ArticlesListPage from './pages/ArticlesListPage.jsx'
import ServicePage from './pages/ServicePage.jsx'
import ServicesListPage from './pages/ServicesListPage.jsx'
import CalculatorsPage from './pages/CalculatorsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProcessPage from './pages/ProcessPage.jsx'
import FAQPage from './pages/FAQPage.jsx'
import ConsultationPage from './pages/ConsultationPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { useRouter, matchPath } from './router.jsx'
import useSEO from './hooks/useSEO.js'

function HomePage() {
  useSEO({
    title: 'پرستو خوئینی | وکیل پایه یک دادگستری در تهران و سعادت‌آباد - دعاوی ملکی، چک و قراردادها',
    description:
      'پرستو خوئینی وکیل پایه یک دادگستری در تهران (سعادت‌آباد) - وکالت تخصصی در دعاوی ملکی، ثبتی، وصول چک صیادی، تنظیم قراردادهای پیشرفته و مشاوره حقوقی با ارزیابی شفاف شانس پرونده.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://vakilkhoini.ir/#website',
          url: 'https://vakilkhoini.ir/',
          name: 'دفتر وکالت پرستو خوئینی',
          alternateName: 'وکیل پایه یک دادگستری پرستو خوئینی',
          description: 'وبسایت رسمی پرستو خوئینی، وکیل پایه یک دادگستری در تهران و سعادت‌آباد',
          inLanguage: 'fa-IR',
        },
        {
          '@type': ['Attorney', 'LegalService'],
          '@id': 'https://vakilkhoini.ir/#attorney',
          name: 'پرستو خوئینی | وکیل پایه یک دادگستری',
          image: 'https://vakilkhoini.ir/og-image.jpg',
          telephone: '+989128754177',
          url: 'https://vakilkhoini.ir/',
          priceRange: '$$',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'سعادت‌آباد، میدان کاج، بلوار سرو غربی',
            addressLocality: 'تهران',
            addressRegion: 'تهران',
            postalCode: '19977',
            addressCountry: 'IR',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 35.782,
            longitude: 51.3735,
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
              opens: '10:00',
              closes: '20:00',
            },
          ],
          areaServed: [
            { '@type': 'City', 'name': 'تهران' },
            { '@type': 'AdministrativeArea', 'name': 'سعادت‌آباد' },
            { '@type': 'AdministrativeArea', 'name': 'شهرک غرب' },
            { '@type': 'AdministrativeArea', 'name': 'استان البرز' },
          ],
          knowsAbout: [
            'دعاوی ملکی و ثبتی',
            'الزام به تنظیم سند رسمی',
            'سرقفلی و حق کسب و پیشه',
            'وصول چک صیادی و توقیف اموال',
            'تنظیم قرارداد مشارکت در ساخت',
            'داوری اختلافات تجاری',
            'محاسبه آنلاین هزینه دادرسی و خسارت تاخیر تادیه',
            'وکالت در محاکم تجدیدنظر و دیوان عالی کشور',
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://vakilkhoini.ir/#faqpage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'آیا امکان دریافت مشاوره قبل از تصمیم‌گیری برای شکایت وجود دارد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله، اکیداً توصیه می‌شود پیش از هرگونه اقدام قضایی، در یک جلسه مشاوره حضوری یا تلفنی اسناد خود را بررسی کنید تا از شانس واقعی پیروزی و هزینه‌ها آگاه شوید.',
              },
            },
            {
              '@type': 'Question',
              name: 'حق‌الوکاله و هزینه‌های دادرسی چگونه محاسبه و پرداخت می‌شود؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'حق‌الوکاله بر اساس تعرفه قانونی و پیچیدگی موضوع تعیین و امکان پرداخت مرحله‌ای متناسب با پیشرفت دادرسی در سامانه ثنا درج می‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'دفتر وکالت در کدام منطقه تهران واقع است و ساعات پذیرش چگونه است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'دفتر وکالت در منطقه سعادت‌آباد تهران (محدوده میدان کاج / بلوار سرو) واقع شده است. پذیرش در روزهای شنبه تا چهارشنبه از ساعت ۱۰:۰۰ تا ۲۰:۰۰ با وقت قبلی انجام می‌شود.',
              },
            },
          ],
        },
      ],
    },
  })

  return (
    <main id="main">
      <Hero />
      <TrustBar />
      <HomeServicesPreview />
      <HomeWhyChooseUs />
      <HomeAboutSpotlight />
      <HomeCalculatorsBanner />
      <HomeProcessSummary />
      <HomeArticlesPreview />
      <HomeFAQPreview />
      <HomeContactCTA />
    </main>
  )
}

export default function App() {
  const { pathname } = useRouter()

  let content = null
  let articleParams
  let serviceParams

  if (pathname === '/' || pathname === '') {
    content = <HomePage />
  } else if (pathname === '/darbareh') {
    content = <AboutPage />
  } else if (pathname === '/khadamat') {
    content = <ServicesListPage />
  } else if (pathname === '/marohe') {
    content = <ProcessPage />
  } else if (pathname === '/faq') {
    content = <FAQPage />
  } else if (pathname === '/moshavere') {
    content = <ConsultationPage />
  } else if (pathname === '/tamas') {
    content = <ContactPage />
  } else if (pathname === '/mohasebe') {
    content = <CalculatorsPage />
  } else if (pathname === '/checklist-mobayenameh' || pathname === '/cheklis-amlak') {
    content = <CalculatorsPage defaultTab="realEstateChecklist" />
  } else if (pathname === '/maghalat') {
    content = <ArticlesListPage />
  } else if ((articleParams = matchPath('/maghalat/:slug', pathname))) {
    // 301 alias redirect for cannibalized/merged articles
    const targetSlug = articleParams.slug === 'ghoulnameh-vs-mobayeenameh' ? 'gholnameh-vs-mobayenameh' : articleParams.slug
    content = <ArticlePage slug={targetSlug} />
  } else if ((serviceParams = matchPath('/khadamat/:slug', pathname))) {
    content = <ServicePage slug={serviceParams.slug} />
  } else {
    content = <NotFoundPage />
  }

  return (
    <>
      <a href="#main" className="skip-link">رفتن به محتوای اصلی</a>
      <Header />
      {content}
      <Footer />
      <StickyMobileCTA />
    </>
  )
}

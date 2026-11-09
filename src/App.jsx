import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import {
  HomeServicesPreview,
  HomeWhyChooseUs,
  HomeAboutSpotlight,
  HomeCalculatorsBanner,
  HomeSearchKeywordsHub,
  HomeProcessSummary,
  HomeArticlesPreview,
  HomeFAQPreview,
  HomeContactCTA,
} from './components/HomePortalSections.jsx'
import Testimonials from './components/Testimonials.jsx'
import LinkPrefetcher from './components/LinkPrefetcher.jsx'
import Footer from './components/Footer.jsx'
import StickyMobileCTA from './components/StickyMobileCTA.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import { faqs } from './data/content.js'
import ArticlesListPage from './pages/ArticlesListPage.jsx'
import ServicePage from './pages/ServicePage.jsx'
import ServicesListPage from './pages/ServicesListPage.jsx'
import CalculatorsPage from './pages/CalculatorsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProcessPage from './pages/ProcessPage.jsx'
import FAQPage from './pages/FAQPage.jsx'
import ConsultationPage from './pages/ConsultationPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import KeywordLandingPage from './pages/KeywordLandingPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { useRouter, matchPath } from './router.jsx'
import useSEO from './hooks/useSEO.js'

function HomePage() {
  useSEO({
    title: 'پرستو خوئینی | وکیل تهران، سعادت‌آباد و وکیل حقوقی - ۰۹۱۲۸۷۵۴۱۷۷',
    description:
      'پرستو خوئینی وکیل حقوقی و پایه یک دادگستری در تهران و سعادت‌آباد. شماره موبایل و تماس مستقیم: ۰۹۱۲۸۷۵۴۱۷۷ (09128754177). وکالت دعاوی ملکی، انحصار وراثت، دادگاه صلح و ابزارهای محاسبه آنلاین.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://vakilkhoini.ir/#website',
          url: 'https://vakilkhoini.ir/',
          name: 'دفتر وکالت پرستو خوئینی',
          alternateName: ['وکیل پایه یک دادگستری پرستو خوئینی', 'پرستو خوئینی', 'وکیل تهران'],
          description: 'وبسایت رسمی پرستو خوئینی، وکیل پایه یک دادگستری در تهران و سعادت‌آباد. شماره تماس: ۰۹۱۲۸۷۵۴۱۷۷',
          inLanguage: 'fa-IR',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://vakilkhoini.ir/maghalat?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': ['Attorney', 'LegalService'],
          '@id': 'https://vakilkhoini.ir/#attorney',
          name: 'پرستو خوئینی',
          alternateName: ['وکیل پرستو خوئینی', 'پرستو خوئینی وکیل پایه یک دادگستری', 'پرستو خوئینی وکیل تهران'],
          jobTitle: 'وکیل پایه یک دادگستری',
          image: 'https://vakilkhoini.ir/og-image.jpg',
          description:
            'دفتر وکالت پرستو خوئینی، وکیل پایه یک دادگستری در تهران و سعادت‌آباد. تلفن همراه و تماس مستقیم: ۰۹۱۲۸۷۵۴۱۷۷ (09128754177). مشاوره تخصصی در دعاوی ملکی، چک صیادی و قراردادها.',
          telephone: '+989128754177',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+98-912-875-4177',
            contactType: 'customer service',
            areaServed: 'IR',
            availableLanguage: ['fa', 'Persian'],
          },
          url: 'https://vakilkhoini.ir/',
          priceRange: '$$',
          currenciesAccepted: 'IRR',
          paymentAccepted: 'نقدی، کارت به کارت، حواله پایا و ساتنا، چک صیادی',
          hasMap: 'https://maps.google.com/?q=35.7820,51.3735',
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
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '128',
            bestRating: '5',
            worstRating: '1',
          },
          review: [
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'رضا تهرانی' },
              datePublished: '2026-08-15',
              reviewBody: 'در پرونده الزام به تنظیم سند رسمی ملک در سعادت‌آباد، پیگیری سریع و تسلط بالای خانم خوئینی باعث صدور رای قطعی به نفع ما شد.',
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            },
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'مریم صادقی' },
              datePublished: '2026-09-20',
              reviewBody: 'برای وصول چک برگشتی صیادی از طریق ماده ۲۳، کمتر از ۲ هفته اجراییه صادر و کلیه حساب‌های بدهکار مسدود گردید.',
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            },
          ],
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
            'محاسبه آنلاین سهم‌الارث و انحصار وراثت',
            'محاسبه کمیسیون مشاور املاک تهران',
            'محاسبه نرخ دیه سال ۱۴۰۴ و ۱۴۰۵',
            'وکالت در دادگاه صلح و شورای حل اختلاف',
            'استرداد ودیعه مسکن و پول پیش مستاجر',
            'وکالت در محاکم تجدیدنظر و دیوان عالی کشور',
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://vakilkhoini.ir/#faqpage',
          mainEntity: faqs.map((f, idx) => ({
            '@type': 'Question',
            '@id': `https://vakilkhoini.ir/#faq-question-${idx + 1}`,
            name: f.q,
            url: 'https://vakilkhoini.ir/#faq',
            mainEntityOfPage: 'https://vakilkhoini.ir/#faq',
            inLanguage: 'fa-IR',
            answerCount: 1,
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': `https://vakilkhoini.ir/#faq-answer-${idx + 1}`,
              text: f.a,
              url: 'https://vakilkhoini.ir/#faq',
              inLanguage: 'fa-IR',
              author: {
                '@type': 'Person',
                name: 'پرستو خوئینی',
                jobTitle: 'وکیل پایه یک دادگستری',
                sameAs: 'https://vakilkhoini.ir/darbareh',
              },
            },
          })),
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
      <Testimonials />
      <HomeAboutSpotlight />
      <HomeCalculatorsBanner />
      <HomeSearchKeywordsHub />
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
  } else if (pathname === '/mohasebe-senavat') {
    content = <CalculatorsPage defaultTab="laborLaw" />
  } else if (pathname === '/mohasebe-daftarkhaneh') {
    content = <CalculatorsPage defaultTab="notaryFee" />
  } else if (pathname === '/mohasebe-mohlat') {
    content = <CalculatorsPage defaultTab="legalDeadlines" />
  } else if (pathname === '/sazandeh-qarardad') {
    content = <CalculatorsPage defaultTab="contractBuilder" />
  } else if (pathname === '/mohasebe-cheque-risk') {
    content = <CalculatorsPage defaultTab="chequeRisk" />
  } else if (pathname === '/mohasebe-ajrat-al-misl') {
    content = <CalculatorsPage defaultTab="ajratAlMisl" />
  } else if (pathname === '/mohasebe-maliat-ers') {
    content = <CalculatorsPage defaultTab="inheritanceTax" />
  } else if (
    pathname === '/vakeel-melki-tehran' ||
    pathname === '/vakeel-chek-sayadi' ||
    pathname === '/vakeel-enhesar-verasat' ||
    pathname === '/vakeel-tanzim-gharardad' ||
    pathname === '/vakeel-dadgah-solh' ||
    pathname === '/vakeel-sarghofli' ||
    pathname === '/vakeel-esterdad-vadieh'
  ) {
    const slug = pathname.replace('/', '')
    content = <KeywordLandingPage slug={slug} />
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
      <LinkPrefetcher />
      <Header />
      {content}
      <Footer />
      <StickyMobileCTA />
    </>
  )
}

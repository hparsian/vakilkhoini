import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import {
  HomeServicesPreview,
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
import { useRouter, matchPath } from './router.jsx'
import useSEO from './hooks/useSEO.js'

function HomePage() {
  useSEO({
    title: 'پرستو خوئینی | وکیل پایه یک دادگستری در تهران و سعادت‌آباد - مشاوره حقوقی و ملکی',
    description:
      'پرستو خوئینی وکیل پایه یک دادگستری در تهران (سعادت‌آباد) - ارائه خدمات تخصصی دعاوی حقوقی، ملکی، تنظیم قرارداد و مشاوره تخصصی با رویکرد اخلاق‌مدارانه و مستند.',
    path: '/',
  })

  return (
    <main id="main">
      <Hero />
      <TrustBar />
      <HomeServicesPreview />
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
  } else if (pathname === '/maghalat') {
    content = <ArticlesListPage />
  } else if ((articleParams = matchPath('/maghalat/:slug', pathname))) {
    content = <ArticlePage slug={articleParams.slug} />
  } else if ((serviceParams = matchPath('/khadamat/:slug', pathname))) {
    content = <ServicePage slug={serviceParams.slug} />
  } else {
    content = <HomePage />
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

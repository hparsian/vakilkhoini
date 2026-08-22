import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import Services from './components/Services.jsx'
import About from './components/About.jsx'
import WhyChooseMe from './components/WhyChooseMe.jsx'
import Process from './components/Process.jsx'
import ConsultationForm from './components/ConsultationForm.jsx'
import Articles from './components/Articles.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import StickyMobileCTA from './components/StickyMobileCTA.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import ArticlesListPage from './pages/ArticlesListPage.jsx'
import ServicePage from './pages/ServicePage.jsx'
import { useRouter, matchPath } from './router.jsx'
import useSEO from './hooks/useSEO.js'

function HomePage() {
  useSEO({
    title: 'پرستو خوئینی | وکیل پایه یک دادگستری در تهران - مشاوره حقوقی و ملکی',
    description:
      'پرستو خوئینی وکیل پایه یک دادگستری در تهران (سعادت‌آباد) - ارائه خدمات تخصصی دعاوی حقوقی، ملکی، تنظیم قرارداد و مشاوره تخصصی با رویکرد اخلاق‌مدارانه و مستند.',
    path: '/',
  })

  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1))
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50)
      }
    }
  }, [])

  return (
    <main id="main">
      <Hero />
      <TrustBar />
      <Services />
      <About />
      <WhyChooseMe />
      <Process />
      <ConsultationForm />
      <Articles />
      <FAQ />
      <Contact />
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

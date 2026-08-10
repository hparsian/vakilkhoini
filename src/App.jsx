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

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">رفتن به محتوای اصلی</a>
      <Header />
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
      <Footer />
      <StickyMobileCTA />
    </>
  )
}

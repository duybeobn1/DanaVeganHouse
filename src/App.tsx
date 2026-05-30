import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import { AnimatePresence, motion } from 'motion/react'

function AnimatedRoutes() {
  const { pathname } = useLocation()
  const { lang } = useLanguage()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname + lang}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  )
}

import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { motion, AnimatePresence } from 'motion/react'

const navLinks = [
  { to: '/',        labelKey: ['Trang Chủ', 'Home'] },
  { to: '/menu',    labelKey: ['Thực Đơn', 'Menu'] },
  { to: '/about',   labelKey: ['Câu Chuyện', 'Our Story'] },
  { to: '/contact', labelKey: ['Liên Hệ', 'Contact'] },
]

const ease = [0.16, 1, 0.3, 1] as const

const stagger = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: 0.08 + i * 0.06, duration: 0.5, ease },
  }),
  exit: { opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.2 } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()
  const location = useLocation()
  const pathname = location.pathname
  const prevPath = useRef(pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (prevPath.current !== pathname) {
      setMenuOpen(false)
      prevPath.current = pathname
    }
  }, [pathname])

  const isMenuPage = pathname === '/menu'
  const atTop = !scrolled

  const textDark = isMenuPage ? 'text-forest' : 'text-brand'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        animate={{
          width: atTop ? 'auto' : '100%',
          borderRadius: atTop ? '9999px' : '0px',
          marginTop: atTop ? '1.5rem' : '0px',
          backgroundColor: scrolled
            ? 'rgba(255,248,236,0.92)'
            : isMenuPage
              ? 'rgba(255,248,236,0.88)'
              : atTop
                ? 'rgba(255,248,236,0.06)'
                : 'rgba(255,248,236,0.92)',
        }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="pointer-events-auto mx-auto backdrop-blur-2xl border border-white/10 shadow-ambient"
        style={scrolled || !atTop ? { maxWidth: '100%', paddingLeft: 0, paddingRight: 0 } : { paddingLeft: '1.25rem', paddingRight: '1.25rem' }}
      >
        <div className="flex items-center justify-between h-14 md:h-16 px-5 md:px-8"
          style={scrolled || !atTop ? { maxWidth: '1280px', margin: '0 auto' } : {}}
        >
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center shrink-0" onClick={() => setMenuOpen(false)}>
            <img src="/DANA%20identity-03.png" alt="Dāna" className="h-28 md:h-36 w-auto" />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 mx-4 lg:mx-6">
            {navLinks.map(({ to, labelKey }) => {
              const isActive = pathname === to
              return (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={`relative text-sm font-semibold tracking-wider uppercase transition-colors duration-200 ${
                    isActive
                      ? textDark
                      : isMenuPage || scrolled
                        ? 'text-earth/60 hover:text-earth'
                        : 'text-cream/70 hover:text-cream'
                  }`}
                  style={{ fontFamily: 'var(--font-display-wide)' }}
                >
                  <motion.span key={lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
                    {t(labelKey[0], labelKey[1])}
                  </motion.span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${textDark}`}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </NavLink>
              )
            })}
          </nav>

          {/* ── Right Controls (desktop) ── */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
              className={`text-xs font-bold tracking-widest uppercase border px-3 py-1.5 rounded-full transition-all duration-300 btn-magnetic ${
                isMenuPage || scrolled
                  ? 'border-earth/30 text-earth/70 hover:border-brand hover:text-brand'
                  : 'border-cream/40 text-cream/70 hover:border-cream hover:text-cream'
              }`}
            >
              {lang === 'vi' ? 'EN' : 'VI'}
            </button>

            <a
              href="tel:0828744931"
              className={`group relative text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full transition-all duration-300 btn-magnetic inline-flex items-center gap-2 ${
                isMenuPage || scrolled
                  ? 'bg-forest text-cream hover:bg-forest-mid'
                  : 'bg-brand text-cream hover:bg-brand-dark'
              }`}
            >
              {t('Đặt Bàn', 'Reserve')}
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className={`md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] ${
              isMenuPage || scrolled ? 'text-earth' : 'text-cream'
            }`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-[2px] w-5 rounded-full bg-current origin-center"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block h-[2px] w-5 rounded-full bg-current origin-center"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-[2px] w-5 rounded-full bg-current origin-center"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </div>
      </motion.div>

      {/* ── Mobile Overlay Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[-1] flex flex-col items-center justify-center bg-cream/90"
            style={{ backdropFilter: 'blur(24px)' }}
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map(({ to, labelKey }, i) => {
                const isActive = pathname === to
                return (
                  <motion.div
                    key={to}
                    custom={i}
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <NavLink
                      to={to}
                      end={to === '/'}
                      onClick={() => setMenuOpen(false)}
                      className={`text-2xl font-black tracking-tight transition-colors ${
                        isActive ? 'text-brand' : 'text-earth/60 hover:text-earth'
                      }`}
                      style={{ fontFamily: 'var(--font-display-wide)' }}
                    >
                      {t(labelKey[0], labelKey[1])}
                    </NavLink>
                  </motion.div>
                )
              })}
              <motion.div
                custom={navLinks.length}
                variants={stagger}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center gap-4 mt-4"
              >
                <button
                  onClick={() => { setLang(lang === 'vi' ? 'en' : 'vi'); setMenuOpen(false) }}
                  className="text-sm font-bold tracking-widest uppercase border-2 border-earth/30 text-earth px-5 py-2 rounded-full hover:border-brand hover:text-brand transition-all duration-300"
                >
                  {lang === 'vi' ? 'EN' : 'VI'}
                </button>
                <a
                  href="tel:0828744931"
                  className="text-sm font-bold tracking-widest uppercase bg-brand text-cream px-6 py-2 rounded-full hover:bg-brand-dark transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {t('Đặt Bàn', 'Reserve')}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { to: '/',        label: t('Trang Chủ', 'Home') },
    { to: '/menu',    label: t('Thực Đơn', 'Menu') },
    { to: '/about',   label: t('Câu Chuyện', 'Our Story') },
    { to: '/contact', label: t('Liên Hệ', 'Contact') },
  ]

  const baseText  = scrolled ? 'text-earth' : 'text-cream'
  const hoverText = scrolled ? 'hover:text-brand' : 'hover:text-gold'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">

        {/* ── Logo ── */}
        <Link to="/" className="flex flex-col items-center leading-none group" onClick={() => setMenuOpen(false)}>
          <span
            className="text-3xl tracking-tight transition-colors duration-300"
            style={{
              fontFamily: '"Nunito", "Be Vietnam Pro", sans-serif',
              fontWeight: 900,
              color: scrolled ? '#E8A800' : '#FFF8EC',
            }}
          >
            dāna
          </span>
          <span
            className={`text-[0.5rem] font-bold tracking-[0.35em] uppercase transition-colors duration-300 ${
              scrolled ? 'text-earth' : 'text-cream/70'
            }`}
          >
            VEGAN HOUSE
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wider uppercase transition-colors duration-200 ${
                  isActive
                    ? scrolled ? 'text-brand' : 'text-gold'
                    : `${baseText} ${hoverText}`
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ── Right Controls ── */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            className={`text-xs font-bold tracking-widest uppercase border px-3 py-1 rounded-full transition-all duration-200 ${
              scrolled
                ? 'border-earth/40 text-earth hover:border-brand hover:text-brand'
                : 'border-cream/50 text-cream/80 hover:border-cream hover:text-cream'
            }`}
          >
            {lang === 'vi' ? 'EN' : 'VI'}
          </button>

          {/* CTA */}
          <a
            href="tel:0828744931"
            className={`text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full transition-all duration-200 ${
              scrolled
                ? 'bg-brand text-cream hover:bg-brand-dark'
                : 'bg-cream text-earth hover:bg-rice'
            }`}
          >
            {t('Đặt Bàn', 'Reserve')}
          </a>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className={`md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 ${baseText}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span
            className={`block h-[2px] w-6 rounded transition-all duration-300 ${
              scrolled ? 'bg-earth' : 'bg-cream'
            } ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
          />
          <span
            className={`block h-[2px] w-6 rounded transition-all duration-300 ${
              scrolled ? 'bg-earth' : 'bg-cream'
            } ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-[2px] w-6 rounded transition-all duration-300 ${
              scrolled ? 'bg-earth' : 'bg-cream'
            } ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
          />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-cream ${
          menuOpen ? 'max-h-96 border-t border-rice-dark' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wider uppercase py-2 border-b border-rice-dark transition-colors ${
                  isActive ? 'text-brand' : 'text-earth hover:text-brand'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => { setLang(lang === 'vi' ? 'en' : 'vi'); setMenuOpen(false) }}
              className="text-xs font-bold tracking-widest uppercase border border-earth/40 text-earth px-3 py-1 rounded-full hover:border-brand hover:text-brand transition-colors"
            >
              {lang === 'vi' ? 'EN' : 'VI'}
            </button>
            <a
              href="tel:0828744931"
              className="text-xs font-bold tracking-widest uppercase bg-brand text-cream px-5 py-2 rounded-full hover:bg-brand-dark transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t('Đặt Bàn', 'Reserve')}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

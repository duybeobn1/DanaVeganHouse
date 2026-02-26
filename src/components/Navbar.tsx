import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()
  const location = useLocation()
  const pathname = location.pathname

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

  const isMenuPage = pathname === '/menu'
  // Use green tones on Menu page to match banner
  const baseText  = isMenuPage || scrolled ? 'text-earth' : 'text-cream'
  const hoverText = isMenuPage || scrolled ? 'hover:text-forest' : 'hover:text-gold'
  const bgColor   = scrolled ? 'bg-cream' : isMenuPage ? 'bg-cream/95' : 'bg-transparent'
  const brandColor = isMenuPage ? '#2A5C34' : scrolled ? '#E8A800' : '#FFF8EC'
  const activeLinkColor = isMenuPage ? 'text-forest' : 'text-brand'
  const menuPageCtaButton = isMenuPage ? 'bg-forest text-cream hover:bg-forest-mid' : 'bg-brand text-cream hover:bg-brand-dark'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        bgColor + (scrolled ? ' shadow-sm' : '')
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
              color: brandColor,
            }}
          >
            dāna
          </span>
          <span
            className={`text-[0.5rem] font-bold tracking-[0.35em] uppercase transition-colors duration-300 ${
              isMenuPage || scrolled ? 'text-earth' : 'text-cream/70'
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
                    ? isMenuPage ? 'text-forest' : 'text-gold'
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
              isMenuPage || scrolled
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
          className={`md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 ${baseText}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          {(() => {
            const barBase = (isMenuPage || scrolled) ? 'bg-earth' : 'bg-cream'
            const barCommon = 'block h-[2px] w-6 rounded transition-all duration-300'
            return (
              <>
                <span className={`${barCommon} ${barBase} ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`${barCommon} ${barBase} ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`${barCommon} ${barBase} ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </>
            )
          })()}
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
                  isActive ? activeLinkColor : 'text-earth hover:text-brand'
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
              className={`text-xs font-bold tracking-widest uppercase border px-3 py-1 rounded-full hover:border-brand hover:text-brand transition-colors ${
                isMenuPage ? 'border-earth/40 text-earth' : 'border-earth/40 text-earth'
              }`}
            >
              {lang === 'vi' ? 'EN' : 'VI'}
            </button>
            <a
              href="tel:0828744931"
              className={`text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full transition-colors ${menuPageCtaButton}`}
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

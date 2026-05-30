import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { motion, useInView } from 'motion/react'
import { ArrowRight, FacebookLogo, InstagramLogo } from '@phosphor-icons/react'

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative overflow-hidden bg-earth text-cream/80">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: 'url(/images/rice_grain_with_dana_logo.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="relative">
        {/* ── Tagline Banner ── */}
        <div className="bg-brand py-6 text-center">
          <p className="text-cream font-black text-xl md:text-2xl tracking-widest uppercase">LÒNG RỘNG LƯỢNG — CHAY HẠNH PHÚC</p>
          <p className="text-cream/70 text-sm tracking-[0.3em] uppercase mt-1">Happy Deeds · Happy Eat</p>
        </div>

        {/* ── Main Footer ── */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <Reveal>
            <div>
              <div className="mb-4">
                <span className="text-4xl tracking-tight" style={{ fontFamily: '"Nunito", "Be Vietnam Pro", sans-serif', fontWeight: 900, color: '#E8A800' }}>dāna</span>
                <p className="text-[0.6rem] font-bold tracking-[0.4em] uppercase text-cream/50 mt-0.5">VEGAN HOUSE</p>
              </div>
              <p className="text-sm leading-relaxed text-cream/60 max-w-xs">{t('Nhà chay đổi mới — nơi hành trình hạt gạo và văn hoá Việt Nam được tái sinh trong không gian nghệ thuật đầy cảm hứng.', 'A new-generation vegan house — where the journey of rice and Vietnamese culture is reborn in an inspiring artistic space.')}</p>
              <div className="mt-6 flex gap-4">
                <a href="https://www.facebook.com/danaveganhouse" target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:border-cream/60 hover:text-cream hover:bg-cream/10 transition-all duration-300">
                  <FacebookLogo size={16} weight="bold" />
                </a>
                <a href="https://www.instagram.com/danaveganhouse/" target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:border-cream/60 hover:text-cream hover:bg-cream/10 transition-all duration-300">
                  <InstagramLogo size={16} weight="bold" />
                </a>
                <a href="https://www.google.com/maps/place/Dana+Vegan+House" target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:border-cream/60 hover:text-cream hover:bg-cream/10 transition-all duration-300">
                  <ArrowRight size={16} weight="bold" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Address & Hours */}
          <Reveal delay={0.08}>
            <div>
              <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-cream/40 mb-5">{t('Địa Chỉ & Giờ Mở Cửa', 'Address & Hours')}</h4>
              <address className="not-italic text-sm leading-loose text-cream/70">
                <p className="font-semibold text-cream">12 Đông Thái</p>
                <p>Hàng Buồm, Hoàn Kiếm</p>
                <p>Hà Nội, Việt Nam</p>
              </address>
              <div className="mt-5 text-sm text-cream/70">
                <p className="font-semibold text-cream mb-1">{t('Giờ hoạt động', 'Opening Hours')}</p>
                <p>{t('Thứ 2 – Chủ Nhật', 'Mon – Sun')}</p>
                <p>11:00 – 22:00</p>
              </div>
              <a href="tel:0828744931" className="inline-block mt-4 text-sm font-bold text-gold hover:text-gold-light transition-colors">0828.744.931</a>
            </div>
          </Reveal>

          {/* Navigation */}
          <Reveal delay={0.15}>
            <div>
              <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-cream/40 mb-5">{t('Khám Phá', 'Explore')}</h4>
              <nav className="flex flex-col gap-3 text-sm">
                {[
                  { to: '/', label: t('Trang Chủ', 'Home') },
                  { to: '/menu', label: t('Thực Đơn', 'Menu') },
                  { to: '/about', label: t('Câu Chuyện', 'Our Story') },
                  { to: '/contact', label: t('Liên Hệ', 'Contact') },
                ].map(({ to, label }) => (
                  <Link key={to} to={to} className="text-cream/60 hover:text-cream transition-colors">{label}</Link>
                ))}
              </nav>
              <div className="mt-8">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-cream/40 mb-3">{t('Tìm Chúng Tôi Trên', 'Find Us On')}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Google Maps', 'TripAdvisor', 'HappyCow', 'Facebook'].map(s => (
                    <span key={s} className="border border-cream/20 text-cream/50 px-2 py-0.5 rounded hover:border-cream/50 hover:text-cream/80 transition-colors cursor-pointer">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-cream/10 py-5 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-cream/30">
            <p>© 2024 Dāna Vegan House. {t('Mọi quyền được bảo lưu.', 'All rights reserved.')}</p>
            <p>{t('Giá chưa bao gồm VAT.', 'Prices exclude VAT.')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

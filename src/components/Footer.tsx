import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-earth text-cream/80">
      {/* ── Tagline Banner ── */}
      <div className="bg-brand py-6 text-center">
        <p className="text-cream font-black text-xl md:text-2xl tracking-widest uppercase">
          LÒNG RỘNG LƯỢNG — CHAY HẠNH PHÚC
        </p>
        <p className="text-cream/70 text-sm tracking-[0.3em] uppercase mt-1">
          Generosity · Happy Vegan
        </p>
      </div>

      {/* ── Main Footer ── */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <div className="mb-4">
            <span className="text-4xl font-black text-cream tracking-tight">dāna</span>
            <p className="text-[0.6rem] font-bold tracking-[0.4em] uppercase text-cream/50 mt-0.5">
              VEGAN HOUSE
            </p>
          </div>
          <p className="text-sm leading-relaxed text-cream/60 max-w-xs">
            {t(
              'Nhà chay đổi mới — nơi hành trình hạt gạo và văn hoá Việt Nam được tái sinh trong không gian nghệ thuật đầy cảm hứng.',
              'A new-generation vegan house — where the journey of rice and Vietnamese culture is reborn in an inspiring artistic space.',
            )}
          </p>
          <div className="mt-6 flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:border-cream/60 hover:text-cream transition-colors text-sm font-bold">
              f
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:border-cream/60 hover:text-cream transition-colors text-xs font-bold">
              IG
            </a>
            <a href="https://www.google.com/maps/place/Dana+Vegan+House+-+Nh%C3%A0+Chay+Dana/@21.0362865,105.850389,17z/data=!4m6!3m5!1s0x3135ab16938eb5e7:0x5d8527ec7fb235f4!8m2!3d21.0362884!4d105.8529741!16s%2Fg%2F11l6s__8_5?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:border-cream/60 hover:text-cream transition-colors text-xs font-bold">
              ↗
            </a>
          </div>
        </div>

        {/* Address & Hours */}
        <div>
          <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-cream/40 mb-5">
            {t('Địa Chỉ & Giờ Mở Cửa', 'Address & Hours')}
          </h4>
          <address className="not-italic text-sm leading-loose text-cream/70">
            <p className="font-semibold text-cream">12 Đông Thái</p>
            <p>Hàng Buồm, Hoàn Kiếm</p>
            <p>Hà Nội, Việt Nam</p>
          </address>
          <div className="mt-5 text-sm text-cream/70">
            <p className="font-semibold text-cream mb-1">
              {t('Giờ hoạt động', 'Opening Hours')}
            </p>
            <p>{t('Thứ 2 – Chủ Nhật', 'Mon – Sun')}</p>
            <p>10:00 – 22:00</p>
          </div>
          <a href="tel:0828744931"
            className="inline-block mt-4 text-sm font-bold text-gold hover:text-gold-light transition-colors">
            0828.744.931
          </a>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-cream/40 mb-5">
            {t('Khám Phá', 'Explore')}
          </h4>
          <nav className="flex flex-col gap-3 text-sm">
            {[
              { to: '/', label: t('Trang Chủ', 'Home') },
              { to: '/menu', label: t('Thực Đơn', 'Menu') },
              { to: '/about', label: t('Câu Chuyện', 'Our Story') },
              { to: '/contact', label: t('Liên Hệ', 'Contact') },
            ].map(({ to, label }) => (
              <Link key={to} to={to}
                className="text-cream/60 hover:text-cream transition-colors">
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-8">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-cream/40 mb-3">
              {t('Tìm Chúng Tôi Trên', 'Find Us On')}
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Google Maps', 'TripAdvisor', 'HappyCow', 'Facebook'].map(s => (
                <span key={s}
                  className="border border-cream/20 text-cream/50 px-2 py-0.5 rounded hover:border-cream/50 hover:text-cream/80 transition-colors cursor-pointer">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-cream/10 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-cream/30">
          <p>© 2024 Dāna Vegan House. {t('Mọi quyền được bảo lưu.', 'All rights reserved.')}</p>
          <p>{t('Giá chưa bao gồm VAT.', 'Prices exclude VAT.')}</p>
        </div>
      </div>
    </footer>
  )
}

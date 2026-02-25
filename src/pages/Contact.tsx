import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <main>
      {/* ── Hero ── */}
      <section
        className="relative pt-20 pb-16 md:pt-28 md:pb-20 rice-texture overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #2A5C34 0%, #143018 60%, #0C200F 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-forest-light mb-4">
            {t('Ghé Thăm Chúng Tôi', 'Visit Us')}
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-cream leading-none mb-4">
            {t('LIÊN HỆ', 'CONTACT')}
          </h1>
          <p className="text-cream/60 text-sm">12 Đông Thái · Hà Nội</p>
        </div>
      </section>

      {/* ── Info Grid ── */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Left: contact details */}
          <div className="space-y-10">
            {/* Address */}
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand mb-4">
                {t('Địa Chỉ', 'Address')}
              </p>
              <address className="not-italic text-earth text-base leading-loose">
                <p className="font-black text-xl text-earth">12 Đông Thái</p>
                <p className="text-earth-mid">Hàng Buồm, Hoàn Kiếm</p>
                <p className="text-earth-mid">Hà Nội, Việt Nam</p>
              </address>
              <a
                href="https://www.google.com/maps/place/Dana+Vegan+House+-+Nh%C3%A0+Chay+Dana/@21.0362865,105.850389,17z/data=!4m6!3m5!1s0x3135ab16938eb5e7:0x5d8527ec7fb235f4!8m2!3d21.0362884!4d105.8529741!16s%2Fg%2F11l6s__8_5?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-xs font-bold tracking-wider uppercase text-forest hover:text-forest-mid transition-colors"
              >
                {t('Xem trên Google Maps', 'Open in Google Maps')} ↗
              </a>
            </div>

            {/* Hours */}
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand mb-4">
                {t('Giờ Mở Cửa', 'Opening Hours')}
              </p>
              <div className="space-y-2 text-earth-mid text-sm">
                <div className="flex justify-between border-b border-rice-dark pb-2">
                  <span className="font-semibold text-earth">
                    {t('Thứ 2 – Thứ 6', 'Mon – Fri')}
                  </span>
                  <span>10:00 – 22:00</span>
                </div>
                <div className="flex justify-between border-b border-rice-dark pb-2">
                  <span className="font-semibold text-earth">
                    {t('Thứ 7', 'Saturday')}
                  </span>
                  <span>10:00 – 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-earth">
                    {t('Chủ Nhật', 'Sunday')}
                  </span>
                  <span>10:00 – 22:00</span>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand mb-4">
                {t('Đặt Bàn & Liên Hệ', 'Reservations & Enquiries')}
              </p>
              <a
                href="tel:0828744931"
                className="text-3xl font-black text-earth hover:text-brand transition-colors"
              >
                0828.744.931
              </a>
              <p className="text-earth/50 text-sm mt-2">
                {t('Gọi hoặc nhắn tin để đặt bàn', 'Call or text to reserve a table')}
              </p>
            </div>

            {/* Social */}
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand mb-4">
                {t('Tìm Chúng Tôi', 'Find Us On')}
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Facebook', href: 'https://facebook.com' },
                  { label: 'Instagram', href: 'https://instagram.com' },
                  { label: 'TripAdvisor', href: '#' },
                  { label: 'HappyCow', href: '#' },
                  { label: 'Google Maps', href: 'https://www.google.com/maps/place/Dana+Vegan+House+-+Nh%C3%A0+Chay+Dana/@21.0362865,105.850389,17z/data=!4m6!3m5!1s0x3135ab16938eb5e7:0x5d8527ec7fb235f4!8m2!3d21.0362884!4d105.8529741!16s%2Fg%2F11l6s__8_5?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D' },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold tracking-wider uppercase border border-earth/30 text-earth-mid px-4 py-2 rounded-full hover:border-brand hover:text-brand transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: map + note */}
          <div className="space-y-6">
            {/* Map placeholder */}
            <div
              className="rounded-2xl aspect-video relative overflow-hidden"
              style={{ backgroundColor: '#1E4426' }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="text-5xl mb-3">🗺️</p>
                <p className="text-cream font-black text-lg">12 Đông Thái</p>
                <p className="text-cream/60 text-sm mt-1">Hàng Buồm, Hoàn Kiếm · Hà Nội</p>
                <a
                  href="https://www.google.com/maps/place/Dana+Vegan+House+-+Nh%C3%A0+Chay+Dana/@21.0362865,105.850389,17z/data=!4m6!3m5!1s0x3135ab16938eb5e7:0x5d8527ec7fb235f4!8m2!3d21.0362884!4d105.8529741!16s%2Fg%2F11l6s__8_5?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 text-xs font-bold tracking-widest uppercase text-gold border border-gold/40 px-5 py-2 rounded-full hover:bg-gold hover:text-earth transition-all duration-200"
                >
                  {t('Chỉ Đường', 'Get Directions')} ↗
                </a>
              </div>
            </div>

            {/* Note */}
            <div className="bg-rice rounded-2xl p-6">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand mb-3">
                {t('Lưu Ý', 'Note')}
              </p>
              <p className="text-earth/70 text-sm leading-relaxed">
                {t(
                  'Dāna Vegan House nằm trên phố Đông Thái nhỏ, gần Chợ Gạo, trong khu phố cổ Hàng Buồm, Hoàn Kiếm. Tìm biển hiệu "dāna VEGAN HOUSE".',
                  'Dāna Vegan House is located on the small Đông Thái Street, near the Rice Market, in the historic Hàng Buồm neighborhood, Hoàn Kiếm. Look for the "dāna VEGAN HOUSE" sign.',
                )}
              </p>
            </div>

            {/* Dana Connect */}
            <div className="bg-earth rounded-2xl p-6">
              <p className="text-gold font-black text-base mb-3">
                {t('Kết Nối Cùng Dāna', 'Connect with Dāna')}
              </p>
              <p className="text-cream/60 text-sm leading-relaxed mb-4">
                {t(
                  'Hãy cùng Dāna lan toả tinh thần chay đổi mới và văn hóa ẩm thực Việt Nam thông qua những trải nghiệm thú vị của bạn!',
                  'Join Dāna in spreading the spirit of modern veganism and Vietnamese food culture through your experiences!',
                )}
              </p>
              <div className="flex gap-2">
                <a href="https://instagram.com" target="_blank" rel="noreferrer"
                  className="text-xs font-bold tracking-wider uppercase text-gold border border-gold/30 px-4 py-2 rounded-full hover:bg-gold hover:text-earth transition-colors">
                  Instagram
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer"
                  className="text-xs font-bold tracking-wider uppercase text-gold border border-gold/30 px-4 py-2 rounded-full hover:bg-gold hover:text-earth transition-colors">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="py-16 text-center rice-texture relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #C4623A 0%, #8B3A1A 100%)',
        }}
      >
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <p className="text-cream font-black text-3xl md:text-4xl mb-4">
            {t('Đặt Bàn Ngay', 'Reserve a Table')}
          </p>
          <p className="text-cream/70 text-sm mb-8">
            {t('Chúng tôi rất mong được phục vụ bạn!', 'We look forward to serving you!')}
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="tel:0828744931"
              className="px-8 py-3 text-sm font-bold tracking-widest uppercase bg-cream text-earth rounded-full hover:bg-rice transition-colors"
            >
              {t('Gọi Ngay', 'Call Now')}
            </a>
            <Link
              to="/menu"
              className="px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-cream text-cream rounded-full hover:bg-cream hover:text-earth transition-colors"
            >
              {t('Xem Thực Đơn', 'View Menu')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

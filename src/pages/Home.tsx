import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { featuredDishes, ingredientRegions, mamNha } from '../data/menuData'

export default function Home() {
  const { t } = useLanguage()

  return (
    <main>
      {/* ══════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden rice-texture"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, #C4623A 0%, #8B3A1A 50%, #4A1E0A 100%)',
        }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,248,236,0.3) 40px, rgba(255,248,236,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,248,236,0.3) 40px, rgba(255,248,236,0.3) 41px)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Big title */}
          <h1 className="leading-none tracking-tighter select-none">
            <span className="block text-[18vw] md:text-[13rem] font-black text-cream fade-in-up" style={{ lineHeight: 0.88 }}>
              HOUSE
            </span>
            <span className="block text-[18vw] md:text-[13rem] font-black text-gold fade-in-up-1" style={{ lineHeight: 0.88 }}>
              OF
            </span>
            <span className="block text-[18vw] md:text-[13rem] font-black text-cream fade-in-up-2" style={{ lineHeight: 0.88 }}>
              VEGAN
            </span>
          </h1>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 my-6 fade-in-up-3">
            <div className="h-px w-16 bg-cream/30" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="h-px w-16 bg-cream/30" />
          </div>

          {/* Brand name */}
          <div className="fade-in-up-3">
            <p className="text-4xl md:text-5xl font-black text-cream tracking-tight">dāna</p>
            <p className="text-xs font-bold tracking-[0.5em] uppercase text-cream/50 mt-1">VEGAN HOUSE</p>
          </div>

          {/* Taglines */}
          <p className="mt-4 text-base md:text-lg text-cream/80 italic fade-in-up-4">
            {t('Nhà Chay Đổi Mới', 'New Generation Vegan House')}
          </p>
          <p className="text-xs tracking-[0.25em] uppercase text-cream/50 mt-2 fade-in-up-4">
            {t('Lòng Rộng Lượng · Chay Hạnh Phúc', 'Generosity · Happy Vegan')}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center fade-in-up-4">
            <Link
              to="/menu"
              className="px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-cream text-cream hover:bg-cream hover:text-earth transition-all duration-200 rounded-full"
            >
              {t('Xem Thực Đơn', 'View Menu')}
            </Link>
            <a
              href="tel:0828744931"
              className="px-8 py-3 text-sm font-bold tracking-widest uppercase bg-cream text-earth hover:bg-rice transition-all duration-200 rounded-full"
            >
              {t('Gọi Đặt Bàn', 'Reserve a Table')}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 bounce-slow">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8 bg-cream/30" />
            <div className="w-1 h-1 rounded-full bg-cream/50" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. PHILOSOPHY STRIP
      ══════════════════════════════════════════════ */}
      <section className="bg-earth py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
          {[
            {
              icon: '🌾',
              title: t('100% Thuần Chay', '100% Plant-Based'),
              sub: t('Không thịt · Không hải sản', 'No meat · No seafood'),
            },
            {
              icon: '🗺️',
              title: t('Nguyên Liệu Địa Phương', 'Local Ingredients'),
              sub: t('Từ các vùng miền Việt Nam', 'From across Vietnam'),
            },
            {
              icon: '🏠',
              title: t('12 Đông Thái, Hà Nội', '12 Đông Thái, Hanoi'),
              sub: t('Hàng Buồm · Hoàn Kiếm', 'Hàng Buồm · Hoàn Kiếm'),
            },
          ].map(({ icon, title, sub }, i) => (
            <div key={i} className="flex items-center gap-0 w-full md:w-auto">
              <div className="flex flex-col items-center text-center px-8 flex-1">
                <span className="text-2xl mb-2">{icon}</span>
                <p className="text-cream font-bold text-sm tracking-wider uppercase">{title}</p>
                <p className="text-cream/50 text-xs mt-1">{sub}</p>
              </div>
              {i < 2 && (
                <div className="hidden md:block w-px h-12 bg-cream/15" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. ABOUT / KHO GẠO STORY
      ══════════════════════════════════════════════ */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: decorative */}
          <div className="order-2 md:order-1">
            <div
              className="relative rounded-2xl overflow-hidden flex items-center justify-center aspect-square max-w-md mx-auto"
              style={{ background: 'radial-gradient(circle at center, #C4623A 0%, #8B3A1A 70%)' }}
            >
              {/* Rice grain pattern */}
              <div className="absolute inset-0 rice-texture" />
              {/* Central text art */}
              <div className="relative z-10 text-center p-8">
                <p className="text-[6rem] md:text-[8rem] font-black text-cream/15 leading-none select-none">
                  1936
                </p>
                <p className="text-cream text-xl font-bold mt-2 tracking-wider">
                  {t('KHO GẠO', 'RICE WAREHOUSE')}
                </p>
                <p className="text-cream/60 text-xs tracking-[0.3em] uppercase mt-1">
                  {t('Thành Thăng Long', 'Thăng Long Citadel')}
                </p>
                <div className="mt-4 w-12 h-0.5 bg-gold/60 mx-auto" />
                <p className="text-cream/50 text-xs mt-3 leading-relaxed max-w-[180px] mx-auto">
                  {t(
                    'Ngôi nhà Bắc Bộ cổ gần 100 tuổi từ Nam Định',
                    'A nearly 100-year-old Northern Vietnamese house from Nam Định',
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Right: story text */}
          <div className="order-1 md:order-2">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand mb-4">
              {t('Câu Chuyện Của Chúng Tôi', 'Our Story')}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-earth leading-tight mb-6">
              {t('Kho Gạo\nThành Thăng Long', 'Rice Warehouse\nof Thăng Long')}
            </h2>
            <div className="w-10 h-0.5 bg-brand mb-6" />
            <p className="text-earth-mid text-base leading-relaxed mb-4">
              {t(
                'Dāna Vegan House được tái hiện như một Kho Gạo Thành Thăng Long xưa ở khu phố Chợ Gạo trên con phố Đông Thái nhỏ xinh mà tấp nập.',
                'Dāna Vegan House is reimagined as an ancient rice warehouse of Thăng Long Citadel, on the charming and bustling Đông Thái Street.',
              )}
            </p>
            <p className="text-earth-mid text-base leading-relaxed mb-4">
              {t(
                'Tầng hai là ngôi nhà gỗ ba gian cổ của văn hóa Bắc Bộ gần 100 tuổi được Dana mang về từ Nam Định và phục dựng lại giữa phố cổ Hà Nội.',
                'On the second floor sits a nearly century-old three-bay wooden house from Northern Vietnam, brought from Nam Định and rebuilt in the heart of Hanoi\'s Old Quarter.',
              )}
            </p>
            <p className="text-earth/60 text-sm leading-relaxed mb-8">
              {t(
                'Theo Wikipedia, Dāna là một từ tiếng Phạn có nghĩa là Rộng Lượng hay "Mọi hình thức của Cho đi". Tại Dāna, mỗi món ăn là một sự kết nối, hân hoan và hoan hỉ.',
                'According to Wikipedia, Dāna is a Sanskrit word meaning Generosity or "Every form of giving." At Dāna, every dish is a connection, a joy, and a celebration.',
              )}
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-brand hover:gap-4 transition-all duration-200"
            >
              {t('Khám phá thêm', 'Discover more')}
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. FEATURED DISHES
      ══════════════════════════════════════════════ */}
      <section className="bg-rice py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand mb-3">
              {t('Gợi Ý Của Bếp', "Chef's Recommendations")}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-earth">
              {t('Món Nổi Bật', 'Featured Dishes')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredDishes.map((dish) => (
              <div
                key={dish.id}
                className="rounded-2xl p-6 flex flex-col justify-between min-h-[240px] group hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                style={{ backgroundColor: dish.color }}
              >
                <div>
                  {dish.region && (
                    <p className="text-[0.65rem] font-bold tracking-[0.25em] uppercase mb-3"
                      style={{ color: `${dish.textColor}70` }}>
                      📍 {dish.region}
                    </p>
                  )}
                  <h3 className="text-xl font-black leading-tight"
                    style={{ color: dish.textColor }}>
                    {dish.name.vi}
                  </h3>
                  <p className="text-xs mt-1 italic"
                    style={{ color: `${dish.textColor}80` }}>
                    {dish.name.en}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-base font-black"
                    style={{ color: dish.textColor }}>
                    {dish.price}đ
                  </p>
                  <span className="text-xs font-bold tracking-wider"
                    style={{ color: `${dish.textColor}60` }}>
                    ★
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-block px-10 py-3 text-sm font-bold tracking-widest uppercase bg-brand text-cream rounded-full hover:bg-brand-dark transition-colors duration-200"
            >
              {t('Xem Toàn Bộ Thực Đơn', 'See Full Menu')}
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. BẢN ĐỒ ẨM THỰC CHAY
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: '#3D2210' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold mb-3">
              {t('Nguyên Liệu Từ Khắp Việt Nam', 'Ingredients From Across Vietnam')}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-cream mb-4">
              {t('Bản Đồ Ẩm Thực Chay', 'Vegan Culinary Map')}
            </h2>
            <p className="text-cream/50 text-sm max-w-lg mx-auto leading-relaxed">
              {t(
                'Mỗi món ăn là một chuyến du ngoạn đến vùng đất mới và khám phá những vùng nguyên liệu Việt.',
                'Every dish is a journey to a new land, exploring the finest ingredient regions of Vietnam.',
              )}
            </p>
          </div>

          {/* Three columns: North / Central / South */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(['north', 'central', 'south'] as const).map((zone) => {
              const labels: Record<typeof zone, { vi: string; en: string }> = {
                north:   { vi: 'Miền Bắc', en: 'North' },
                central: { vi: 'Miền Trung', en: 'Central' },
                south:   { vi: 'Miền Nam', en: 'South' },
              }
              const items = ingredientRegions.filter(r => r[zone])
              return (
                <div key={zone}>
                  <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-gold/70 border-b border-cream/10 pb-3 mb-4">
                    {labels[zone].vi} / {labels[zone].en}
                  </h3>
                  <div className="space-y-3">
                    {items.map(({ region, ingredient }) => (
                      <div key={region} className="flex items-start gap-3">
                        <span className="text-brand mt-0.5 text-xs">▸</span>
                        <div>
                          <p className="text-cream text-sm font-semibold">{region}</p>
                          <p className="text-cream/40 text-xs mt-0.5">{ingredient}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. GIẢI KHÁT TEASER
      ══════════════════════════════════════════════ */}
      <section
        className="relative py-24 md:py-32 rice-texture overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, #C4623A 0%, #8B3A1A 60%, #5C2D0A 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-gold/80 mb-4">
              {t('Thức Uống Bổ Dưỡng', 'Nourishing Beverages')}
            </p>
            <h2 className="text-6xl md:text-8xl font-black text-cream leading-none mb-2">
              GIẢI
            </h2>
            <h2 className="text-6xl md:text-8xl font-black text-gold leading-none mb-6">
              KHÁT
            </h2>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs mb-8">
              {t(
                '"Nước Giải Khát" — từ được dùng từ thời bao cấp, gợi nhắc những thức uống bổ dưỡng dành cho khách quý.',
                '"Nước Giải Khát" — a term from the subsidy era, evoking nourishing drinks for honored guests.',
              )}
            </p>
            <Link
              to="/menu#giai-khat"
              className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-cream border-b border-cream/30 pb-1 hover:border-cream transition-colors duration-200"
            >
              {t('Xem Đồ Uống', 'View Drinks')} →
            </Link>
          </div>

          {/* Drink cards */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { name: { vi: 'Sữa Gạo Lắc Hàng Chuối', en: 'Hàng Chuối Shaken Rice Milk' }, price: '65.000', tag: t('Đặc Trưng', 'Signature') },
              { name: { vi: 'Cold Brew Dāna', en: 'Dāna Rice Cold Brew' }, price: '65.000', tag: t('Đặc Trưng', 'Signature') },
              { name: { vi: 'Junbucha Mơ Muối', en: 'Salted Plum Junbucha' }, price: '80.000', tag: t('Thủ Công', 'Craft') },
            ].map(({ name, price, tag }) => (
              <div key={name.vi} className="flex items-center justify-between border border-cream/15 rounded-xl px-5 py-4 bg-cream/5 hover:bg-cream/10 transition-colors">
                <div>
                  <p className="text-cream font-bold text-sm">{name.vi}</p>
                  <p className="text-cream/40 text-xs italic">{name.en}</p>
                </div>
                <div className="text-right">
                  <p className="text-gold font-black text-sm">{price}đ</p>
                  <p className="text-gold/50 text-[0.6rem] uppercase tracking-wider">{tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. MÂM NHÀ — SET MENUS
      ══════════════════════════════════════════════ */}
      <section className="bg-rice py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand mb-3">
              {t('Dành Cho Nhóm 2–4 Người', 'For Groups of 2–4')}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-earth">
              {t('Mâm Cơm Nhà', 'Family Table Sets')}
            </h2>
            <p className="text-earth/50 text-sm mt-3">
              {t('Giá gốc đã được giảm ưu đãi', 'Special discounted prices')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mamNha.slice(0, 3).map((set) => (
              <div key={set.id} className="bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-earth px-6 py-4">
                  <h3 className="text-lg font-black text-cream">{set.name.vi}</h3>
                  <p className="text-cream/50 text-xs italic">{set.name.en}</p>
                </div>
                <div className="px-6 py-5">
                  <p className="text-xs text-earth/50 font-semibold tracking-wider uppercase mb-3">
                    {t('Bao gồm', 'Includes')}
                  </p>
                  <ul className="space-y-1.5 mb-5">
                    {set.dishes.map((dish) => (
                      <li key={dish} className="flex items-start gap-2 text-sm text-earth/70">
                        <span className="text-brand mt-0.5 text-xs">•</span>
                        {dish}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between border-t border-rice-dark pt-4">
                    <div>
                      <p className="text-xs text-earth/40 line-through">
                        {set.originalPrice.toLocaleString('vi-VN')}đ
                      </p>
                      <p className="text-xl font-black text-brand">
                        {set.price.toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                    <p className="text-xs text-earth/50">{set.serves}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/menu#mam-nha"
              className="text-sm font-bold tracking-wider uppercase text-brand hover:text-brand-dark transition-colors underline underline-offset-4"
            >
              {t('Xem tất cả 6 mâm →', 'View all 6 sets →')}
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          8. LOCATION / CTA
      ══════════════════════════════════════════════ */}
      <section className="bg-forest py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Info */}
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-forest-light mb-4">
              {t('Tìm Chúng Tôi', 'Find Us')}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-cream mb-8 leading-tight">
              {t('Ghé Thăm\nDāna Hôm Nay', 'Visit Dāna\nToday')}
            </h2>

            <div className="space-y-5 text-cream/70 text-sm">
              <div className="flex gap-4">
                <span className="text-forest-light text-lg mt-0.5">📍</span>
                <div>
                  <p className="text-cream font-semibold">12 Đông Thái, Hàng Buồm</p>
                  <p>Hoàn Kiếm, Hà Nội, Việt Nam</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-forest-light text-lg mt-0.5">🕙</span>
                <div>
                  <p className="text-cream font-semibold">{t('Giờ Mở Cửa', 'Opening Hours')}</p>
                  <p>{t('Thứ 2 – Chủ Nhật · 10:00 – 22:00', 'Mon – Sun · 10:00 – 22:00')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-forest-light text-lg mt-0.5">📞</span>
                <div>
                  <p className="text-cream font-semibold">{t('Đặt Bàn', 'Reservations')}</p>
                  <a href="tel:0828744931" className="text-gold hover:text-gold-light transition-colors font-bold">
                    0828.744.931
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <a
                href="https://maps.google.com/?q=12+Dong+Thai+Hanoi"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 text-xs font-bold tracking-widest uppercase bg-cream text-earth rounded-full hover:bg-rice transition-colors"
              >
                {t('Xem Bản Đồ', 'View Map')}
              </a>
              <Link
                to="/contact"
                className="px-6 py-3 text-xs font-bold tracking-widest uppercase border border-cream/30 text-cream rounded-full hover:border-cream transition-colors"
              >
                {t('Liên Hệ', 'Contact Us')}
              </Link>
            </div>
          </div>

          {/* Map placeholder */}
          <div
            className="rounded-2xl overflow-hidden aspect-square relative"
            style={{ backgroundColor: '#1E4426' }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <p className="text-6xl mb-4">🏮</p>
              <p className="text-cream font-black text-xl">12 Đông Thái</p>
              <p className="text-cream/60 text-sm mt-1">Hàng Buồm, Hoàn Kiếm</p>
              <p className="text-cream/60 text-sm">Hà Nội</p>
              <a
                href="https://maps.google.com/?q=12+Dong+Thai+Hoan+Kiem+Hanoi"
                target="_blank"
                rel="noreferrer"
                className="mt-6 text-xs font-bold tracking-widest uppercase text-gold border border-gold/40 px-5 py-2 rounded-full hover:bg-gold hover:text-earth transition-all duration-200"
              >
                Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

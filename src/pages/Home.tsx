import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { featuredDishes, ingredientRegions, mamNha } from '../data/menuData'
import { motion, useInView } from 'motion/react'
import { Grains, MapPin, House, Clock, Phone, Star, Lamp, ArrowRight } from '@phosphor-icons/react'

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const { t } = useLanguage()

  return (
    <main>
      {/* ══════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/rice_flower.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(74, 30, 10, 0.3) 0%, rgba(196, 98, 58, 0.25) 50%, rgba(74, 30, 10, 0.35) 100%)', mixBlendMode: 'multiply' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(74, 30, 10, 0.1) 0%, rgba(74, 30, 10, 0.3) 60%, rgba(74, 30, 10, 0.5) 100%)' }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,248,236,0.3) 40px, rgba(255,248,236,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,248,236,0.3) 40px, rgba(255,248,236,0.3) 41px)' }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-28 md:pt-36">
          <h1 className="leading-none tracking-tighter select-none" style={{ fontFamily: 'var(--font-display-wide)' }}>
            <span className="block text-[18vw] md:text-[13rem] font-black text-cream fade-in-up" style={{ lineHeight: 0.88 }}>HOUSE</span>
            <span className="block text-[18vw] md:text-[13rem] font-black text-gold fade-in-up-1" style={{ lineHeight: 0.88 }}>OF</span>
            <span className="block text-[18vw] md:text-[13rem] font-black text-cream fade-in-up-2" style={{ lineHeight: 0.88 }}>VEGAN</span>
          </h1>

          <div className="mt-12 flex items-center justify-between max-w-lg mx-auto">
            <Link to="/menu" className="inline-flex items-center px-8 py-3.5 text-sm font-bold tracking-widest uppercase border-2 border-cream text-cream hover:bg-cream hover:text-earth rounded-full transition-all duration-300">
              {t('Xem Thực Đơn', 'View Menu')}
            </Link>
            <a href="tel:0828744931" className="inline-flex items-center px-8 py-3.5 text-sm font-bold tracking-widest uppercase bg-cream text-earth rounded-full transition-all duration-300">
              {t('Gọi Đặt Bàn', 'Reserve a Table')}
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 bounce-slow">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8 bg-cream/30" />
            <div className="w-1 h-1 rounded-full bg-cream/50" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. PILLARS
      ══════════════════════════════════════════════ */}
      <section className="relative py-8" style={{ backgroundColor: '#5C3317' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/rice_grain_with_dana_logo.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: '0.08' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
          {[
            { icon: Grains, title: t('100% Thuần Chay', '100% Plant-Based'), sub: t('Không thịt · Không hải sản', 'No meat · No seafood') },
            { icon: MapPin, title: t('Nguyên Liệu Địa Phương', 'Local Ingredients'), sub: t('Từ các vùng miền Việt Nam', 'From across Vietnam') },
            { icon: House, title: t('12 Phố Đông Thái, TP.Hà Nội', '12 Phố Đông Thái, Hanoi'), sub: t('Phường Hoàn Kiếm', 'Phường Hoàn Kiếm') },
          ].map(({ icon: Icon, title, sub }, i) => (
            <Reveal key={i} delay={i * 0.12} className="flex items-center gap-0 w-full md:w-auto">
              <div className="flex flex-col items-center text-center px-8 flex-1">
                <Icon size={24} weight="light" className="text-cream/80 mb-2" />
                <p className="text-cream font-bold text-sm tracking-wider uppercase">{title}</p>
                <p className="text-cream/50 text-xs mt-1">{sub}</p>
              </div>
              {i < 2 && <div className="hidden md:block w-px h-12 bg-cream/15" />}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. ABOUT / KHO GẠO STORY
      ══════════════════════════════════════════════ */}
      <section className="bg-cream py-32 md:py-40">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal className="order-2 md:order-1">
            <div className="relative rounded-[2rem] overflow-hidden max-w-md mx-auto shadow-premium" style={{ aspectRatio: '1/1' }}>
              <img src="/images/old_house_rooftop.png" alt="Ngôi nhà cổ Kho Gạo" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(74, 30, 10, 0.3) 0%, rgba(74, 30, 10, 0.7) 100%)' }} />
              <div className="relative z-10 text-center p-8 flex flex-col items-center justify-center h-full">
                <p className="text-[6rem] md:text-[8rem] font-black text-cream/20 leading-none select-none" style={{ fontFamily: 'var(--font-display-wide)' }}>1936</p>
                <div className="w-12 h-0.5 bg-gold/60 mx-auto mt-4 mb-3" />
                <p className="text-cream text-xl font-bold tracking-wider">{t('KHO GẠO', 'RICE WAREHOUSE')}</p>
                <p className="text-cream/60 text-xs tracking-[0.3em] uppercase mt-1">{t('Thành Thăng Long', 'Thăng Long Citadel')}</p>
                <p className="text-cream/70 text-xs mt-4 leading-relaxed max-w-[180px]">{t('Ngôi nhà Bắc Bộ cổ gần 100 tuổi từ Nam Định', 'A nearly 100-year-old Northern Vietnamese house from Nam Định')}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-black text-earth leading-tight mb-6" style={{ fontFamily: 'var(--font-display-wide)' }}>{t('Kho Gạo\nThành Thăng Long', 'Rice Warehouse\nof Thăng Long')}</h2>
            <div className="w-10 h-0.5 bg-brand mb-6" />
            <p className="text-earth-mid text-base leading-relaxed mb-4">{t('Dāna Vegan House được tái hiện như một Kho Gạo Thành Thăng Long xưa ở khu phố Chợ Gạo trên con phố Đông Thái nhỏ xinh mà tấp nập.', 'Dāna Vegan House is reimagined as an ancient rice warehouse of Thăng Long Citadel, on the charming and bustling Đông Thái Street.')}</p>
            <p className="text-earth-mid text-base leading-relaxed mb-4">{t('Tầng hai là ngôi nhà gỗ ba gian cổ của văn hóa Bắc Bộ gần 100 tuổi được Dana mang về từ Nam Định và phục dựng lại giữa phố cổ Hà Nội.', 'On the second floor sits a nearly century-old three-bay wooden house from Northern Vietnam, brought from Nam Định and rebuilt in the heart of Hanoi\'s Old Quarter.')}</p>
            <p className="text-earth/60 text-sm leading-relaxed mb-8">{t('Theo Wikipedia, Dāna là một từ tiếng Phạn có nghĩa là Rộng Lượng hay "Mọi hình thức của Cho đi". Tại Dāna, mỗi món ăn là một sự kết nối, hân hoan và hoan hỉ.', 'According to Wikipedia, Dāna is a Sanskrit word meaning Generosity or "Every form of giving." At Dāna, every dish is a connection, a joy, and a celebration.')}</p>
            <Link to="/about" className="group inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-brand transition-all duration-300">
              {t('Khám phá thêm', 'Discover more')}
              <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. FEATURED DISHES
      ══════════════════════════════════════════════ */}
      <section className="bg-rice py-32 md:py-40">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-earth" style={{ fontFamily: 'var(--font-display-wide)' }}>{t('Món Nổi Bật', 'Featured Dishes')}</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredDishes.map((dish, i) => (
              <Reveal key={dish.id} delay={i * 0.08}>
                <div className="double-bezel shadow-premium h-full">
                  <div className="double-bezel-inner p-6 flex flex-col justify-between min-h-[260px] group cursor-pointer" style={{ backgroundColor: dish.color }}>
                    <div>
                      {dish.region && (
                        <p className="flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: `${dish.textColor}70` }}>
                          <MapPin size={10} weight="bold" /> {dish.region}
                        </p>
                      )}
                      <h3 className="text-xl font-black leading-tight" style={{ color: dish.textColor }}>{dish.name.vi}</h3>
                      <p className="text-xs mt-1 italic" style={{ color: `${dish.textColor}80` }}>{dish.name.en}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-base font-black" style={{ color: dish.textColor }}>{dish.price}đ</p>
                      <Star size={12} weight="fill" style={{ color: `${dish.textColor}50` }} />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="text-center mt-12">
            <Link to="/menu" className="inline-flex items-center gap-2 px-10 py-3 text-sm font-bold tracking-widest uppercase bg-brand text-cream rounded-full hover:bg-brand-dark transition-all duration-300 btn-magnetic">
              {t('Xem Toàn Bộ Thực Đơn', 'See Full Menu')}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. BẢN ĐỒ ẨM THỰC CHAY
      ══════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 relative overflow-hidden" style={{ backgroundColor: '#3D2210' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/rice_grain_with_dana_logo.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', opacity: '0.15' }} />
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-cream mb-4" style={{ fontFamily: 'var(--font-display-wide)' }}>{t('Bản Đồ Ẩm Thực Chay', 'Vegan Culinary Map')}</h2>
            <p className="text-cream/50 text-sm max-w-lg mx-auto leading-relaxed">{t('Mỗi món ăn là một chuyến du ngoạn đến vùng đất mới và khám phá những vùng nguyên liệu Việt.', 'Every dish is a journey to a new land, exploring the finest ingredient regions of Vietnam.')}</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(['north', 'central', 'south'] as const).map((zone, zi) => {
              const labels: Record<string, { vi: string; en: string }> = { north: { vi: 'Miền Bắc', en: 'North' }, central: { vi: 'Miền Trung', en: 'Central' }, south: { vi: 'Miền Nam', en: 'South' } }
              const items = ingredientRegions.filter(r => r[zone])
              return (
                <Reveal key={zone} delay={zi * 0.1}>
                  <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-gold/70 border-b border-cream/10 pb-3 mb-4">{labels[zone].vi} / {labels[zone].en}</h3>
                  <div className="space-y-3">
                    {items.map(({ region, ingredient }) => (
                      <div key={region} className="flex items-start gap-3">
                        <MapPin size={12} weight="fill" className="text-brand shrink-0 mt-0.5" />
                        <div>
                          <p className="text-cream text-sm font-semibold">{region}</p>
                          <p className="text-cream/40 text-xs mt-0.5">{ingredient}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. GIẢI KHÁT TEASER
      ══════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-40 rice-texture overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/branding_image_with_cups_of_beverage_and_logo.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(196, 98, 58, 0.9) 0%, rgba(139, 58, 26, 0.95) 60%, rgba(92, 45, 10, 1) 100%)' }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <h2 className="text-6xl md:text-8xl font-black text-cream leading-none mb-2" style={{ fontFamily: 'var(--font-display-wide)' }}>GIẢI</h2>
            <h2 className="text-6xl md:text-8xl font-black text-gold leading-none mb-6" style={{ fontFamily: 'var(--font-display-wide)' }}>KHÁT</h2>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs mb-8">{t('"Nước Giải Khát" — từ được dùng từ thời bao cấp, gợi nhắc những thức uống bổ dưỡng dành cho khách quý.', '"Nước Giải Khát" — a term from the subsidy era, evoking nourishing drinks for honored guests.')}</p>
            <Link to="/menu#giai-khat" className="group inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-cream border-b border-cream/30 pb-1 hover:border-cream transition-all duration-300">
              {t('Xem Đồ Uống', 'View Drinks')}
              <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: { vi: 'Sữa Gạo Lắc Hàng Chuối', en: 'Hàng Chuối Shaken Rice Milk' }, price: '65.000', tag: t('Đặc Trưng', 'Signature') },
                { name: { vi: 'Cold Brew Dāna', en: 'Dāna Rice Cold Brew' }, price: '65.000', tag: t('Đặc Trưng', 'Signature') },
                { name: { vi: 'Junbucha Mơ Muối', en: 'Salted Plum Junbucha' }, price: '80.000', tag: t('Thủ Công', 'Craft') },
              ].map(({ name, price, tag }) => (
                <div key={name.vi} className="flex items-center justify-between border border-cream/15 rounded-xl px-5 py-4 bg-cream/5 hover:bg-cream/10 transition-all duration-300 backdrop-blur-sm">
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
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. MÂM NHÀ — SET MENUS
      ══════════════════════════════════════════════ */}
      <section className="bg-rice py-32 md:py-40">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-earth" style={{ fontFamily: 'var(--font-display-wide)' }}>{t('Mâm Cơm Nhà', 'Family Table Sets')}</h2>
            <p className="text-earth/50 text-sm mt-3">{t('Giá gốc đã được giảm ưu đãi', 'Special discounted prices')}</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mamNha.slice(0, 3).map((set, i) => (
              <Reveal key={set.id} delay={i * 0.1}>
                <div className="double-bezel shadow-premium h-full">
                  <div className="double-bezel-inner bg-cream">
                    <div className="bg-earth px-6 py-5">
                      <h3 className="text-lg font-black text-cream">{set.name.vi}</h3>
                      <p className="text-cream/50 text-xs italic">{set.name.en}</p>
                    </div>
                    <div className="px-6 py-5">
                      <p className="text-xs text-earth/50 font-semibold tracking-wider uppercase mb-3">{t('Bao gồm', 'Includes')}</p>
                      <ul className="space-y-1.5 mb-5">
                        {set.dishes.map((dish) => (
                          <li key={dish} className="flex items-start gap-2 text-sm text-earth/70">
                            <span className="text-brand mt-0.5 text-xs shrink-0">•</span>
                            {dish}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between border-t border-rice-dark pt-4">
                        <div>
                          <p className="text-xs text-earth/40 line-through">{set.originalPrice.toLocaleString('vi-VN')}đ</p>
                          <p className="text-xl font-black text-brand">{set.price.toLocaleString('vi-VN')}đ</p>
                        </div>
                        <p className="text-xs text-earth/50">{set.serves}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="text-center mt-8">
            <Link to="/menu#mam-nha" className="group inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-brand transition-all duration-300">
              {t('Xem tất cả 6 mâm', 'View all 6 sets')}
              <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          8. LOCATION / CTA
      ══════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 relative overflow-hidden" style={{ backgroundColor: '#2A5C34' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/farmers_yellow.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', opacity: '0.25' }} />
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-cream mb-8 leading-tight" style={{ fontFamily: 'var(--font-display-wide)' }}>{t('Ghé Thăm\nDāna Hôm Nay', 'Visit Dāna\nToday')}</h2>

            <div className="space-y-5 text-cream/70 text-sm">
              <div className="flex gap-4">
                <MapPin size={20} weight="light" className="text-forest-light shrink-0 mt-0.5" />
                <div>
                  <p className="text-cream font-semibold">12 Phố Đông Thái, Phường Hoàn Kiếm</p>
                  <p>TP.Hà Nội</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock size={20} weight="light" className="text-forest-light shrink-0 mt-0.5" />
                <div>
                  <p className="text-cream font-semibold">{t('Giờ Mở Cửa', 'Opening Hours')}</p>
                  <p>{t('Thứ 2 – Chủ Nhật · 11:00 – 22:00', 'Mon – Sun · 11:00 – 22:00')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone size={20} weight="light" className="text-forest-light shrink-0 mt-0.5" />
                <div>
                  <p className="text-cream font-semibold">{t('Đặt Bàn', 'Reservations')}</p>
                  <a href="tel:0828744931" className="text-gold hover:text-gold-light transition-colors font-bold">0828.744.931</a>
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <a href="https://www.google.com/maps/place/Dana+Vegan+House" target="_blank" rel="noreferrer" className="px-6 py-3 text-xs font-bold tracking-widest uppercase bg-cream text-earth rounded-full hover:bg-rice transition-all duration-300 btn-magnetic">
                {t('Xem Bản Đồ', 'View Map')}
              </a>
              <Link to="/contact" className="px-6 py-3 text-xs font-bold tracking-widest uppercase border border-cream/30 text-cream rounded-full hover:border-cream transition-all duration-300 btn-magnetic">
                {t('Liên Hệ', 'Contact Us')}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-[2rem] overflow-hidden aspect-square relative shadow-premium-dark" style={{ backgroundImage: 'url(/images/a-vegan-restaurant-of.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <Lamp size={48} weight="light" className="text-gold/80 mb-4" />
                <p className="text-cream font-black text-xl">12 Phố Đông Thái</p>
                <p className="text-cream/80 text-sm mt-1">Phường Hoàn Kiếm, TP.Hà Nội</p>
                <a href="https://www.google.com/maps/place/Dana+Vegan+House" target="_blank" rel="noreferrer" className="mt-6 text-xs font-bold tracking-widest uppercase text-gold border border-gold/50 px-5 py-2 rounded-full hover:bg-gold hover:text-earth transition-all duration-300 btn-magnetic">
                  Google Maps ↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

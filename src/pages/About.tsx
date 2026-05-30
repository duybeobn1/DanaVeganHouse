import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { motion, useInView } from 'motion/react'
import { Grains, Recycle } from '@phosphor-icons/react'

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

const stories = [
  {
    year: '2023',
    titleVI: 'Dāna — Ý Nghĩa Của Sự Rộng Lượng',
    titleEN: 'Dāna — The Meaning of Generosity',
    textVI: 'Theo Wikipedia, Dāna là một từ tiếng Phạn có nghĩa là Rộng Lượng hay "Mọi hình thức của Cho đi". Trong Phật Giáo thì Dāna được hiểu là Hạnh Bố Thí, Cúng Dàng. Hiểu đơn giản nhất Dāna có nghĩa là biếu, cho, tặng hay hiểu sâu sắc hơn chính là tinh thần phụng sự, tình yêu thương, lòng từ thiện và sự tử tế.',
    textEN: 'According to Wikipedia, Dāna is a Sanskrit word meaning Generosity or "Every form of giving." In Buddhism, Dāna means the act of giving and offering. Simply put, Dāna means to give, to present — or more deeply, it is the spirit of service, love, charity, and kindness.',
    color: '#C4623A',
  },
  {
    year: '1936',
    titleVI: 'Ngôi Nhà Bắc Bộ 100 Tuổi',
    titleEN: 'The 100-Year-Old Northern House',
    textVI: 'Trên tầng 2 của Dāna là ngôi nhà Bắc Bộ cổ của gia đình Bác Châu tại Huyện Hải Hậu, Tỉnh Nam Định, ngôi nhà được xây dựng năm 1936 và đã trải qua 3 thế hệ sinh sống tại đây. Năm 2023, Bác Châu quyết định xây một ngôi nhà mới, và ngôi nhà gỗ đã được Founder của Dana Vegan House giữ lại và phục dựng lại tại tầng 2 của nhà hàng với hơi thở mới.',
    textEN: 'On the second floor of Dāna sits a traditional Northern Vietnamese house belonging to the Châu family in Hải Hậu District, Nam Định Province — built in 1936 and home to three generations. In 2023, the family decided to build a new house, and the old wooden structure was preserved and restored by Dana\'s Founder on the restaurant\'s second floor.',
    color: '#5C3317',
  },
  {
    year: '🌾',
    titleVI: 'Hành Trình Hạt Gạo',
    titleEN: 'The Journey of Rice',
    icon: Grains,
    textVI: 'Được ví như hạt ngọc của trời, gạo được xem là thực phẩm không thể thiếu trong các gia đình Việt. Để có hạt gạo ngon, người nông dân một nắng hai sương trên cánh đồng của mình với niềm vui vụ mùa. Hình ảnh đấy đã được Nghệ sĩ Nguyễn Đức Phương ký hoạ và Dāna ghi lại trên từng chén bát nhà hàng như một lời trân quý về hành trình hạt gạo.',
    textEN: 'Called the "pearl of heaven", rice is an indispensable food for Vietnamese families. To produce fine rice, farmers labor under sun and dew across their paddies with joyful harvests. Artist Nguyễn Đức Phương captured this imagery in sketches, which Dāna immortalizes on every restaurant bowl as a tribute to the proud rice civilization of Vietnam.',
    color: '#2A5C34',
  },
  {
    year: '♻️',
    icon: Recycle,
    titleVI: 'Bền Vững Từ Gỗ Tái Chế',
    titleEN: 'Sustainability Through Reclaimed Wood',
    textVI: 'Toàn bộ gỗ nội thất tại Dāna là gỗ tái chế được thu thập từ các trường học cũ, nhà cũ. Gỗ cũ không chỉ với mục tiêu hướng đến sự bền vững và bảo vệ môi trường, mà Dāna tin rằng những đồ vật hay gỗ cũ đều có tinh thần của nó và một lần nữa được tái sinh với tinh thần tươi mới.',
    textEN: 'All wooden furniture at Dāna is reclaimed wood collected from old schools and houses. Reclaimed wood is not just about sustainability and environmental protection — Dāna believes that old objects and old wood carry their own spirit, and are reborn here with fresh vitality.',
    color: '#D4A843',
  },
]

const artworks = [
  {
    nameVI: '"Bao Gạo Làng Ta"',
    nameEN: '"Our Village Rice Sacks"',
    descVI: 'Những chiếc đèn đặc biệt tại tầng 1 của Dāna lấy cảm hứng từ bài hát "Hạt Gạo Làng Ta" của Nhà thơ Trần Đăng Khoa và hình ảnh những bao gạo được chất đầy trong kho gạo xưa. Chất liệu: Nhựa tái chế và giấy dó.',
    descEN: 'The special lanterns on the first floor of Dāna are inspired by the poem "Hạt Gạo Làng Ta" by poet Trần Đăng Khoa and the image of rice sacks stacked in the ancient warehouse. Material: Recycled plastic and Dó paper.',
  },
  {
    nameVI: '"Bông Hoa Gạo"',
    nameEN: '"Rice Blossom"',
    descVI: 'Nguồn cảm hứng từ những bó rơm sau mùa gặt bội thu của bà con nông dân. Những bó rơm là sự kết thúc của những cây lúa nhưng lại là sự khởi đầu của những no đủ. "Hoa Gạo" nở là ấm no đến.',
    descEN: 'Inspired by bundles of straw after bountiful harvests. Straw bundles mark the end of rice plants but signal the beginning of abundance. When "Rice Blossoms" bloom, prosperity arrives.',
  },
  {
    nameVI: '"Ước Vọng Mùa Màng"',
    nameEN: '"Harvest Wishes"',
    descVI: 'Vì Nhà Bắc Bộ — Một trong những phần quan trọng nhất của ngôi Nhà ba gian Bắc Bộ. "Vì Nhà" thể hiện cho ước vọng và vị thế của mỗi người chủ nhà. Đây là chiếc vì nhà của ngôi nhà gỗ cổ gần 100 tuổi, được xây dựng năm 1936.',
    descEN: '"Vì Nhà" — one of the most important parts of the three-bay Northern house. The roof truss symbolizes the aspirations and status of the homeowner. This is the truss of the nearly century-old wooden house built in 1936.',
  },
]

export default function About() {
  const { t } = useLanguage()

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[56vh] md:min-h-[64vh] pt-20 md:pt-28 pb-16 md:pb-20 overflow-hidden flex items-center justify-center">
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/old_house_rooftop.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Subtle rice-grain texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/images/rice_grain_with_dana_logo.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Dark vignette for readability */}
        <div className="absolute inset-0 bg-black/35" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-gold/80 mb-4">
            {t('Câu Chuyện Của Chúng Tôi', 'Our Story')}
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-cream leading-none mb-6">
            {t('NHÀ CHAY\nĐỔI MỚI', 'VEGAN\nHOUSE')}
          </h1>
          <p className="text-cream/80 text-base max-w-xl mx-auto leading-relaxed">
            {t(
              'Dāna Vegan House thấp thoáng hơi hướng của một nhà hàng chay có concept phong cách khác biệt, nhưng mang trong mình cốt lõi tinh thần và văn hóa Việt Nam.',
              'Dāna Vegan House carries the spirit of a distinctly styled vegan restaurant, while holding at its core the essence of Vietnamese spirit and culture.',
            )}
          </p>
        </div>
      </section>

      {/* ── The Revolution ── */}
      <section className="bg-cream py-32 md:py-40">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-earth">{t('Cuộc Cách Mạng\nĂn Chay', 'The Vegan\nRevolution')}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-rice rounded-[2rem] p-8 md:p-12 shadow-premium">
              <p className="text-earth-mid text-base leading-relaxed mb-4">{t('Có rất nhiều lý do để ai đó chọn ăn chay. Có thực khách lựa chọn ăn chay vì yêu động vật, có thực khách chọn ăn chay vì muốn nhìn thấy thế giới an toàn hơn, xanh tươi hơn, cũng có thực khách lựa chọn ăn chay để khỏe mạnh hơn...', 'There are many reasons to choose a vegan lifestyle. Some guests choose it for love of animals, others for a safer, greener world, and others for better health...')}</p>
              <p className="text-earth-mid text-base leading-relaxed mb-4">{t('Như vậy ăn chay không chỉ là lý tưởng tôn giáo. Ăn chay là một lựa chọn của bạn, là một niềm vui của bạn, và ăn chay là phong cách sống bạn lựa chọn, theo đuổi.', 'Veganism is not just a religious ideal. It is your choice, your joy, and a lifestyle you pursue.')}</p>
              <p className="text-earth/60 text-sm leading-relaxed">{t('Bạn hoàn toàn có thể ăn chay và thưởng thức một ly rượu vang, hay 1 ly sake, hay một ly bia thủ công mát lạnh...', 'You can absolutely eat vegan and enjoy a glass of wine, sake, or a cold craft beer...')}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Story Timeline ── */}
      <section className="bg-rice py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-earth">
            {t('Những Trang Câu Chuyện', 'Our Story Chapters')}
          </h2>
        </div>

          <div className="space-y-8">
            {stories.map(({ year, icon: Icon, titleVI, titleEN, textVI, textEN, color }, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`flex gap-6 md:gap-10 items-start ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="shrink-0">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-cream"
                      style={{ backgroundColor: color }}
                    >
                      {Icon ? <Icon size={24} weight="duotone" /> : <span className="font-black text-sm">{year}</span>}
                    </div>
                  </div>
                  <div className="flex-1 bg-cream rounded-2xl p-6 md:p-8 shadow-ambient">
                    <h3 className="text-xl md:text-2xl font-black text-earth mb-3">{t(titleVI, titleEN)}</h3>
                    <p className="text-earth/60 text-sm leading-relaxed">{t(textVI, textEN)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Art Works ── */}
      <section className="py-32 md:py-40" style={{ backgroundColor: '#3D2210' }}>
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-cream">{t('Những Điều Thú Vị\nTại Dāna', 'Unique Features\nAt Dāna')}</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { src: '/images/old_house_rooftop.png', label: t('Mái Nhà Cổ', 'Old House Roof') },
              { src: '/images/old_house_decoration.png', label: t('Trang Trí Nhà Cổ', 'Old House Decor') },
              { src: '/images/traditional_vietnamese_items.png', label: t('Đồ Vật Truyền Thống', 'Traditional Items') },
            ].map(({ src, label }, i) => (
              <Reveal key={src} delay={i * 0.08}>
                <div className="aspect-video rounded-[2rem] overflow-hidden relative group shadow-premium-dark">
                  <img src={src} alt={label} className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute bottom-0 left-0 right-0 p-3 text-center">
                    <span className="text-cream text-xs font-bold tracking-wider uppercase bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">{label}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { src: '/images/small_items_rice_bowl_spoon.png', label: t('Gạo & Cơm', 'Rice & Bowls') },
              { src: '/images/rice_grain_with_dana_logo.png', label: t('Hạt Gạo Dāna', 'Dāna Rice Grains') },
            ].map(({ src, label }, i) => (
              <Reveal key={src} delay={i * 0.1}>
                <div className="aspect-[16/9] rounded-[2rem] overflow-hidden relative group shadow-premium-dark">
                  <img src={src} alt={label} className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute bottom-4 left-4">
                    <span className="text-gold text-xs font-bold tracking-wider uppercase">{label}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artworks.map(({ nameVI, nameEN, descVI, descEN }, i) => (
              <Reveal key={nameVI} delay={i * 0.08}>
                <div className="border border-cream/10 rounded-[2rem] p-6 hover:border-cream/25 transition-all duration-500">
                  <h3 className="text-gold font-black text-lg mb-3">{t(nameVI, nameEN)}</h3>
                  <p className="text-cream/50 text-sm leading-relaxed">{t(descVI, descEN)}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 border border-gold/20 rounded-[2rem] p-8 text-center">
              <p className="text-gold text-sm font-bold tracking-wider uppercase mb-3">{t('Mái Nhà Giấy Dó', 'The Dó Paper Roof')}</p>
              <p className="text-cream/60 text-sm leading-relaxed max-w-2xl mx-auto">{t('Ngôi nhà Bắc bộ xưa 100 tuổi với điểm nhấn là mái nhà được dán hoàn toàn bằng tay với hơn 1000 mảnh giấy Dó nhỏ, với hàng trăm giờ làm việc trong nhiều tuần của đội ngũ nhân sự Dāna. Mái nhà đặc biệt này khiến ngôi nhà giống như một chiếc đèn khổng lồ.', 'The century-old Northern house features a roof entirely hand-applied with over 1,000 small pieces of Dó paper — hundreds of work hours over many weeks by Dāna\'s team. This unique roof transforms the house into a giant lantern.')}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-cream py-32 text-center">
        <div className="max-w-xl mx-auto px-6">
          <Reveal>
            <p className="text-4xl font-black text-earth mb-4">{t('Cảm ơn bạn', 'Thank You')}</p>
            <p className="text-earth/60 text-sm leading-relaxed mb-8">{t('Cảm ơn quý khách đã đồng hành cùng Dāna trên hành trình khám phá ẩm thực chạy dọc theo chiều dài Đất Việt. Mỗi món ăn là một lát cắt văn hoá; là tình yêu dành cho thiên nhiên, đất lành và con người.', 'Thank you for joining Dāna on a culinary journey along the length of Vietnam. Every dish is a cultural moment — a love for nature, good earth, and people.')}</p>
            <div className="flex gap-4 justify-center">
              <Link to="/menu" className="px-8 py-3 text-sm font-bold tracking-widest uppercase bg-brand text-cream rounded-full hover:bg-brand-dark transition-all duration-300 btn-magnetic">{t('Xem Thực Đơn', 'View Menu')}</Link>
              <Link to="/contact" className="px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-earth text-earth rounded-full hover:bg-earth hover:text-cream transition-all duration-300 btn-magnetic">{t('Liên Hệ', 'Contact')}</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

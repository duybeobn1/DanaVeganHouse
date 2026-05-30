import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { allCategories, mamNha } from '../data/menuData'
import type { MenuItem } from '../data/menuData'
import { motion, useInView } from 'motion/react'
import { Star, Leaf, MapPin, BowlFood, ForkKnife, Bread, Coffee } from '@phosphor-icons/react'

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const categoryIcons = [BowlFood, BowlFood, ForkKnife, Bread, Star, Coffee] as const

const sectionIds = [
  ...allCategories.map(c => c.id),
  'mam-nha',
] as const

function SignatureBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[0.55rem] font-bold tracking-[0.15em] uppercase bg-brand/10 text-brand px-1.5 py-0.5 rounded-full">
      <Star size={8} weight="fill" />
    </span>
  )
}

function NewBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[0.55rem] font-bold tracking-[0.15em] uppercase bg-forest/10 text-forest px-1.5 py-0.5 rounded-full">
      <Leaf size={8} weight="fill" />
    </span>
  )
}

function MiniPrice({ price }: { price: string }) {
  return <span className="font-bold text-brand text-sm whitespace-nowrap">{price}đ</span>
}

export default function Menu() {
  const { lang, t } = useLanguage()
  const [activeId, setActiveId] = useState<string>(sectionIds[0])

  const catWithIcon = allCategories.map((cat, i) => ({ ...cat, Icon: categoryIcons[i] }))

  const sideNavItems = [
    ...catWithIcon.map(cat => ({ id: cat.id, label: cat.name[lang], Icon: cat.Icon })),
    { id: 'mam-nha', label: t('Mâm Nhà', 'Set Menus'), Icon: Star },
  ] as const

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-120px 0px -60% 0px' }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F0E6D0' }}>
      {/* ── Hero Banner ── */}
      <section className="relative min-h-[28vh] md:min-h-[46vh] pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/menu_front_page_green.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/farmers_horizontal_yellow.png)', backgroundSize: 'cover', backgroundPosition: 'center bottom', backgroundRepeat: 'no-repeat', opacity: 0.55 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(196,98,58,0.2) 0%, rgba(92,51,23,0.4) 100%)' }} />
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-cream leading-none mb-4" style={{ fontFamily: 'var(--font-display-wide)' }}>{t('THỰC ĐƠN', 'MENU')}</h1>
          <p className="text-cream/50 text-xs tracking-wider">{t('Giá chưa bao gồm VAT', 'Prices exclude VAT')}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-24 flex gap-8 relative">
        {/* ── Side Nav ── */}
        <nav className="hidden lg:block sticky top-28 w-44 shrink-0 self-start pt-4">
          <ul className="space-y-1">
            {sideNavItems.map(({ id, label, Icon }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${
                    activeId === id
                      ? 'bg-brand/10 text-brand'
                      : 'text-earth/50 hover:text-earth hover:bg-earth/5'
                  }`}
                >
                  <Icon size={14} weight={activeId === id ? 'fill' : 'light'} className="shrink-0" />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0 pt-2 sm:pt-4">
          {catWithIcon.flatMap((cat, ci) => [
            <CategorySection key={cat.id} category={cat} index={ci} lang={lang} />,
            ci < catWithIcon.length - 1 && (
              <div key={`divider-${cat.id}`} className="flex items-center gap-4 my-14 sm:my-20 px-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
                <div className="w-2 h-2 rotate-45 bg-brand/50 shrink-0" />
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
              </div>
            ),
          ])}

          {/* divider before set menus */}
          <div className="flex items-center gap-4 my-14 sm:my-20 px-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
            <div className="w-2 h-2 rotate-45 bg-brand/50 shrink-0" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
          </div>

          {/* ── Set Menus ── */}
          <section id="mam-nha" className="scroll-mt-20 md:scroll-mt-28">
            <Reveal className="mb-6 md:mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-earth">{t('Mâm Cơm Nhà', 'Family Table Sets')}</h2>
              <p className="text-earth/50 text-sm mt-2 max-w-lg">{t('Mâm Cơm Nhà theo gợi ý của Dāna. Mỗi Mâm Cơm mang một tinh thần khác nhau.', "Dāna's curated set menus. Each carries a unique regional spirit.")}</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mamNha.map((set, i) => (
                <Reveal key={set.id} delay={i * 0.06}>
                  <div className="double-bezel h-full">
                    <div className="double-bezel-inner bg-cream border border-rice-dark">
                      <div className="bg-earth px-4 sm:px-6 py-4 sm:py-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-black text-cream">{set.name[lang]}</h3>
                            <p className="text-cream/50 text-xs mt-0.5">{set.serves}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gold/50 text-xs line-through">{set.originalPrice.toLocaleString('vi-VN')}đ</p>
                            <p className="text-gold font-black text-lg">{set.price.toLocaleString('vi-VN')}đ</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 sm:px-6 py-4 sm:py-5">
                        <p className="text-[0.6rem] font-bold tracking-wider uppercase text-earth/30 mb-3">{t('Bao gồm', 'Includes')}</p>
                        <ul className="space-y-1.5">
                          {set.dishes.map(dish => (
                            <li key={dish} className="flex items-start gap-2 text-sm text-earth/70">
                              <span className="text-brand mt-0.5 text-[10px] shrink-0">•</span>
                              <span>{dish}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <p className="text-center text-[0.6rem] text-earth/30 mt-10 md:mt-16 tracking-wider">
            {t('Giá chưa bao gồm VAT · Thực đơn có thể thay đổi', 'Prices exclude VAT · Menu subject to change')}
          </p>
        </div>
      </div>
    </main>
  )
}

function CategorySection({ category, index, lang }: { category: typeof allCategories[number] & { Icon: typeof categoryIcons[number] }; index: number; lang: 'vi' | 'en' }) {
  const id = category.id
  const items = category.items
  const Icon = category.Icon

  const layoutMap: Record<string, 'compact-grid' | 'hero-grid' | 'card-rows' | 'minimal-list' | 'sweet-cards' | 'grouped'> = {
    'bat-con': 'compact-grid',
    'bat-o-to': 'compact-grid',
    'mam': 'compact-grid',
    'dua-ca': 'compact-grid',
    'thia-ngot': 'compact-grid',
    'giai-khat': 'grouped',
  }

  const layout = layoutMap[id]

  return (
    <section id={id} className="mt-10 md:mt-24 first:mt-0 scroll-mt-20 md:scroll-mt-28">
      <Reveal className="mb-4 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Icon size={16} weight="light" className="text-brand/50 shrink-0" />
          <h2 className="text-2xl md:text-3xl font-black text-earth tracking-tight">{category.name[lang]}</h2>
        </div>
        {index < 2 && (
          <p className="text-earth/50 text-sm max-w-xl leading-relaxed">{category.description[lang]}</p>
        )}
      </Reveal>

      {layout === 'compact-grid' && <CompactGrid items={items} lang={lang} />}
      {layout === 'hero-grid' && <HeroGrid items={items} lang={lang} />}
      {layout === 'card-rows' && <CardRows items={items} lang={lang} />}
      {layout === 'minimal-list' && <MinimalList items={items} lang={lang} />}
      {layout === 'sweet-cards' && <SweetCards items={items} lang={lang} />}
      {layout === 'grouped' && <GroupedDrinks items={items} lang={lang} />}
    </section>
  )
}

/* ── LAYOUT 1: Compact Grid (2-col cards) ── */
function CompactGrid({ items, lang }: { items: MenuItem[]; lang: 'vi' | 'en' }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.03}>
          <div className={`group flex items-start justify-between gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl transition-all duration-300 h-full ${item.isSignature ? 'bg-brand/15 shadow-ambient' : 'hover:bg-rice'}`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="font-bold text-earth text-sm leading-tight">{item.name[lang]}</h4>
                {item.isSignature && <SignatureBadge />}
                {item.isNew && <NewBadge />}
              </div>
              {item.region && (
                <p className="flex items-center gap-1 text-[0.6rem] font-semibold text-brand/50 mt-0.5">
                  <MapPin size={9} weight="fill" /> {item.region}
                </p>
              )}
              <p className="text-earth/45 text-[0.7rem] mt-1 leading-relaxed line-clamp-2">{item.ingredients[lang]}</p>
            </div>
            <MiniPrice price={item.price} />
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/* ── LAYOUT 2: Hero Grid (signature items featured first) ── */
function HeroGrid({ items, lang }: { items: MenuItem[]; lang: 'vi' | 'en' }) {
  const signatureItems = items.filter(i => i.isSignature)
  const rest = items.filter(i => !i.isSignature)

  return (
    <div className="space-y-4 sm:space-y-6">
      {signatureItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {signatureItems.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <div className="double-bezel h-full">
                <div className="double-bezel-inner bg-brand p-4 sm:p-5 flex flex-col justify-between min-h-[140px] sm:min-h-[180px]">
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={10} weight="fill" className="text-gold" />
                    </div>
                    <h4 className="font-black text-cream text-base leading-tight">{item.name[lang]}</h4>
                    {item.region && <p className="text-cream/50 text-[0.6rem] font-semibold mt-0.5">{item.region}</p>}
                    <p className="text-cream/50 text-[0.65rem] mt-1.5 leading-relaxed line-clamp-2">{item.ingredients[lang]}</p>
                  </div>
                  <p className="font-black text-gold mt-4">{item.price}đ</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
      <CompactGrid items={rest} lang={lang} />
    </div>
  )
}

/* ── LAYOUT 3: Card Rows (full-width horizontal cards) ── */
function CardRows({ items, lang }: { items: MenuItem[]; lang: 'vi' | 'en' }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {items.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.04}>
          <div className={`flex items-start justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-300 ${item.isSignature ? 'bg-rice shadow-ambient border border-rice-dark' : 'hover:bg-rice/50'}`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-earth text-base">{item.name[lang]}</h4>
                <div className="flex items-center gap-1">
                  {item.isSignature && <SignatureBadge />}
                  {item.isNew && <NewBadge />}
                </div>
              </div>
              {item.region && (
                <p className="flex items-center gap-1 text-[0.6rem] font-semibold text-brand/50 mt-0.5">
                  <MapPin size={9} weight="fill" /> {item.region}
                </p>
              )}
              <p className="text-earth/50 text-xs mt-1.5 leading-relaxed">{item.ingredients[lang]}</p>
            </div>
            <MiniPrice price={item.price} />
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/* ── LAYOUT 4: Minimal List (for extras) ── */
function MinimalList({ items, lang }: { items: MenuItem[]; lang: 'vi' | 'en' }) {
  const signatureItems = items.filter(i => i.isSignature)
  const rest = items.filter(i => !i.isSignature)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {signatureItems.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.04}>
          <div className="double-bezel h-full">
            <div className="double-bezel-inner bg-forest p-4 sm:p-5 flex flex-col justify-between min-h-[110px] sm:min-h-[140px]">
              <h4 className="font-black text-cream text-base">{item.name[lang]}</h4>
              <div className="flex items-center justify-between mt-2">
                <p className="text-cream/50 text-[0.65rem]">{item.ingredients[lang]}</p>
                <p className="font-black text-gold text-sm">{item.price}đ</p>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
      {rest.map((item, i) => (
        <Reveal key={item.id} delay={(signatureItems.length + i) * 0.04}>
          <div className="flex items-start justify-between gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl border border-rice-dark hover:shadow-ambient transition-all duration-300">
            <div>
              <h4 className="font-semibold text-earth text-sm">{item.name[lang]}</h4>
              <p className="text-earth/45 text-[0.65rem] mt-1">{item.ingredients[lang]}</p>
            </div>
            <MiniPrice price={item.price} />
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/* ── LAYOUT 5: Sweet Cards (for desserts) ── */
function SweetCards({ items, lang }: { items: MenuItem[]; lang: 'vi' | 'en' }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.06}>
          <div className={`p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] text-center transition-all duration-300 ${item.isSignature ? 'bg-brand text-cream shadow-premium' : 'bg-rice/60 border border-rice-dark'}`}>
            <div className="flex items-center justify-center gap-1 mb-3">
              {item.isSignature && <Star size={12} weight="fill" className="text-gold" />}
            </div>
            <h4 className={`font-black text-lg ${item.isSignature ? 'text-cream' : 'text-earth'}`}>{item.name[lang]}</h4>
            <p className={`text-xs mt-1 italic ${item.isSignature ? 'text-cream/60' : 'text-earth/50'}`}>{item.name.en !== item.name.vi ? item.name.en : ''}</p>
            <p className={`text-xs mt-2 leading-relaxed ${item.isSignature ? 'text-cream/50' : 'text-earth/50'}`}>{item.ingredients[lang]}</p>
            <p className={`font-black text-lg mt-4 ${item.isSignature ? 'text-gold' : 'text-brand'}`}>{item.price}đ</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/* ── LAYOUT 6: Grouped Drinks (by subcategory) ── */
function GroupedDrinks({ items, lang }: { items: MenuItem[]; lang: 'vi' | 'en' }) {
  const groups: Record<string, MenuItem[]> = {
    [lang === 'vi' ? 'Pha Chế Tại Bếp' : 'Homemade']: items.slice(0, 14),
    [lang === 'vi' ? 'Bia & Thủ Công' : 'Craft & Bottled']: items.slice(14, 19),
    [lang === 'vi' ? 'Cà Phê' : 'Coffee']: items.slice(19),
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {Object.entries(groups).map(([label, groupItems]) => (
        <div key={label}>
          <h3 className="text-xs font-bold tracking-wider uppercase text-earth/40 mb-4">{label}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {groupItems.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.03}>
                <div className={`flex items-start justify-between gap-2 sm:gap-3 p-3 sm:p-3.5 rounded-xl transition-all duration-300 ${item.isSignature ? 'bg-brand-pale/50' : 'hover:bg-rice/50'}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-semibold text-earth text-sm">{item.name[lang]}</h4>
                      {item.isSignature && <SignatureBadge />}
                    </div>
                    <p className="text-earth/40 text-[0.65rem] mt-0.5 line-clamp-1">{item.ingredients[lang]}</p>
                  </div>
                  <MiniPrice price={item.price} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

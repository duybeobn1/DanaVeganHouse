import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { allCategories, mamNha } from '../data/menuData'
import type { MenuItem } from '../data/menuData'

const MAM_NHA_ID = 'mam-nha'

const allTabs = [
  ...allCategories.map(c => ({ id: c.id, name: c.name })),
  { id: MAM_NHA_ID, name: { vi: 'Mâm Nhà', en: 'Set Menus' } },
]

function MenuItemRow({ item, lang }: { item: MenuItem; lang: 'vi' | 'en' }) {
  return (
    <div className="menu-item flex items-start justify-between gap-4 py-4 px-2 rounded-lg transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-bold text-earth text-base leading-tight">
            {item.name[lang]}
          </h4>
          {lang === 'vi' && item.name.en !== item.name.vi && (
            <span className="text-earth/40 text-xs italic hidden sm:inline">{item.name.en}</span>
          )}
          {item.isSignature && (
            <span className="text-[0.6rem] font-bold tracking-widest uppercase bg-brand/10 text-brand px-1.5 py-0.5 rounded">
              ★ {lang === 'vi' ? 'Đặc trưng' : 'Signature'}
            </span>
          )}
          {item.isNew && (
            <span className="text-[0.6rem] font-bold tracking-widest uppercase bg-forest/10 text-forest px-1.5 py-0.5 rounded">
              {lang === 'vi' ? 'Mới' : 'New'}
            </span>
          )}
        </div>
        {item.region && (
          <p className="text-[0.65rem] font-semibold text-brand/60 mt-0.5 tracking-wider">
            📍 {item.region}
          </p>
        )}
        <p className="text-earth/50 text-xs mt-1.5 leading-relaxed">
          {item.ingredients[lang]}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-black text-brand text-sm whitespace-nowrap">{item.price}đ</p>
      </div>
    </div>
  )
}

export default function Menu() {
  const { lang, t } = useLanguage()
  const [activeTab, setActiveTab] = useState(allCategories[0].id)
  const tabsRef = useRef<HTMLDivElement>(null)
  const contentTopRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  // On tab change: scroll page to top + scroll the tab pill into view horizontally
  useEffect(() => {
    const btn = tabsRef.current?.querySelector(`[data-tab="${activeTab}"]`)
    btn?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    // Smooth-scroll page to the top of content (below sticky tabs)
    const headerOffset = 120 // accommodates sticky navbar + tabs
    const targetTop = (contentTopRef.current?.getBoundingClientRect().top || 0) + window.scrollY - headerOffset
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' })
  }, [activeTab])

  const activeCat = allCategories.find(c => c.id === activeTab)
  const showSetMenus = activeTab === MAM_NHA_ID

  return (
    <main className="min-h-screen bg-cream">
      {/* ── Hero Banner ── */}
      <div className="full-bleed">
        <section className="relative min-h-[48vh] md:min-h-[54vh] pt-16 md:pt-20 pb-8 md:pb-10 overflow-hidden flex items-center justify-center">
          {/* Wallpaper: farmers art over hero image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/images/menu_front_page_green.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Farmers overlay (simple, no blend) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/images/farmers_horizontal_yellow.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center bottom',
              backgroundRepeat: 'no-repeat',
              opacity: 0.55,
            }}
          />
          {/* Subtle dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-gold/80 mb-4">
              {t('Dāna Vegan House', 'Dāna Vegan House')}
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-cream leading-none mb-4">
              {t('THỰC ĐƠN', 'MENU')}
            </h1>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-cream/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <div className="h-px w-12 bg-cream/30" />
            </div>
            <p className="text-cream/60 text-sm max-w-md mx-auto">
              {t(
                'Giá chưa bao gồm VAT · Nguyên liệu thay đổi theo mùa',
                'Prices exclude VAT · Ingredients may vary by season',
              )}
            </p>
          </div>
        </section>
      </div>

      {/* ── Sticky Category Tabs ── */}
      <div className="sticky top-16 md:top-20 z-40 bg-cream border-b border-rice-dark shadow-sm">
        <div ref={tabsRef} className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-none w-full justify-center mx-auto max-w-5xl">
          {allTabs.map(tab => (
            <button
              key={tab.id}
              data-tab={tab.id}
              className={`cat-pill ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div ref={contentTopRef} />
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 pb-20">

        {/* ── Regular Category ── */}
        {activeCat && !showSetMenus && (
          <div>
            {/* Category Header */}
            <div
              className="relative overflow-hidden mb-8 text-center w-full max-w-3xl md:max-w-4xl mx-auto rounded-3xl p-6 md:p-10 shadow-sm"
              style={{
                background: 'linear-gradient(180deg, rgba(196,98,58,0.95) 0%, rgba(139,58,26,0.95) 100%)',
              }}
            >
              <p className="text-[0.6rem] font-bold tracking-[0.4em] uppercase text-gold/70 mb-2">
                {activeCat.subtitle[lang]}
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-cream mb-3">
                {activeCat.name[lang]}
              </h2>
<p className="text-cream/60 text-sm leading-relaxed max-w-lg mx-auto">
                {activeCat.description[lang]}
              </p>
            </div>

            {/* Items */}
            <div className="divide-y divide-rice-dark">
              {activeCat.items.map(item => (
                <MenuItemRow key={item.id} item={item} lang={lang} />
              ))}
            </div>
          </div>
        )}

        {/* ── Set Menus ── */}
        {showSetMenus && (
          <div>
            {/* Header */}
            <div
              className="relative overflow-hidden mb-8 text-center w-full max-w-3xl md:max-w-4xl mx-auto rounded-3xl p-6 md:p-10 shadow-sm"
              style={{
                background: 'linear-gradient(180deg, rgba(196,98,58,0.95) 0%, rgba(139,58,26,0.95) 100%)',
              }}
            >
              <p className="text-[0.6rem] font-bold tracking-[0.4em] uppercase text-gold/70 mb-2">
                {t('Dành cho 2–4 người', 'For 2–4 guests')}
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-cream mb-3">
                {t('Mâm Cơm Nhà', 'Family Table Sets')}
              </h2>
<p className="text-cream/60 text-sm leading-relaxed max-w-lg mx-auto">
                {t(
                  'Mâm Cơm Nhà theo gợi ý của Dāna dành cho Nhóm từ 2–4 người. Mỗi Mâm Cơm mang một tinh thần khác nhau.',
                  'Dāna\'s curated family set menus for groups of 2–4. Each set carries a unique regional spirit.',
                )}
              </p>
            </div>

            {/* Set menu cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {mamNha.map(set => (
                <div key={set.id} className="bg-cream border border-rice-dark rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-earth px-5 py-4">
                    <h3 className="text-lg font-black text-cream">{set.name[lang]}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-cream/50 text-xs">{set.serves}</p>
                      <div className="text-right">
                        <p className="text-gold/50 text-xs line-through">{set.originalPrice.toLocaleString('vi-VN')}đ</p>
                        <p className="text-gold font-black text-lg">{set.price.toLocaleString('vi-VN')}đ</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs font-bold tracking-wider uppercase text-earth/40 mb-3">
                      {t('Bao gồm', 'Includes')}
                    </p>
                    <ul className="space-y-1.5">
                      {set.dishes.map(dish => (
                        <li key={dish} className="flex items-start gap-2 text-sm text-earth/70">
                          <span className="text-brand mt-0.5 text-xs shrink-0">•</span>
                          {dish}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer note */}
        <p className="text-center text-xs text-earth/30 mt-10">
          {t('Giá chưa bao gồm VAT · Thực đơn có thể thay đổi', 'Prices exclude VAT · Menu subject to change')}
        </p>
      </div>
    </main>
  )
}

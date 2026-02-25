export interface MenuItem {
  id: string
  name: { vi: string; en: string }
  ingredients: { vi: string; en: string }
  price: string // e.g. "75.000" or "239.000 / 389.000"
  region?: string
  isSignature?: boolean
  isNew?: boolean
}

export interface MenuCategory {
  id: string
  name: { vi: string; en: string }
  subtitle: { vi: string; en: string }
  description: { vi: string; en: string }
  items: MenuItem[]
}

export interface SetMenuItem {
  id: string
  name: { vi: string; en: string }
  dishes: string[]
  originalPrice: number
  price: number
  serves: string
}

// ─── BÁT CON — SMALL BOWL ────────────────────────────────────────────────────
export const batCon: MenuCategory = {
  id: 'bat-con',
  name: { vi: 'Bát Con', en: 'Small Bowl' },
  subtitle: { vi: 'Món nhỏ ăn chơi', en: 'Small bites & starters' },
  description: {
    vi: 'Với tinh thần CHAY HẠNH PHÚC, Dāna mong muốn khách hàng ăn chay có thật nhiều trải nghiệm với món ăn theo 1 cách mới lạ và thú vị, chính vì vậy Dana lựa chọn Menu được phục vụ với các món nhỏ.',
    en: 'In the spirit of HAPPY VEGAN, Dāna wants guests to explore plant-based food in new and exciting ways. Small bites served to share and discover.',
  },
  items: [
    {
      id: 'soup-nam-thanh-lang',
      name: { vi: 'Soup Nấm Thanh Lãng', en: 'Thanh Lang Mushroom Soup' },
      ingredients: { vi: 'Nấm các loại, súp lơ xanh, rau kale, khoai, hạt điều, củ cải', en: 'Assorted mushrooms, broccoli, kale, potato, cashews, daikon' },
      price: '45.000',
      region: 'Vĩnh Phúc',
    },
    {
      id: 'soup-bi-do-ho-lo',
      name: { vi: 'Soup Bí Đỏ Hồ Lô', en: 'Hồ Lô Pumpkin Soup' },
      ingredients: { vi: 'Nấm, khoai tây, hạt điều, gia vị chay', en: 'Mushrooms, potato, cashews, vegan seasoning' },
      price: '45.000',
    },
    {
      id: 'soup-rau-xanh-da-lat',
      name: { vi: 'Soup Rau Xanh Đà Lạt', en: 'Dalat Green Vegetable Soup' },
      ingredients: { vi: 'Rau xanh, súp lơ xanh, rau kale, khoai, hạt điều, củ cải', en: 'Seasonal greens, broccoli, kale, potato, cashews, daikon' },
      price: '45.000',
      region: 'Đà Lạt',
    },
    {
      id: 'dau-hu-non-sot-gac-miso',
      name: { vi: 'Đậu Hũ Non Sốt Gấc Miso', en: 'Silken Tofu with Gấc Miso Sauce' },
      ingredients: { vi: 'Đậu non, sốt gấc, sốt Miso, đậu lông Nhật, gia vị chay', en: 'Silken tofu, gấc (momordica) sauce, miso, edamame, vegan seasoning' },
      price: '75.000',
      isSignature: true,
    },
    {
      id: 'cuon-mua-xuan',
      name: { vi: 'Cuốn Mùa Xuân', en: 'Spring Rolls' },
      ingredients: { vi: 'Bánh tráng gạo, rau sống, củ dền, rong biển tươi, sốt mè đen', en: 'Rice paper, fresh herbs, beetroot, fresh seaweed, black sesame sauce' },
      price: '75.000',
    },
    {
      id: 'dau-tam-hanh-cho-gao',
      name: { vi: 'Đậu Tẩm Hành Chợ Gạo', en: 'Spring Onion Fried Tofu' },
      ingredients: { vi: 'Đậu mơ, hành tươi, gia vị chay', en: 'Làng Mơ tofu, fresh spring onion, vegan seasoning' },
      price: '75.000',
      region: 'Hà Nội',
    },
    {
      id: 'banh-da-lang-ke-xuc-nam',
      name: { vi: 'Bánh Đa Làng Kế Xúc Nấm Đậu', en: 'Làng Kế Sesame Cracker with Mushroom & Tofu' },
      ingredients: { vi: 'Bánh đa làng Kế, đậu phụ, nấm, hành răm, gia vị chay', en: 'Làng Kế sesame rice cracker, tofu, mushrooms, rice paddy herb, vegan seasoning' },
      price: '75.000',
      region: 'Bắc Giang',
    },
    {
      id: 'nam-hap-xa-que',
      name: { vi: 'Nấm Hấp Xa Quê', en: 'Lemongrass Steamed Mushrooms' },
      ingredients: { vi: 'Nấm bào ngư, xả, gừng tươi, ớt, lá chanh, nước mắm chay, chanh, quất', en: 'Oyster mushrooms, lemongrass, fresh ginger, chili, kaffir lime leaf, vegan fish sauce, lime, kumquat' },
      price: '85.000',
      isSignature: true,
    },
    {
      id: 'nem-rong-bien-cuon-nam-dui-ga',
      name: { vi: 'Nem Rong Biển Cuốn Nấm Đùi Gà', en: 'Seaweed Rolls with King Oyster Mushroom' },
      ingredients: { vi: 'Rong biển khô, nấm đùi gà, bột chiên giòn, gia vị chay', en: 'Dried seaweed, king oyster mushroom, crispy batter, vegan seasoning' },
      price: '75.000',
    },
    {
      id: 'nam-chau-thanh-rang-muoi',
      name: { vi: 'Nấm Châu Thành Rang Muối', en: 'Châu Thành Salt-Roasted Oyster Mushrooms' },
      ingredients: { vi: 'Nấm bào ngư, bột chiên giòn, lá chanh, muối hồng, dầu ăn, gia vị chay', en: 'Oyster mushrooms, crispy batter, kaffir lime leaf, pink salt, oil, vegan seasoning' },
      price: '85.000',
      isSignature: true,
      region: 'Châu Thành',
    },
    {
      id: 'com-chay-ninh-binh-sot-nam',
      name: { vi: 'Cơm Cháy Ninh Bình Sốt Nấm', en: 'Ninh Bình Crispy Rice with Mushroom Sauce' },
      ingredients: { vi: 'Cơm cháy Ninh Bình, các loại nấm, gia vị chay, bột năng', en: 'Ninh Bình crispy rice cake, assorted mushrooms, vegan seasoning, tapioca starch' },
      price: '75.000',
      region: 'Ninh Bình',
    },
    {
      id: 'ca-tim-vu-xuan-chien-la-lot',
      name: { vi: 'Cà Tím Vụ Xuân Chiên Lá Lốt', en: 'Spring Harvest Aubergine with Wild Betel Leaf' },
      ingredients: { vi: 'Cà tím, bột mì, gia vị chay, lá lốt, chiên với dầu ăn chay', en: 'Aubergine, flour, vegan seasoning, wild betel leaf, vegan oil-fried' },
      price: '75.000',
    },
    {
      id: 'rong-bien-tam-me-an-giang',
      name: { vi: 'Rong Biển Tẩm Mè An Giang', en: 'An Giang Sesame Seaweed' },
      ingredients: { vi: 'Bánh tráng gạo, rau sống, củ dền, rong biển tươi, sốt mè đen', en: 'Rice paper, fresh herbs, beetroot, seaweed, black sesame sauce' },
      price: '75.000',
      region: 'An Giang',
    },
    {
      id: 'banh-khoai-muong-khuong-sot-dau-xi',
      name: { vi: 'Bánh Khoải Mường Khương Sốt Đậu Xị', en: 'Mường Khương Bánh Khoải with Black Bean Sauce' },
      ingredients: { vi: 'Bánh khoải Mường Khương, nấm tươi, đậu xị, chẩm chéo, gia vị chay', en: 'Mường Khương bánh khoải, fresh mushrooms, fermented black bean, chẩm chéo dip, vegan seasoning' },
      price: '85.000',
      isSignature: true,
      region: 'Mường Khương',
    },
  ],
}

// ─── BÁT Ô TÔ — BIG BOWL ─────────────────────────────────────────────────────
export const batOTo: MenuCategory = {
  id: 'bat-o-to',
  name: { vi: 'Bát Ô Tô', en: 'Big Bowl' },
  subtitle: { vi: 'Món chính ăn no', en: 'Main dishes' },
  description: {
    vi: 'Gọi là bát ô tô vì nhớ khi xưa mỗi lần được ăn cơm bằng bát ô tô với đủ món topping là cảm xúc rất sung sướng. Món ăn chính với khẩu phần lớn hơn và ăn no.',
    en: 'Named after the "big bowl" — a memory of joy when eating from an oversized bowl piled high with toppings. Hearty main dishes.',
  },
  items: [
    {
      id: 'cuon-tia-to-tan-minh',
      name: { vi: 'Cuốn Tía Tô Tân Minh', en: 'Tân Minh Perilla Wraps' },
      ingredients: { vi: 'Hạt điều, hạt macca, gạo lứt sấy khô, trái cây tươi theo mùa, việt quất khô, xả, sốt chanh leo, lá tía tô', en: 'Cashews, macadamia, dried brown rice, seasonal fresh fruits, dried blueberries, lemongrass, passion fruit sauce, perilla leaves' },
      price: '105.000',
      isSignature: true,
      region: 'Thường Tín, Hà Nội',
    },
    {
      id: 'salad-trai-cay-bon-mua',
      name: { vi: 'Salad Trái Cây Bốn Mùa', en: 'Four Seasons Fruit Salad' },
      ingredients: { vi: 'Xà lách trắng, xà lách xoăn, cà chua bi, dâu tây, thanh long đỏ, mầm cải, các loại hạt khô, sốt chanh leo nhà Dana', en: 'Butter lettuce, curly lettuce, cherry tomato, strawberry, red dragon fruit, sprouts, mixed nuts, Dana passion fruit dressing' },
      price: '105.000',
      isSignature: true,
    },
    {
      id: 'salad-rau-cu-nuong-moc-chau',
      name: { vi: 'Salad Rau Củ Nướng Mộc Châu', en: 'Mộc Châu Roasted Vegetable Salad' },
      ingredients: { vi: 'Xà lách Roman, củ dền nướng, bí đỏ nướng, tỏi đen, ngô bao tử, nấm đùi gà, sốt đậu đen nhà Dana', en: 'Romaine lettuce, roasted beetroot, roasted pumpkin, black garlic, baby corn, king oyster mushroom, Dana black bean dressing' },
      price: '105.000',
      isSignature: true,
      region: 'Mộc Châu',
    },
    {
      id: 'nom-bo-ho-doi-moi',
      name: { vi: 'Nộm Bờ Hồ Đổi Mới', en: 'Reinvented Bờ Hồ Vietnamese Slaw' },
      ingredients: { vi: 'Củ sen, cà rốt, nước nộm, rau mùi', en: 'Lotus root, carrot, tangy nộm dressing, coriander' },
      price: '95.000',
      region: 'Hà Nội',
    },
    {
      id: 'gnocchi-ca-ri',
      name: { vi: 'Gnocchi Cà Ri', en: 'Curry Gnocchi' },
      ingredients: { vi: 'Ngô bao tử, bánh khoai tây, cà rốt, sốt cà ri, ớt', en: 'Baby corn, potato gnocchi, carrot, curry sauce, chili' },
      price: '145.000',
      isSignature: true,
    },
    {
      id: 'bun-nam-dam-bong-ha-noi',
      name: { vi: 'Bún Nấm Dấm Bỗng Hà Nội', en: 'Hanoi Mushroom Vermicelli with Rice Vinegar' },
      ingredients: { vi: 'Đậu phụ, bún, giò chay, nấm sò đen (tím), rau sống, hành lá, tía tô, nước dùng', en: 'Tofu, rice vermicelli, vegan sausage, black oyster mushroom, fresh herbs, spring onion, perilla, broth' },
      price: '80.000',
      region: 'Hà Nội',
    },
    {
      id: 'nem-banh-chung-bun-la-tu-ky',
      name: { vi: 'Nem Bánh Chưng Bún Lá Tứ Kỳ', en: 'Bánh Chưng Spring Rolls with Tứ Kỳ Flat Noodles' },
      ingredients: { vi: 'Xà lách, tía tô, kinh giới, lá bún, nước chấm chay, bánh đa nem chay', en: 'Lettuce, perilla, Vietnamese balm, flat rice noodle leaves, vegan dipping sauce, rice paper' },
      price: '125.000',
      isSignature: true,
    },
    {
      id: 'pho-ganh-ha-noi',
      name: { vi: 'Phở Gánh Hà Nội', en: 'Hanoi Shoulder-Pole Pho' },
      ingredients: { vi: 'Phở gạo, nấm, quế, hồi, hành, nước hầm rau củ', en: 'Rice pho noodles, mushrooms, cinnamon, star anise, onion, vegetable broth' },
      price: '80.000',
      region: 'Hà Nội',
    },
    {
      id: 'bi-do-bo-lo-sot-toi-den-ly-son',
      name: { vi: 'Bí Đỏ Bơ Lò Sốt Tỏi Đen Lý Sơn', en: 'Oven-Baked Pumpkin with Lý Sơn Black Garlic' },
      ingredients: { vi: 'Bí đỏ, sốt tỏi đen, mầm cải, nấm hương tươi, nấm đùi gà, gia vị (nướng)', en: 'Pumpkin, black garlic sauce, micro greens, shiitake, king oyster mushroom, seasoning (grilled)' },
      price: '145.000',
      isSignature: true,
      region: 'Lý Sơn, Quảng Ngãi',
    },
    {
      id: 'burger-com-nam',
      name: { vi: 'Burger Cơm Nắm', en: 'Sticky Rice Ball Burger' },
      ingredients: { vi: 'Cơm nếp, nấm đùi gà, cà chua, xà lách, gia vị chay', en: 'Glutinous rice, king oyster mushroom, tomato, lettuce, vegan seasoning' },
      price: '115.000',
      isNew: true,
    },
    {
      id: 'nam-dui-ga-sot-ruou-vang',
      name: { vi: 'Nấm Đùi Gà Sốt Rượu Vang', en: 'King Oyster Mushroom in Red Wine Sauce' },
      ingredients: { vi: 'Nấm đùi gà, gia vị chay, rượu vang đỏ', en: 'King oyster mushroom, vegan seasoning, red wine' },
      price: '185.000',
      isSignature: true,
    },
    {
      id: 'nam-ap-chao-sot-chanh-leo-gia-lai',
      name: { vi: 'Nấm Áp Chảo Sốt Chanh Leo Gia Lai', en: 'Pan-Seared Mushroom with Gia Lai Passion Fruit' },
      ingredients: { vi: 'Nấm đùi gà, cà chua, mầm cải, sốt chanh leo', en: 'King oyster mushroom, tomato, micro greens, passion fruit sauce' },
      price: '145.000',
      isSignature: true,
      region: 'Gia Lai',
    },
    {
      id: 'nam-tha-thinh-nam-dinh',
      name: { vi: 'Nấm "Thả Thính" Nam Định', en: 'Nam Định "Roasted Rice Flour" Mushrooms' },
      ingredients: { vi: 'Nấm, thính gạo, lá sung, gia vị chay', en: 'Mushrooms, toasted rice flour (thính), fig leaf, vegan seasoning' },
      price: '105.000',
      isSignature: true,
      region: 'Nam Định',
    },
    {
      id: 'cu-den-nuong-sot-hat-dieu-binh-phuoc',
      name: { vi: 'Củ Dền Nướng Sốt Hạt Điều Bình Phước', en: 'Roasted Beetroot with Bình Phước Cashew Sauce' },
      ingredients: { vi: 'Củ dền, cơm gạo Séng Cù, sốt hạt điều, gia vị (nướng)', en: 'Beetroot, Séng Cù rice, cashew sauce, seasoning (grilled)' },
      price: '165.000',
      isSignature: true,
      region: 'Bình Phước',
    },
    {
      id: 'nam-om-tieu-xanh-phu-quoc',
      name: { vi: 'Nấm Om Tiêu Xanh Phú Quốc', en: 'Braised Mushrooms with Phú Quốc Green Pepper' },
      ingredients: { vi: 'Nấm rơm, tiêu xanh Phú Quốc, gia vị chay', en: 'Straw mushrooms, Phú Quốc fresh green peppercorn, vegan seasoning' },
      price: '135.000',
      region: 'Phú Quốc',
    },
  ],
}

// ─── MÂM — TO SHARE ──────────────────────────────────────────────────────────
export const mam: MenuCategory = {
  id: 'mam',
  name: { vi: 'Mâm', en: 'To Share' },
  subtitle: { vi: 'Cùng nhau sum vầy', en: 'Shared table' },
  description: {
    vi: 'Mỗi khi nghĩ đến mâm cơm gia đình là nghĩ đến sự sum vầy và chia sẻ. Món "To Share" hay "Mâm" chính là tinh thần như thế.',
    en: 'Every family table is a place of togetherness and sharing. Our sharing plates carry that same spirit.',
  },
  items: [
    {
      id: 'rau-ha-noi-xao-theo-mua',
      name: { vi: 'Rau Hà Nội Xào Theo Mùa', en: 'Hanoi Seasonal Stir-Fried Greens' },
      ingredients: { vi: 'Rau theo mùa, nấm hương, gia vị chay', en: 'Seasonal greens, shiitake mushrooms, vegan seasoning' },
      price: '105.000',
      region: 'Hà Nội',
    },
    {
      id: 'com-seng-cu-bao-cap',
      name: { vi: 'Cơm Séng Cù "Bao Cấp"', en: 'Séng Cù Mixed Grain Rice' },
      ingredients: { vi: 'Gạo Séng Cù, gạo lứt, hạt kê, ngô hạt', en: 'Séng Cù rice, brown rice, millet, corn kernels' },
      price: '115.000',
      region: 'Lào Cai',
    },
    {
      id: 'rau-trong-vuon-hap-cham-kho-quet',
      name: { vi: 'Rau Trong Vườn Hấp, Chấm Kho Quẹt', en: 'Garden Vegetables Steamed with Kho Quẹt Dip' },
      ingredients: { vi: 'Bí ngòi xanh, bí ngòi vàng, củ cải, ngô bao tử, cà rốt, kho quẹt chay', en: 'Green zucchini, yellow zucchini, daikon, baby corn, carrot, vegan kho quẹt caramel dip' },
      price: '105.000',
    },
    {
      id: 'dana-pizza',
      name: { vi: 'Dāna Pizza', en: 'Dāna Pizza' },
      ingredients: { vi: 'Củ dền, ngô hạt, sốt đậu đỏ, pho mai chay, cỏ thơm, đế bánh đa, gia vị chay', en: 'Beetroot, corn, red bean sauce, vegan cheese, herbs, crispy rice cracker base, vegan seasoning' },
      price: '175.000',
      isSignature: true,
    },
    {
      id: 'canh-nam-hat-sen-hue',
      name: { vi: 'Canh Nấm Hạt Sen Huế', en: 'Mushroom & Lotus Seed Soup (Huế style)' },
      ingredients: { vi: 'Nấm, cà chua, hạt sen Huế, chanh, nước dùng chay, gia vị chay', en: 'Mushrooms, tomato, Huế lotus seeds, lime, vegan broth, vegan seasoning' },
      price: '105.000',
      region: 'Huế',
    },
    {
      id: 'nam-loc-nhung-khe-chua',
      name: { vi: 'Nấm Lộc Nhung Khế Chua', en: 'Lộc Nhung Mushroom with Sour Starfruit' },
      ingredients: { vi: 'Nấm lộc nhung, khế chua, rau ngổ, vừng, gia vị chay', en: 'Lộc nhung mushroom, sour starfruit, water herb, sesame, vegan seasoning' },
      price: '135.000',
      isSignature: true,
      region: 'Lào Cai',
    },
    {
      id: 'lau-bong',
      name: { vi: 'Lẩu Bỗng', en: 'Fermented Rice Broth Hotpot' },
      ingredients: { vi: 'Dấm bỗng, các loại nấm, đậu phụ, rau theo mùa', en: 'Fermented rice broth, assorted mushrooms, tofu, seasonal vegetables' },
      price: '239.000 / 389.000',
      isSignature: true,
      region: 'Hà Nội',
    },
    {
      id: 'tao-bien-cochayuyo-xao-xa-ot',
      name: { vi: 'Tảo Biển Cochayuyo Xào Xả Ớt', en: 'Chilean Cochayuyo Seaweed Stir-Fry' },
      ingredients: { vi: 'Tảo biển Chile, xả, ớt, gia vị chay', en: 'Chilean cochayuyo seaweed, lemongrass, chili, vegan seasoning' },
      price: '115.000',
    },
    {
      id: 'nam-sot-vang-ha-noi',
      name: { vi: 'Nấm Sốt Vang Hà Nội', en: 'Hanoi Mushroom Bourguignon' },
      ingredients: { vi: 'Nấm đầu khỉ, nấm đùi gà, cà rốt, khoai tây, rượu vang', en: 'Lion\'s mane mushroom, king oyster mushroom, carrot, potato, red wine' },
      price: '145.000',
      isSignature: true,
      region: 'Hà Nội',
    },
    {
      id: 'lau-thai',
      name: { vi: 'Lẩu Thái', en: 'Thai-Style Hotpot' },
      ingredients: { vi: 'Nước lẩu cốt Thái, các loại nấm, đậu phụ, rau theo mùa', en: 'Thai-base broth, assorted mushrooms, tofu, seasonal vegetables' },
      price: '239.000 / 389.000',
    },
    {
      id: 'com-nieu-dana',
      name: { vi: 'Cơm Niêu Dāna', en: 'Dāna Clay Pot Rice' },
      ingredients: { vi: 'Gạo tám thơm, nấm, hạt sen', en: 'Tám thơm fragrant rice, mushrooms, lotus seeds' },
      price: '135.000',
      isSignature: true,
    },
  ],
}

// ─── ĐŨA CẢ — EXTRAS ─────────────────────────────────────────────────────────
export const duaCa: MenuCategory = {
  id: 'dua-ca',
  name: { vi: 'Đũa Cả', en: 'Extras' },
  subtitle: { vi: 'Thêm vào cho đủ đầy', en: 'Add-ons to complete your meal' },
  description: {
    vi: 'Đũa cả là đôi đũa quyền lực trong mỗi gia đình Việt Nam xưa, dùng để xới những bát cơm nóng hổi. Món ăn thêm làm cho trải nghiệm của quý khách trở nên đủ đầy hơn.',
    en: '"Đũa cả" — the large serving chopsticks of every Vietnamese household. Our extras complete your dining experience.',
  },
  items: [
    {
      id: 'xoi-ngu-sac-dong-van',
      name: { vi: 'Xôi Ngũ Sắc Đồng Văn', en: 'Đồng Văn Five-Colour Sticky Rice' },
      ingredients: { vi: 'Gạo nếp nương, màu tự nhiên, muối vừng', en: 'Highland glutinous rice, natural plant dyes, sesame salt' },
      price: '65.000',
      isSignature: true,
      region: 'Đồng Văn, Hà Giang',
    },
    {
      id: 'com-lam-cao-bang',
      name: { vi: 'Cơm Lam Cao Bằng', en: 'Cao Bằng Bamboo-Tube Rice' },
      ingredients: { vi: 'Gạo nếp nương, lạc, ống nứa, muối vừng', en: 'Highland glutinous rice, peanuts, bamboo tube, sesame salt' },
      price: '65.000',
      region: 'Cao Bằng',
    },
    {
      id: 'banh-mi',
      name: { vi: 'Bánh Mì', en: 'Vietnamese Baguette' },
      ingredients: { vi: 'Bánh mì nóng hổi', en: 'Freshly baked Vietnamese baguette' },
      price: '20.000',
    },
    {
      id: 'com-nieu-gao-soc-trang',
      name: { vi: 'Cơm Niêu Gạo Sóc Trăng', en: 'Sóc Trăng ST25 Clay Pot Rice' },
      ingredients: { vi: 'Gạo ST25 Sóc Trăng — gạo ngon nhất thế giới', en: 'ST25 rice from Sóc Trăng — world\'s finest rice' },
      price: '30.000',
      region: 'Sóc Trăng',
    },
    {
      id: 'banh-da-lang-ke',
      name: { vi: 'Bánh Đa Làng Kế', en: 'Làng Kế Sesame Rice Cracker' },
      ingredients: { vi: 'Gạo, vừng lạc, khoai lang và cơm trắng', en: 'Rice, sesame, peanut, sweet potato and white rice' },
      price: '20.000',
      region: 'Bắc Giang',
    },
  ],
}

// ─── THÌA NGỌT NGÀO — DESSERTS ───────────────────────────────────────────────
export const thiaNgot: MenuCategory = {
  id: 'thia-ngot',
  name: { vi: 'Thìa Ngọt Ngào', en: 'Desserts' },
  subtitle: { vi: 'Kết thúc ngọt ngào', en: 'Sweet endings' },
  description: {
    vi: 'Tráng miệng là kết thúc ngọt ngào của một bữa ăn. Hãy để những "thìa ngọt ngào" tạo nên bữa ăn hạnh phúc của bạn nhé!',
    en: 'Dessert is the sweet finale to every meal. Let our "sweet spoons" make your dining moment truly happy!',
  },
  items: [
    {
      id: 'banh-flan-bi-do-dana',
      name: { vi: 'Bánh Flan Bí Đỏ Dāna', en: 'Dāna Pumpkin Crème Caramel' },
      ingredients: { vi: 'Bí đỏ, sữa hạt điều, pho mai hạt điều', en: 'Pumpkin, cashew milk, cashew cream cheese' },
      price: '35.000',
      isSignature: true,
    },
    {
      id: 'trai-cay-theo-mua',
      name: { vi: 'Trái Cây Theo Mùa', en: 'Seasonal Fresh Fruits' },
      ingredients: { vi: 'Trái cây tươi theo mùa của Việt Nam', en: 'Seasonal fresh fruits of Vietnam' },
      price: '65.000',
    },
    {
      id: 'panna-cotta-thuan-chay',
      name: { vi: 'Panna Cotta Thuần Chay', en: 'Vegan Panna Cotta' },
      ingredients: { vi: 'Sữa dừa, sữa hạt điều, gelatin', en: 'Coconut milk, cashew milk, gelatin' },
      price: '40.000',
      isSignature: true,
    },
    {
      id: 'kem-pudding-gao-thai-binh',
      name: { vi: 'Kem Pudding Gạo Thái Bình', en: 'Thái Bình Rice Pudding Ice Cream' },
      ingredients: { vi: 'Kem dừa, gạo Thái Bình, trái cây', en: 'Coconut ice cream, Thái Bình premium rice, fresh fruits' },
      price: '55.000',
      isSignature: true,
      region: 'Thái Bình',
    },
  ],
}

// ─── GIẢI KHÁT — DRINKS ──────────────────────────────────────────────────────
export const giaiKhat: MenuCategory = {
  id: 'giai-khat',
  name: { vi: 'Giải Khát', en: 'Drinks' },
  subtitle: { vi: 'Thức uống bổ dưỡng', en: 'Nourishing beverages' },
  description: {
    vi: '"Nước Giải Khát" là từ được dùng từ thời bao cấp của người Việt, nhắc đến nước giải khát là nhắc đến những thức uống bổ dưỡng và thức uống dành cho khách quý đến chơi nhà...',
    en: '"Nước Giải Khát" is a term from Vietnam\'s subsidy era, evoking nourishing beverages served to honored guests...',
  },
  items: [
    // — Homemade Hanoi Drinks
    {
      id: 'sua-gao-lac-hang-chuoi',
      name: { vi: 'Sữa Gạo Lắc Hàng Chuối', en: 'Hàng Chuối Shaken Rice Milk' },
      ingredients: { vi: 'Sữa gạo homemade, chuối, vani', en: 'Homemade rice milk, banana, vanilla' },
      price: '65.000',
      isSignature: true,
      region: 'Hà Nội',
    },
    {
      id: 'sua-gao-nha-lam',
      name: { vi: 'Sữa Gạo Nhà Làm', en: 'House-made Rice Milk' },
      ingredients: { vi: 'Sữa gạo homemade, bơ, vani', en: 'Homemade rice milk, butter, vanilla' },
      price: '45.000',
    },
    {
      id: 'cold-brew-dana',
      name: { vi: 'Cold Brew Dāna', en: 'Dāna Rice Cold Brew' },
      ingredients: { vi: 'Cà phê ủ lạnh, sữa gạo homemade', en: 'Cold brew coffee, homemade rice milk' },
      price: '65.000',
      isSignature: true,
    },
    {
      id: 'cold-brew-moc-chau',
      name: { vi: 'Cold Brew Mộc Châu', en: 'Mộc Châu Strawberry Cold Brew' },
      ingredients: { vi: 'Cà phê ủ lạnh, dâu tây Mộc Châu, kombucha homemade', en: 'Cold brew coffee, Mộc Châu strawberry, homemade kombucha' },
      price: '65.000',
      isSignature: true,
      region: 'Mộc Châu',
    },
    {
      id: 'cold-brew-hoa-loc',
      name: { vi: 'Cold Brew Hòa Lộc', en: 'Hòa Lộc Mango Cold Brew' },
      ingredients: { vi: 'Cà phê ủ lạnh, xoài cát Hòa Lộc, kombucha homemade', en: 'Cold brew coffee, Hòa Lộc cat mango, homemade kombucha' },
      price: '65.000',
      region: 'Tiền Giang',
    },
    {
      id: 'kombucha-phung-xa',
      name: { vi: 'Kombucha Phùng Xá', en: 'Phùng Xá Mulberry Kombucha' },
      ingredients: { vi: 'Kombucha homemade, trà đen, dâu tằm, dâu tây', en: 'Homemade kombucha, black tea, mulberry, strawberry' },
      price: '65.000',
      region: 'Phùng Xá, Hà Nội',
    },
    {
      id: 'tra-gung-cam-que-yen-bai',
      name: { vi: 'Trà Gừng Cam Quế Yên Bái', en: 'Yên Bái Cinnamon Ginger Orange Tea' },
      ingredients: { vi: 'Trà, gừng, cam, quế Yên Bái', en: 'Tea, ginger, orange, Yên Bái cinnamon' },
      price: '65.000',
      region: 'Yên Bái',
    },
    {
      id: 'kombucha-dong-du',
      name: { vi: 'Kombucha Đông Dư', en: 'Đông Dư Guava Kombucha' },
      ingredients: { vi: 'Kombucha homemade, trà đen, ổi Hồng, ổi xanh', en: 'Homemade kombucha, black tea, pink guava, green guava' },
      price: '65.000',
      region: 'Gia Lâm, Hà Nội',
    },
    {
      id: 'hang-duong',
      name: { vi: 'Hàng Đường', en: 'Hàng Đường Sour Plum Soda' },
      ingredients: { vi: 'Cóc ép, mơ muối, vani, lá basil', en: 'Green mango juice, salted plum, vanilla, basil leaves' },
      price: '65.000',
      region: 'Phố Cổ, Hà Nội',
    },
    {
      id: 'nuoc-ep-cu-qua',
      name: { vi: 'Nước Ép Củ Quả Theo Mùa', en: 'Seasonal Fresh-Pressed Juice' },
      ingredients: { vi: 'Trái cây và rau củ tươi theo mùa', en: 'Seasonal fresh fruits and vegetables' },
      price: '65.000',
    },
    {
      id: 'tra-hoa-dua-que-mat-ong',
      name: { vi: 'Trà Hoa Dừa Quế Mật Ong', en: 'Coconut Blossom & Cinnamon Honey Tea' },
      ingredients: { vi: 'Trà, quế, quất, mật ong hoa dừa', en: 'Tea, cinnamon, kumquat, coconut blossom honey' },
      price: '65.000',
      region: 'Bến Tre',
    },
    {
      id: 'nuoc-sau-ha-thanh',
      name: { vi: 'Nước Sấu Hà Thành', en: 'Hanoi Canarium Cooler' },
      ingredients: { vi: 'Sấu tươi, đường, muối, gừng', en: 'Fresh canarium fruit, sugar, salt, ginger' },
      price: '45.000',
      isSignature: true,
      region: 'Hà Nội',
    },
    {
      id: 'nuoc-mo-pho-co',
      name: { vi: 'Nước Mơ Phố Cổ', en: 'Old Quarter Plum Drink' },
      ingredients: { vi: 'Mơ chín, đường, muối', en: 'Ripe plum, sugar, salt' },
      price: '45.000',
      region: 'Phố Cổ, Hà Nội',
    },
    // — Craft & Bottled
    {
      id: 'bia-tay-bac',
      name: { vi: 'Bia Tây Bắc', en: 'Northwest Vietnam Craft Beer' },
      ingredients: { vi: '6.3% ABV, 26 IBU – mắc khén, hạt dổi', en: '6.3% ABV, 26 IBU – mắc khén pepper, wild spice' },
      price: '95.000',
      isSignature: true,
    },
    {
      id: 'bia-tam-giac-mach',
      name: { vi: 'Bia Tam Giác Mạch', en: 'Buckwheat Flower Craft Beer' },
      ingredients: { vi: '6% ABV, 26 IBU – hạt tam giác mạch Hà Giang', en: '6% ABV, 26 IBU – Hà Giang buckwheat' },
      price: '95.000',
    },
    {
      id: 'junbucha-mo-muoi',
      name: { vi: 'Junbucha Mơ Muối', en: 'Salted Plum Junbucha' },
      ingredients: { vi: 'Trà xanh, mật ong, bánh men scoby, nước cốt mơ ngâm, muối biển', en: 'Green tea, honey, scoby starter, plum concentrate, sea salt' },
      price: '80.000',
      isSignature: true,
    },
    {
      id: 'junbucha-dau-gung',
      name: { vi: 'Junbucha Dâu Gừng', en: 'Strawberry Ginger Junbucha' },
      ingredients: { vi: 'Trà xanh, mật ong, bánh men scoby, nước dâu tằm, gừng tươi', en: 'Green tea, honey, scoby starter, mulberry juice, fresh ginger' },
      price: '80.000',
    },
    {
      id: 'junbucha-quat-nhai',
      name: { vi: 'Junbucha Quất Nhài', en: 'Kumquat Jasmine Junbucha' },
      ingredients: { vi: 'Trà xanh, mật ong, bánh men scoby, nước quất, hoa nhài', en: 'Green tea, honey, scoby starter, kumquat juice, jasmine blossom' },
      price: '80.000',
    },
    {
      id: 'nuoc-ion-kiem',
      name: { vi: 'Nước Ion Kiềm pH9+', en: 'Alkaline Water pH9+' },
      ingredients: { vi: 'Nước kiềm độ pH9+', en: 'Alkaline water pH9+' },
      price: '30.000',
    },
    // — Coffee
    {
      id: 'ca-phe-mira',
      name: { vi: 'Cà Phê Mira', en: 'Mira Coffee' },
      ingredients: { vi: 'Cà phê phin truyền thống', en: 'Traditional Vietnamese drip coffee' },
      price: '45.000',
    },
    {
      id: 'espresso',
      name: { vi: 'Espresso', en: 'Espresso' },
      ingredients: { vi: 'Espresso', en: 'Espresso shot' },
      price: '50.000',
    },
    {
      id: 'americano',
      name: { vi: 'Americano', en: 'Americano' },
      ingredients: { vi: 'Espresso, nước', en: 'Espresso, water' },
      price: '55.000',
    },
    {
      id: 'ca-phe-sua-hat',
      name: { vi: 'Cà Phê Sữa Hạt', en: 'Nut Milk Coffee' },
      ingredients: { vi: 'Espresso, sữa hạt', en: 'Espresso, plant-based nut milk' },
      price: '65.000',
    },
  ],
}

// ─── MÂM NHÀ — SET MENUS ─────────────────────────────────────────────────────
export const mamNha: SetMenuItem[] = [
  {
    id: 'mam-me-nau',
    name: { vi: 'Mâm Cơm Mẹ Nấu', en: "Mother's Table" },
    dishes: [
      'Salad trái cây bốn mùa',
      'Nấm Châu Thành rang muối',
      'Cuốn tía tô Tân Minh',
      'Nem bánh chưng bún lá Tứ Kỳ',
      'Rau trong vườn hấp chấm kho quẹt',
      'Nấm om tiêu xanh Phú Quốc',
      'Cơm niêu Dāna',
    ],
    originalPrice: 745000,
    price: 539000,
    serves: '2–4 người / 2–4 guests',
  },
  {
    id: 'mam-bac',
    name: { vi: 'Mâm Cơm Bắc', en: 'Northern Table' },
    dishes: [
      'Nộm Bờ Hồ đổi mới',
      'Nấm "Thả Thính" Nam Định',
      'Bánh đa làng Kế xúc nấm đậu',
      'Cuốn tía tô Tân Minh',
      'Nem bánh chưng bún lá Tứ Kỳ',
      'Rau Hà Nội xào theo mùa',
      'Nấm sốt vang Hà Nội',
      'Cơm Séng Cù bao cấp',
    ],
    originalPrice: 870000,
    price: 699000,
    serves: '2–4 người / 2–4 guests',
  },
  {
    id: 'mam-tay-bac',
    name: { vi: 'Mâm Cơm Tây Bắc', en: 'Northwestern Table' },
    dishes: [
      'Salad rau củ nướng Mộc Châu',
      'Cà tím vụ xuân chiên lá lốt',
      'Xôi ngũ sắc Đồng Văn',
      'Bánh khoải Mường Khương sốt đậu xị',
      'Nấm lộc nhung khế chua',
      'Rau trong vườn hấp chấm kho quẹt',
      'Nấm om tiêu xanh Phú Quốc',
      'Cơm Séng Cù bao cấp',
    ],
    originalPrice: 820000,
    price: 669000,
    serves: '2–4 người / 2–4 guests',
  },
  {
    id: 'mam-bo-nau',
    name: { vi: 'Mâm Cơm Bố Nấu', en: "Father's Table" },
    dishes: [
      'Cuốn tía tô Tân Minh',
      'Bánh đa làng Kế xúc nấm đậu',
      'Nấm lộc nhung khế chua',
      'Đậu tẩm hành Chợ Gạo',
      'Gnocchi cà ri',
      'Rau Hà Nội xào theo mùa',
      'Cơm gạo Sóc Trăng',
    ],
    originalPrice: 755000,
    price: 539000,
    serves: '2–4 người / 2–4 guests',
  },
  {
    id: 'mam-nam',
    name: { vi: 'Mâm Cơm Nam', en: 'Southern Table' },
    dishes: [
      'Salad trái cây bốn mùa',
      'Rong biển tẩm mè An Giang',
      'Cuốn tía tô Tân Minh',
      'Rau trong vườn hấp chấm kho quẹt',
      'Gnocchi cà ri',
      'Nấm om tiêu xanh Phú Quốc',
      'Tảo biển Cochayuyo xào xả ớt',
      'Cơm niêu Dāna',
    ],
    originalPrice: 815000,
    price: 699000,
    serves: '2–4 người / 2–4 guests',
  },
  {
    id: 'mam-tay-ta',
    name: { vi: 'Mâm Cơm Tây Ta', en: 'East Meets West Table' },
    dishes: [
      'Salad trái cây bốn mùa',
      'Đậu hũ non sốt Gấc Miso',
      'Cuốn tía tô Tân Minh',
      'Bánh đa làng Kế xúc nấm đậu',
      'Gnocchi cà ri',
      'Nấm đùi gà sốt rượu vang',
      'Dāna Pizza',
      'Panna Cotta thuần chay',
    ],
    originalPrice: 1025000,
    price: 819000,
    serves: '2–4 người / 2–4 guests',
  },
]

// ─── ALL CATEGORIES (ordered for menu page) ──────────────────────────────────
export const allCategories: MenuCategory[] = [
  batCon,
  batOTo,
  mam,
  duaCa,
  thiaNgot,
  giaiKhat,
]

// ─── FEATURED DISHES (for homepage) ─────────────────────────────────────────
export const featuredDishes = [
  { ...batOTo.items.find(i => i.id === 'pho-ganh-ha-noi')!, color: '#C4623A', textColor: '#FFF8EC' },
  { ...batCon.items.find(i => i.id === 'nam-chau-thanh-rang-muoi')!, color: '#2A5C34', textColor: '#FFF8EC' },
  { ...batCon.items.find(i => i.id === 'banh-khoai-muong-khuong-sot-dau-xi')!, color: '#5C3317', textColor: '#F5EDD8' },
  { ...mam.items.find(i => i.id === 'com-nieu-dana')!, color: '#D4A843', textColor: '#5C3317' },
]

// ─── VIETNAM INGREDIENT REGIONS (for homepage map section) ───────────────────
export const ingredientRegions = [
  { region: 'Mộc Châu', ingredient: 'Rau củ nướng, dâu tây', north: true },
  { region: 'Đồng Văn', ingredient: 'Xôi ngũ sắc', north: true },
  { region: 'Mường Khương', ingredient: 'Bánh khoải', north: true },
  { region: 'Cao Bằng', ingredient: 'Cơm lam', north: true },
  { region: 'Yên Bái', ingredient: 'Quế núi rừng', north: true },
  { region: 'Lào Cai', ingredient: 'Nấm lộc nhung, gạo Séng Cù', north: true },
  { region: 'Bắc Giang', ingredient: 'Bánh đa làng Kế', north: true },
  { region: 'Hà Nội', ingredient: 'Đậu làng Mơ, rau mùa', north: true },
  { region: 'Ninh Bình', ingredient: 'Cơm cháy', north: true },
  { region: 'Thanh Lãng', ingredient: 'Nấm bào ngư', north: true },
  { region: 'Huế', ingredient: 'Hạt sen', central: true },
  { region: 'Gia Lai', ingredient: 'Chanh leo', central: true },
  { region: 'Đà Lạt', ingredient: 'Rau sạch xanh', central: true },
  { region: 'An Giang', ingredient: 'Mè vàng', south: true },
  { region: 'Bình Phước', ingredient: 'Hạt điều', south: true },
  { region: 'Sóc Trăng', ingredient: 'Gạo ST25', south: true },
  { region: 'Phú Quốc', ingredient: 'Tiêu xanh', south: true },
  { region: 'Bến Tre', ingredient: 'Mật ong hoa dừa', south: true },
  { region: 'Lý Sơn', ingredient: 'Tỏi đen', south: true },
]

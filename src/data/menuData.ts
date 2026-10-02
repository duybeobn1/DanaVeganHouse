export interface MenuItem {
  id: string
  name: { vi: string; en: string }
  ingredients: { vi: string; en: string }
  price: string // e.g. "75.000"
  region?: string
  isSignature?: boolean // "Must try" star on the printed menu
  isSpecial?: boolean // "Dāna's Special" on the printed menu
  isChef?: boolean // "Chef's recommendation" on the printed menu
  isNew?: boolean
  hidden?: boolean // kept for reuse on another occasion, not shown on the site
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
  dishesEn?: string[]
  originalPrice: number
  price: number
  serves: string
  hidden?: boolean
}

// ─── BÁT CON — SMALL BOWL ────────────────────────────────────────────────────
export const batCon: MenuCategory = {
  id: 'bat-con',
  name: { vi: 'Bát Con', en: 'Small Bowl' },
  subtitle: { vi: 'Món nhỏ ăn chơi', en: 'Small bites & starters' },
  description: {
    vi: 'Những món ăn nhỏ để bắt đầu và khám phá. Lấy cảm hứng từ chiếc bát cơm quen thuộc trong mỗi gia đình Việt — giản dị, gần gũi và luôn hiện diện trên mâm cơm. Những món ăn nhỏ đầy hương vị — để bữa ăn trở nên vui hơn, và mỗi lần thưởng thức là một trải nghiệm mới.',
    en: 'Bát con is the small rice bowl found in every Vietnamese meal — simple, familiar, and always present at the table. At Dāna, Bát Con is where the journey begins: light and flavorful bites made to awaken the palate and bring more joy to the meal.',
  },
  items: [
    {
      id: 'soup-nam-thanh-lang',
      isChef: true,
      name: { vi: 'Soup Nấm Thanh Lãng', en: 'Thanh Lang Mushroom Soup' },
      ingredients: { vi: 'Nấm, gia vị chay, khoai tây, hạt điều', en: 'Mushrooms, vegan spices, potatoes, cashew nuts' },
      price: '75.000',
      region: 'Vĩnh Phúc',
    },
    {
      id: 'soup-rau-xanh-da-lat',
      isSpecial: true,
      name: { vi: 'Soup Rau Xanh Đà Lạt', en: 'Green Dalat Veggie Soup' },
      ingredients: { vi: 'Các loại rau xanh, súp lơ xanh, rau kale, khoai, hạt điều, củ cải', en: 'Vegetables, green broccoli, cashew nuts, vegan spices' },
      price: '95.000',
      region: 'Đà Lạt',
    },
    {
      id: 'soup-dau-non-qua-mac-mat',
      isSpecial: true,
      name: { vi: 'Soup Đậu Non Quả Mắc Mật', en: 'Young Tofu & Mac Mat Herb Soup' },
      ingredients: { vi: 'Nấm cao cấp, đậu hũ non, nước dùng các loại rau củ, gia vị chay, quả mắc mật', en: 'Young tofu, mac mat berries, vegetables, plant-based broth, vegan spices' },
      price: '115.000',
      region: 'Lạng Sơn',
    },
    {
      id: 'soup-bi-do-ho-lo',
      name: { vi: 'Soup Bí Đỏ Hồ Lô', en: 'Butternut Squash Soup' },
      ingredients: { vi: 'Bí đỏ hồ lô, hành tây, khoai tây, lá nguyệt quế, nước dùng chay, muối tiêu', en: 'Butternut squash (pumpkin), onions, potatoes, bay leaves, vegetarian broth, salt and pepper' },
      price: '75.000',
    },
    {
      id: 'soup-tom-yum-nam-khon',
      name: { vi: 'Soup Tôm Yum Nam Khon', en: 'Tom Yum Nam Khon Soup' },
      ingredients: { vi: 'Nước cốt dừa, sữa hạt điều, gừng, sả, ớt, lá chanh, nước cốt chanh, nấm, vegan dressing', en: 'Coconut milk, cashew milk, galangal, lemongrass, chili, kaffir lime leaves, lime juice, mushrooms, vegan dressing' },
      price: '145.000',
    },
    {
      id: 'cuon-tia-to-tan-minh',
      name: { vi: 'Cuốn Tía Tô Tân Minh', en: 'Fresh Tân Minh Perilla Wrap' },
      ingredients: { vi: 'Lá tía tô, hạt điều, hạt óc chó, gạo lứt sấy khô, trái cây tươi theo mùa, việt quất khô, xả, sốt chanh leo', en: 'Vietnamese perilla leaves, cashew nuts, walnuts, dried brown rice, fresh seasonal fruits, dried blueberries, lemongrass, passion fruit sauce' },
      price: '165.000',
      isSignature: true,
      region: 'Thường Tín, Hà Nội',
    },
    {
      id: 'cuon-mua-xuan',
      name: { vi: 'Cuốn Mùa Xuân', en: 'Cuốn Mùa Xuân (Spring Rolls)' },
      ingredients: { vi: 'Bánh tráng gạo, các loại rau sống, củ dền, rong biển tươi, sốt mè đen', en: 'Rice paper, raw vegetables, beetroots, fresh seaweed, black sesame sauce' },
      price: '135.000',
      isSignature: true,
    },
    {
      id: 'pho-cuon-ngu-xa',
      name: { vi: 'Phở Cuốn Ngũ Xá', en: 'Ngũ Xá Fresh Rolls' },
      ingredients: { vi: 'Bánh phở tươi, dứa, đậu phụ, nấm, rau thơm', en: 'Fresh rice paper, pineapple, tofu, mushrooms, fresh herbs' },
      price: '135.000',
      region: 'Ngũ Xá, Hà Nội',
    },
    {
      id: 'cuon-thinh-nam-dinh',
      name: { vi: 'Cuốn Thính Nam Định', en: 'Mushroom with Nam Định Powdered Grilled Rice' },
      ingredients: { vi: 'Nấm, gia vị chay, thính gạo, lá sung', en: 'Mushroom, powdered grilled rice, vegan spices' },
      price: '135.000',
      region: 'Nam Định',
    },
    {
      id: 'hoi-cuon-phu-yen',
      name: { vi: 'Hỏi Cuốn Phú Yên', en: 'Phú Yên Bánh Hỏi Rolls' },
      ingredients: { vi: 'Bánh hỏi, nấm, các loại rau ăn sống, dứa', en: 'Bánh hỏi rice vermicelli, mushrooms, fresh herbs, pineapple' },
      price: '135.000',
      region: 'Phú Yên',
    },
    {
      id: 'salad-rau-cu-nuong-moc-chau',
      name: { vi: 'Salad Rau Củ Nướng Mộc Châu', en: 'Grilled Mộc Châu Vegetables Salad' },
      ingredients: { vi: 'Xà lách Roman, củ dền nướng, bí đỏ nướng, tỏi đen, ngô bao tử, nấm đùi gà, sốt đậu đen nhà Dāna', en: 'Roman lettuce, grilled beetroot, grilled pumpkin, black garlic, baby corn, mushroom, Dāna black bean dressing' },
      price: '165.000',
      region: 'Mộc Châu',
    },
    {
      id: 'salad-trai-cay-bon-mua',
      isChef: true,
      name: { vi: 'Salad Trái Cây Bốn Mùa', en: 'Seasonal Fruits Salad' },
      ingredients: { vi: 'Xà lách trắng, xà lách xoăn, cà chua bi, dâu tây, thanh long đỏ, mầm cải, các loại hạt khô, sốt chanh leo nhà Dāna', en: 'White lettuce, curly lettuce, cherry tomatoes, strawberries, red dragon fruit, nuts, dried cranberries, Dāna passion fruit dressing' },
      price: '145.000',
    },
    {
      id: 'nom-bo-ho-doi-moi',
      name: { vi: 'Nộm Bờ Hồ Đổi Mới', en: 'The New "Bờ Hồ" Salad' },
      ingredients: { vi: 'Củ sen, cà rốt, nước nộm, rau mùi', en: 'Lotus root, carrot, Vietnamese sweet & sour dressing, coriander' },
      price: '165.000',
      isSignature: true,
      region: 'Hà Nội',
    },
    {
      id: 'salad-rocket-dia-trung-hai',
      name: { vi: 'Salad Rocket Địa Trung Hải', en: 'Mediterranean Rocket Salad' },
      ingredients: { vi: 'Rau rocket, dâu tây, cam/quýt theo mùa, hạt óc chó, sốt dầu dấm', en: 'Rocket leaves (arugula), strawberries, seasonal orange / mandarin, walnuts, vinaigrette dressing' },
      price: '165.000',
    },
    {
      id: 'goi-rau-muong-sot-thai',
      name: { vi: 'Gỏi Rau Muống Sốt Thái', en: 'Thai-Style Morning Glory Salad' },
      ingredients: { vi: 'Rau muống, xoài xanh, cà rốt, cóc non, rau thơm, sốt chua ngọt kiểu Thái', en: 'Morning glory, green mango, carrot, young ambarella, fresh herbs, Thai-style dressing' },
      price: '145.000',
    },
    {
      id: 'salad-cu-dau-dua-non-ben-tre',
      name: { vi: 'Salad Củ Đậu Dừa Non Bến Tre', en: 'Jicama & Bến Tre Young Coconut Salad' },
      ingredients: { vi: 'Củ đậu, dừa non, nấm tuyết, vừng trắng, vừng đen, sốt chua ngọt, rau thơm', en: 'Jicama, fresh coconut, snow fungus, sesame, sweet & sour dressing' },
      price: '145.000',
      region: 'Bến Tre',
    },
    {
      id: 'dau-hu-non-sot-gac-miso',
      name: { vi: 'Đậu Hũ Non Sốt Gấc Miso', en: 'Silken Tofu with Gấc & Miso Sauce' },
      ingredients: { vi: 'Đậu non, sốt gấc, sốt miso, đậu lông Nhật, gia vị chay', en: 'Silken tofu, gấc sauce, miso sauce, edamame, plant-based seasonings' },
      price: '145.000',
      isSignature: true,
    },
    {
      id: 'nam-hap-xa-que',
      name: { vi: 'Nấm Hấp Xả Quê', en: 'Hometown-Style Steamed Mushroom with Lemongrass' },
      ingredients: { vi: 'Nấm bào ngư, xả, gừng tươi, ớt, lá chanh, nước mắm chay, chanh, quất', en: 'Abalone mushrooms, lemongrass, fresh herbs, chili, lime leaves, vegetarian fish sauce, lemon, kumquat' },
      price: '145.000',
    },
    {
      id: 'nam-chau-thanh-rang-muoi',
      name: { vi: 'Nấm Châu Thành Rang Muối', en: 'Salt-Roasted Châu Thành Mushroom' },
      ingredients: { vi: 'Nấm bào ngư, bột chiên giòn, lá chanh, muối hồng, dầu ăn, gia vị chay', en: 'Abalone mushrooms, fried flour, lime leaves, pink salt, cooking oil, vegetarian spices' },
      price: '145.000',
      region: 'Châu Thành',
    },
    {
      id: 'banh-da-lang-ke-xuc-nam',
      name: { vi: 'Bánh Đa Làng Kế Xúc Nấm Đậu', en: 'Kế Village Crispy Rice Paper with Mushroom & Tofu' },
      ingredients: { vi: 'Bánh đa làng Kế, đậu phụ, nấm, hành răm, gia vị chay', en: 'Làng Kế crispy rice paper, tofu, mushrooms, rice paddy herb, vegan seasoning' },
      price: '145.000',
      region: 'Bắc Giang',
    },
    {
      id: 'dau-non-chien-vung-sot-ponzu',
      name: { vi: 'Đậu Non Chiên Vừng Sốt Ponzu', en: 'Sesame-Crusted Silken Tofu with Ponzu Sauce' },
      ingredients: { vi: 'Đậu non, vừng, sốt ponzu, gia vị thuần chay', en: 'Silken tofu, sesame, ponzu sauce, vegan seasoning' },
      price: '105.000',
    },
    {
      id: 'dau-tam-hanh-cho-gao',
      name: { vi: 'Đậu Tẩm Hành Chợ Gạo', en: '"Chợ Gạo" Fried Tofu with Onion Sauce' },
      ingredients: { vi: 'Đậu mơ, hành tươi, gia vị chay, dầu ăn chay', en: 'Tofu, fresh onions, vegetarian spices, vegetarian cooking oil' },
      price: '105.000',
      region: 'Hà Nội',
    },
    {
      id: 'ca-tim-vu-xuan-chien-la-lot',
      name: { vi: 'Cà Tím Vụ Xuân Chiên Lá Lốt', en: 'Fried Spring Eggplant with Lá Lốt Leaves' },
      ingredients: { vi: 'Cà tím, bột mì, gia vị chay, lá lốt, chiên với dầu ăn chay', en: 'Eggplant, flour, vegetarian spices, lolot leaves, fried with vegan oil' },
      price: '145.000',
    },
    {
      id: 'nem-rong-bien-cuon-nam-dui-ga',
      isChef: true,
      name: { vi: 'Nem Rong Biển Cuộn Nấm Đùi Gà', en: 'King Oyster Mushroom with Seaweed Rolls' },
      ingredients: { vi: 'Rong biển khô, nấm đùi gà, bột chiên giòn, gia vị chay', en: 'Dried seaweed leaves, king oyster mushrooms, fried flour, vegan spices' },
      price: '95.000',
    },
    {
      id: 'rong-bien-tam-me-an-giang',
      name: { vi: 'Rong Biển Tẩm Mè An Giang', en: 'An Giang Sesame-Marinated Seaweed' },
      ingredients: { vi: 'Rong biển khô, mè vàng An Giang, gia vị chay', en: 'Dried seaweed, An Giang yellow sesame, vegan spices' },
      price: '95.000',
      region: 'An Giang',
    },
    {
      id: 'com-chay-ninh-binh-sot-nam',
      name: { vi: 'Cơm Cháy Ninh Bình Sốt Nấm', en: 'Ninh Bình Crispy Rice with Mushroom Sauce' },
      ingredients: { vi: 'Cơm cháy Ninh Bình, các loại nấm, gia vị chay, bột năng', en: 'Ninh Bình crispy rice, mushrooms, vegan spices, tapioca starch' },
      price: '145.000',
      region: 'Ninh Bình',
    },
    {
      id: 'banh-my-pate-ha-noi',
      name: { vi: 'Bánh Mỳ Pate Hà Nội', en: 'Hanoi Bánh Mì' },
      ingredients: { vi: 'Bánh mì gạo, pate chay, nấm áp chảo, giò chay, tempe đậu gà, tương ớt nhà làm, dưa chua, rau mùi, rau thơm, gia vị chay', en: 'Rice baguette, vegan pâté, sautéed mushrooms, vegan ham, chickpea tempeh, house-made chili sauce, pickled vegetables, cilantro, fresh herbs, vegan seasonings' },
      price: '155.000',
      region: 'Hà Nội',
    },
    {
      id: 'ngo-bung-tay-bac',
      name: { vi: 'Ngô Bung Tây Bắc', en: 'Tây Bắc Corn Stew' },
      ingredients: { vi: 'Ngô nếp nương, hành lá, gia vị thuần chay', en: 'Mountain sticky corn, spring onion, vegan seasoning' },
      price: '145.000',
      region: 'Tây Bắc',
    },
    {
      id: 'sashimi-cu-den-sot-ponzu',
      name: { vi: 'Sashimi Củ Dền Sốt Ponzu', en: 'Beetroot "Sashimi" with Yuzu Ponzu' },
      ingredients: { vi: 'Củ dền, gừng, xì dầu, chanh, lá mầm cải, vừng trắng', en: 'Beetroot, ginger, soy sauce, lime, mustard microgreens, white sesame' },
      price: '125.000',
    },
    {
      id: 'tempe-om-chuoi-dau',
      name: { vi: 'Tempe Om Chuối Đậu', en: 'Tempeh with Banana & Tofu Stew' },
      ingredients: { vi: 'Tempe đậu gà, chuối xanh, đậu nướng, lá lốt, sốt mẻ', en: 'Tempeh, green banana, baked beans, betel leaves, fermented rice dressing (mẻ sauce)' },
      price: '145.000',
    },
    {
      id: 'tempura-nha-que',
      name: { vi: 'Tempura "Nhà Quê"', en: '"Nhà Quê" Tempura' },
      ingredients: { vi: 'Rau muống, củ sen, cà tím, đậu nhót', en: 'Morning glory, veggie lotus root, sweet potato, seasonal vegetables, flour, vegan spices' },
      price: '165.000',
    },
    {
      id: 'nam-dui-ga-sot-hat-dieu',
      name: { vi: 'Nấm Đùi Gà Sốt Hạt Điều', en: 'King Oyster Mushroom with Cashew Sauce' },
      ingredients: { vi: 'Nấm đùi gà, bột mì chiên giòn, hạt điều, gia vị chay', en: 'King oyster mushroom, crispy flour, cashew nuts, vegan seasoning' },
      price: '125.000',
    },
    {
      id: 'snacks-cu-sen-quang-ba',
      name: { vi: 'Snacks Củ Sen Quảng Bá', en: 'Quảng Bá Lotus Root Chips' },
      ingredients: { vi: 'Củ sen tươi, bánh gạo, gia vị chay', en: 'Fresh lotus root, rice cakes, vegan seasonings' },
      price: '95.000',
      region: 'Quảng Bá, Hà Nội',
    },
    {
      id: 'banh-jeon-rau-cu',
      name: { vi: 'Bánh Jeon Rau Củ', en: 'Veggie Jeon Pancake' },
      ingredients: { vi: 'Rau củ theo mùa, bột mì, hành lá, gia vị chay', en: 'Seasonal vegetables, wheat flour, spring onion, vegan seasoning' },
      price: '125.000',
    },
    {
      id: 'banh-khoai-muong-khuong-sot-dau-xi',
      isSpecial: true,
      name: { vi: 'Bánh Khoải Mường Khương Sốt Đậu Xị', en: 'Mường Khương Rice Cake with Fermented Bean Sauce' },
      ingredients: { vi: 'Bánh khoải Mường Khương, nấm tươi, đậu xị, chẩm chéo, gia vị chay', en: 'Mường Khương khoải cake, fresh mushrooms, fermented bean paste, chẳm chéo, vegetarian spices' },
      price: '165.000',
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
    vi: '"Bát Ô Tô" là cách gọi vui rất quen thuộc ngày xưa cho những tô cơm thật to với đầy ắp món ăn bên trên. Tại Dāna, BÁT Ô TÔ là những món ăn chính đầy hương vị như thế — với khẩu phần lớn hơn, nhiều topping hơn và mang đến cảm giác thật trọn vẹn trong mỗi bữa ăn.',
    en: '"Bát" means bowl. "Ô tô" means car — a playful, very Vietnamese way of describing those extra-large rice bowls loaded with delicious toppings. At Dāna, Bát Ô Tô are flavorful main dishes served in generous portions, with more toppings, more flavors, and the feeling of a truly fulfilling meal.',
  },
  items: [
    {
      id: 'nem-banh-chung-bun-la-tu-ky',
      name: { vi: 'Nem Bánh Chưng Bún Lá Tứ Kỳ', en: 'Bánh Chưng Spring Rolls & Tứ Kỳ Vermicelli' },
      ingredients: { vi: 'Đậu phụ, miến, mộc nhĩ, bún lá, nước chấm chay, rau sống. Thêm chả rong biển nướng 30.000đ/2 miếng', en: 'Tofu, vermicelli, wood ear, noodle, vegetarian dipping sauce, raw vegetables. Add grilled seaweed patties 30.000đ / 2 pieces' },
      price: '185.000',
      isSignature: true,
    },
    {
      id: 'gnocchi-ca-ri',
      name: { vi: 'Gnocchi Cà Ri', en: 'Curry Gnocchi' },
      ingredients: { vi: 'Ngô bao tử, bánh khoai tây, cà rốt, sốt cà ri, ớt', en: 'Baby corn, potato, carrots, curry sauce, chili' },
      price: '215.000',
      isSignature: true,
    },
    {
      id: 'pho-ap-chao-hang-buom',
      name: { vi: 'Phở Áp Chảo Hàng Buồm', en: 'Hàng Buồm Pan-Fried Phở' },
      ingredients: { vi: 'Bánh phở, nấm, đậu phụ, cần tây, hành tây, rau theo mùa, gia vị thuần chay', en: 'Rice noodles, mushrooms, celery, onion, seasonal vegetables, vegan seasoning' },
      price: '165.000',
      region: 'Hà Nội',
    },
    {
      id: 'bun-nam-dam-bong-ha-noi',
      name: { vi: 'Bún Nấm Dấm Bỗng Hà Nội', en: 'Noodles with Hanoi Fermented Rice Vinegar' },
      ingredients: { vi: 'Đậu phụ, bún, giò chay, nấm sò đen (tím), rau sống, hành lá, tía tô, nước dùng', en: 'Tofu, rice noodle, vegan sausage, mushroom, raw vegetables, onions, perilla' },
      price: '145.000',
      region: 'Hà Nội',
    },
    {
      id: 'mien-tron-seoul',
      name: { vi: 'Miến Trộn Seoul', en: 'Seoul Mixed Glass Noodles' },
      ingredients: { vi: 'Miến Hàn Quốc, tảo xoắn Chi Lê, đậu phụ, rau theo mùa, dầu mè, gia vị thuần chay', en: 'Korean glass noodles, Chilean seaweed, tofu, seasonal vegetables, sesame oil, vegan seasoning' },
      price: '165.000',
    },
    {
      id: 'pho-ganh-ha-noi',
      name: { vi: 'Phở Gánh Hà Nội', en: 'Vegan "Phở Gánh" Hà Nội' },
      ingredients: { vi: 'Phở gạo, nước dùng củ quả, nấm, hành, quế, hồi', en: 'Fresh rice paper noodle, mushroom, vegan soup, herbs' },
      price: '145.000',
      region: 'Hà Nội',
    },
    {
      id: 'mi-ramen-miso-nam',
      name: { vi: 'Mì Ramen Miso Nấm', en: 'Mushroom Miso Ramen' },
      ingredients: { vi: 'Nước dùng từ nấm và các loại rau củ theo mùa, miso Nhật, mì, gia vị thuần chay', en: 'Mushroom and seasonal vegetable broth, Japanese miso, noodles and vegan seasonings' },
      price: '165.000',
    },
    {
      id: 'bi-do-bo-lo-sot-toi-den-ly-son',
      isChef: true,
      name: { vi: 'Bí Đỏ Bỏ Lò Sốt Tỏi Đen Lý Sơn', en: 'Oven-Baked Pumpkin with Lý Sơn Black Garlic Sauce' },
      ingredients: { vi: 'Bí đỏ, sốt tỏi đen, mầm cải, nấm hương tươi, nấm đùi gà, gia vị (nướng)', en: 'Pumpkin, black garlic sauce, mustard sprouts, mushrooms, grilling seasoning' },
      price: '245.000',
      region: 'Lý Sơn, Quảng Ngãi',
    },
    {
      id: 'burger-com-nam',
      isSpecial: true,
      name: { vi: 'Burger Cơm Nắm', en: '"Cơm Nắm" Burger' },
      ingredients: { vi: 'Cơm nếp, nấm đùi gà, cà chua, xà lách, gia vị chay', en: 'Sticky rice, mushrooms, tomatoes, lettuce, vegetarian spices' },
      price: '185.000',
    },
    {
      id: 'nam-hau-thu-sot-ruou-vang',
      isChef: true,
      name: { vi: 'Nấm Hầu Thủ Sốt Rượu Vang', en: "Lion's Mane Mushroom with Wine Sauce" },
      ingredients: { vi: 'Nấm hầu thủ, gia vị chay, rượu vang đỏ', en: "Lion's mane mushroom, vegan seasoning, red wine" },
      price: '285.000',
    },
    {
      id: 'nam-ap-chao-sot-chanh-leo-gia-lai',
      name: { vi: 'Nấm Áp Chảo Sốt Chanh Leo Gia Lai', en: 'Pan-Fried Mushrooms with Passion Fruit Sauce' },
      ingredients: { vi: 'Nấm đùi gà, cà chua, mầm cải, sốt chanh leo', en: 'King oyster mushroom, vegan seasoning, passion fruit sauce' },
      price: '285.000',
      region: 'Gia Lai',
    },
    {
      id: 'cu-den-nuong-sot-hat-dieu-binh-phuoc',
      isChef: true,
      name: { vi: 'Củ Dền Nướng Sốt Hạt Điều Bình Phước', en: 'Grilled Beetroot with Bình Phước Cashew Sauce' },
      ingredients: { vi: 'Củ dền, cơm sèng cù, sốt hạt điều, gia vị nướng', en: 'Beetroot, cooked rice, cashew sauce, grilling seasoning' },
      price: '285.000',
      region: 'Bình Phước',
    },
    {
      id: 'dana-pizza',
      name: { vi: 'Dāna Pizza', en: 'Dāna Pizza' },
      ingredients: { vi: 'Củ dền, ngô hạt, sốt đậu đỏ, pho mai chay, cỏ thơm, đế bánh đa, gia vị chay', en: 'Beetroot, corn kernels, red bean sauce, vegetarian cheese, fragrant grass, rice cracker paper, vegan seasoning' },
      price: '215.000',
      isSignature: true,
    },
    {
      id: 'dau-ga-ap-chao-sot-me-tay-ninh',
      name: { vi: 'Đậu Gà Áp Chảo Sốt Me Tây Ninh', en: 'Pan-Seared Chickpea Cakes with Tamarind Glaze' },
      ingredients: { vi: 'Đậu gà, me Tây Ninh, cà rốt, rau theo mùa, gừng, gia vị thuần thực vật', en: 'Chickpeas, Tây Ninh tamarind, carrot purée, seasonal vegetables, ginger, vegan seasoning' },
      price: '285.000',
      region: 'Tây Ninh',
    },
    {
      id: 'nam-vien-chien-sot-mala-hat-dieu',
      name: { vi: 'Nấm Viên Chiên Sốt Mala Hạt Điều', en: 'Crispy Mushroom Balls with Mala Cashew Sauce' },
      ingredients: { vi: 'Nấm đùi gà, nấm bào ngư, ớt Tứ Xuyên, hạt điều. Ăn kèm bánh mì rau củ hoặc mỳ rau củ', en: 'King oyster mushroom, oyster mushroom, Sichuan pepper, cashews; served with rice baguette or vegetable noodles' },
      price: '285.000',
    },
    {
      id: 'steak-sup-lo-nuong',
      name: { vi: '"Steak" Súp Lơ Nướng', en: 'Roasted Cauliflower "Steak"' },
      ingredients: { vi: 'Súp lơ trắng, nấm đầu khỉ, củ dền, đậu gà, rau thơm, sốt rượu vang, gia vị chay', en: "Cauliflower, lion's mane mushroom, beetroot, chickpeas, fresh herbs, red wine sauce, vegan seasoning" },
      price: '315.000',
    },
    // — Hidden: not on the current menu, kept for reuse
    {
      id: 'nam-tha-thinh-nam-dinh',
      hidden: true,
      name: { vi: 'Nấm "Thả Thính" Nam Định', en: 'Nam Định "Roasted Rice Flour" Mushrooms' },
      ingredients: { vi: 'Nấm, thính gạo, lá sung, gia vị chay', en: 'Mushrooms, toasted rice flour (thính), fig leaf, vegan seasoning' },
      price: '105.000',
      region: 'Nam Định',
    },
    {
      id: 'nam-dui-ga-sot-ruou-vang',
      hidden: true,
      name: { vi: 'Nấm Đùi Gà Sốt Rượu Vang', en: 'King Oyster Mushroom in Red Wine Sauce' },
      ingredients: { vi: 'Nấm đùi gà, gia vị chay, rượu vang đỏ', en: 'King oyster mushroom, vegan seasoning, red wine' },
      price: '185.000',
      isSignature: true,
    },
  ],
}

// ─── THỐ BA MIỀN — SIGNATURE CLAYPOT RICE ────────────────────────────────────
export const thoBaMien: MenuCategory = {
  id: 'tho-ba-mien',
  name: { vi: 'Thố Ba Miền', en: 'Signature Claypot Rice' },
  subtitle: { vi: 'Cơm thố ba miền', en: 'Claypot rice of three regions' },
  description: {
    vi: 'Một bữa cơm Việt thu nhỏ trong chiếc thố đất nóng — đủ cơm dẻo, món om, món kho, rau theo mùa, dưa chua và bát canh ấm. Từ Bắc Bộ mộc mạc, Huế thanh tao đến Nam Bộ phóng khoáng, mỗi thố cơm là một cách Dāna kể lại hương vị ba miền bằng tinh thần thuần thực vật.',
    en: 'A miniature Vietnamese meal served in a warm claypot — with fragrant rice, slow-simmered dishes, braised specialties, seasonal greens, pickles and a comforting bowl of soup. From the rustic North and refined Huế to the generous South, each claypot retells the flavors of Vietnam.',
  },
  items: [
    {
      id: 'tho-com-bac',
      name: { vi: 'Thố Cơm Bắc', en: 'Northern Vietnamese Claypot Rice' },
      ingredients: { vi: 'Om chuối đậu, tempe áp chảo, nem Hải Phòng, rau theo mùa xào, rau củ ngâm chua ngọt, canh theo mùa, cơm gạo nứt hoặc cơm nấm', en: 'Banana & tofu stew, pan-seared tempeh, Hải Phòng vegan spring roll, seasonal stir-fried veggie, pickles, seasonal soup, brown rice or mushroom rice' },
      price: '215.000',
    },
    {
      id: 'tho-com-hue',
      name: { vi: 'Thố Cơm Huế', en: 'Huế Claypot Rice' },
      ingredients: { vi: 'Mít non kho, rau trong vườn hấp, tempe kho tiêu, đậu chiên giòn, rau củ ngâm chua ngọt, canh theo mùa, cơm gạo nứt hoặc cơm nấm', en: 'Braised young jackfruit, steamed garden vegetables, black pepper braised tempeh, crispy fried tofu, pickled seasonal vegetables, seasonal soup, brown rice or mushroom rice' },
      price: '215.000',
      region: 'Huế',
    },
    {
      id: 'tho-com-nam-bo',
      name: { vi: 'Thố Cơm Nam Bộ', en: 'Southern Vietnamese Claypot Rice' },
      ingredients: { vi: 'Cà tím kho tộ, sake chiên giòn, nấm xào dứa, cà ri nấm nước cốt dừa, rau củ ngâm chua ngọt, canh chua Nam Bộ, cơm gạo nứt hoặc cơm nấm', en: 'Claypot braised eggplant, crispy fried breadfruit, stir-fried mushrooms with pineapple, mushroom curry with coconut milk, pickled seasonal vegetables, Southern sour soup, brown rice or mushroom rice' },
      price: '215.000',
    },
  ],
}

// ─── MÂM — TO SHARE ──────────────────────────────────────────────────────────
export const mam: MenuCategory = {
  id: 'mam',
  name: { vi: 'Mâm', en: 'To Share' },
  subtitle: { vi: 'Cùng nhau sum vầy', en: 'Shared table' },
  description: {
    vi: 'Trong văn hóa Việt, "mâm cơm" luôn là nơi của sự sum vầy và sẻ chia. Tại Dāna, những món To Share hay "Mâm" được tạo ra với đúng tinh thần ấy — để bữa ăn trở nên ấm áp, vui vẻ và đáng nhớ hơn khi được sẻ chia cùng nhau.',
    en: '"Mâm" means tray. "Cơm" means rice. A Mâm Cơm is a shared tray where family and friends gather together, share dishes, talk, and enjoy food around the same table. At Dāna, our To Share dishes are created in that same spirit.',
  },
  items: [
    {
      id: 'set-cuon-tam-vi',
      name: { vi: 'Sét Cuốn Tam Vị', en: 'Three-Flavor Roll Platter' },
      ingredients: { vi: 'Rau xà lách, cà rốt, củ đậu, dưa chuột, nấm, đậu phụ, rong biển; sốt dứa, nước mắm chay, sốt mè đen', en: 'Lettuce, carrot, jicama, cucumber, mushrooms, tofu, seaweed; served with pineapple sauce, vegan fish sauce & black sesame sauce' },
      price: '155.000',
    },
    {
      id: 'banh-xeo-mien-tay',
      name: { vi: 'Bánh Xèo Miền Tây', en: 'Mekong Delta Bánh Xèo Crepes' },
      ingredients: { vi: 'Bột bánh xèo, giá đỗ, nấm, rau thơm, nước chấm chua ngọt', en: 'Rice flour crepe, bean sprouts, mushrooms, fresh herbs, sweet & sour dipping sauce' },
      price: '195.000',
      region: 'Miền Tây',
    },
    {
      id: 'nam-loc-nhung-khe-chua',
      isSpecial: true,
      name: { vi: 'Nấm Lộc Nhung Khế Chua', en: 'Mountain Mushrooms with Star Fruits' },
      ingredients: { vi: 'Nấm lộc nhung, khế chua, ngổ, vừng, tương bần, gia vị chay', en: 'Cortinarius praestans mushroom, star fruits, sesame' },
      price: '235.000',
      region: 'Lào Cai',
    },
    {
      id: 'nam-om-tieu-xanh-phu-quoc',
      name: { vi: 'Nấm Om Tiêu Xanh Phú Quốc', en: 'Braised Mushroom with Phú Quốc Green Pepper' },
      ingredients: { vi: 'Nấm đùi gà, tiêu xanh Phú Quốc, gia vị chay', en: 'Mushrooms, Phú Quốc green pepper, vegan seasoning' },
      price: '185.000',
      isSignature: true,
      region: 'Phú Quốc',
    },
    {
      id: 'rau-ha-noi-xao-theo-mua',
      name: { vi: 'Rau Hà Nội Xào Theo Mùa', en: 'Stir-Fried Seasonal Hanoi Vegetables' },
      ingredients: { vi: 'Rau theo mùa, nấm hương, gia vị chay', en: 'Seasonal vegetables, mushrooms, vegan seasoning' },
      price: '165.000',
      region: 'Hà Nội',
    },
    {
      id: 'rau-trong-vuon-hap-cham-kho-quet',
      name: { vi: 'Rau Trong Vườn Hấp, Chấm Kho Quẹt', en: 'Steamed Garden Veggie with "Kho Quẹt" Sauce' },
      ingredients: { vi: 'Bí ngòi xanh, bí ngòi vàng, củ cải, ngô bao tử, cà rốt, kho quẹt chay', en: 'Green zucchini, yellow zucchini, radish, baby corn, carrots, vegan caramelized dip sauce' },
      price: '165.000',
      isSignature: true,
    },
    {
      id: 'tao-bien-cochayuyo-xao-xa-ot',
      name: { vi: 'Tảo Biển Cochayuyo Xào Xả Ớt', en: 'Stir-Fried Cochayuyo Seaweed with Lemongrass & Chili' },
      ingredients: { vi: 'Tảo Chile, xả, ớt, gia vị chay', en: 'Chilean seaweed, vegan seasoning, lemongrass' },
      price: '185.000',
    },
    {
      id: 'com-seng-cu-bao-cap',
      isChef: true,
      name: { vi: 'Cơm Séng Cù "Bao Cấp"', en: '"Bao Cấp" Styled Steamed Rice' },
      ingredients: { vi: 'Gạo Séng Cù, gạo lứt, hạt kê, ngô hạt', en: 'Séng Cù rice, brown rice, millet, corn' },
      price: '165.000',
      region: 'Lào Cai',
    },
    {
      id: 'canh-chua-nam-bo',
      name: { vi: 'Canh Chua Nam Bộ', en: 'Southern-Style Sour Soup' },
      ingredients: { vi: 'Nấm các loại, cà tím, giá đỗ, dứa, đậu nhót, nước dùng, gia vị chay', en: 'Mushrooms, tomatoes, bean sprouts, pineapple, okra, vegetable broth, vegan seasonings' },
      price: '135.000',
    },
    {
      id: 'canh-nam-hat-sen-hue',
      name: { vi: 'Canh Nấm Hạt Sen Huế', en: 'Huế Mushroom & Lotus Seed Soup' },
      ingredients: { vi: 'Nấm các loại, cà chua, nước dùng, gia vị chay, hạt sen Huế', en: 'Mushrooms, tomato, lemon, water, vegan seasoning, Huế lotus seeds' },
      price: '135.000',
      region: 'Huế',
    },
    {
      id: 'nam-sot-vang-ha-noi',
      name: { vi: 'Nấm Sốt Vang Hà Nội', en: 'Mushroom with Hanoi-Style Wine Stew' },
      ingredients: { vi: 'Nấm đầu khỉ, nấm đùi gà, cà rốt, khoai tây, rượu vang', en: 'Mushroom, red wine sauce, carrot, potato' },
      price: '185.000',
      region: 'Hà Nội',
    },
    {
      id: 'ca-tim-kho-to-nam-bo',
      name: { vi: 'Cà Tím Kho Tộ Nam Bộ', en: 'Southern Clay Pot Braised Eggplant' },
      ingredients: { vi: 'Cà tím, gừng, xả, gia vị chay', en: 'Eggplant, galangal, lemongrass, vegan seasonings' },
      price: '185.000',
      isSignature: true,
    },
    {
      id: 'cha-nam-la-vong',
      name: { vi: 'Chả Nấm Lã Vọng', en: 'Lã Vọng Grilled Mushrooms' },
      ingredients: { vi: 'Nấm hầu thủ, lạc, thì là, hành lá, rau thơm các loại, nước chấm chua ngọt', en: "Lion's mane mushroom, peanuts, dill, spring onion, mixed fresh herbs, sweet and sour dipping sauce" },
      price: '265.000',
      isSignature: true,
      region: 'Hà Nội',
    },
    {
      id: 'com-nieu-dana',
      name: { vi: 'Cơm Niêu Dāna', en: 'Dāna Rice Claypot' },
      ingredients: { vi: 'Gạo tám thơm, nấm, hạt sen', en: 'Rice, mushroom, lotus seeds, soy sauce, white sesame seeds' },
      price: '185.000',
      isSignature: true,
    },
    {
      id: 'lau-bong',
      name: { vi: 'Lẩu Bỗng', en: 'Bỗng Hotpot' },
      ingredients: { vi: 'Dấm bỗng, các loại nấm, tảo xoắn, đậu phụ, các loại rau theo mùa', en: 'Tofu, rice noodle, vegan sausage, mushroom, seasonal vegetables, rice vinegar' },
      price: '399.000',
      region: 'Hà Nội',
    },
    {
      id: 'lau-thai',
      name: { vi: 'Lẩu Thái', en: 'Thai Hotpot' },
      ingredients: { vi: 'Nước lẩu cốt Thái, các loại nấm, đậu phụ, các loại rau theo mùa', en: 'Tofu, rice noodle, vegan sausage, mushroom, seasonal veggie' },
      price: '399.000',
    },
    {
      id: 'lau-thuoc-bac',
      name: { vi: 'Lẩu Thuốc Bắc', en: 'Herbal Hotpot' },
      ingredients: { vi: 'Táo đỏ, kì tử, ý dĩ, cam thảo, đẳng sâm, hoàng kỳ, đương quy, hoài sơn, các loại nấm, đậu phụ, các loại rau theo mùa', en: "Red dates, goji berries, Job's tears, licorice root, codonopsis root, astragalus root, angelica root, Chinese yam, assorted mushrooms, tofu, seasonal veggie" },
      price: '489.000',
    },
  ],
}

// ─── ĐŨA CẢ — EXTRAS ─────────────────────────────────────────────────────────
export const duaCa: MenuCategory = {
  id: 'dua-ca',
  name: { vi: 'Đũa Cả', en: 'Extras' },
  subtitle: { vi: 'Thêm vào cho đủ đầy', en: 'Add-ons to complete your meal' },
  description: {
    vi: '"Đũa Cả" là đôi đũa lớn quen thuộc trong những bữa cơm Việt xưa — dùng để xới cơm, gắp thức ăn và sẻ chia cho cả mâm cơm gia đình. Ở Dāna, "Đũa Cả" cũng mang tinh thần như thế — những món ăn thêm nhỏ nhưng thú vị, để bữa ăn trở nên đầy đặn, trọn vẹn và vui hơn khi thưởng thức cùng nhau.',
    en: '"Đũa" means chopsticks. "Cả" means large. In Vietnamese family meals, "Đũa Cả" are the large chopsticks traditionally used to scoop rice from the pot and serve everyone at the table. At Dāna, they are the little extra dishes that make the meal feel more fulfilling.',
  },
  items: [
    {
      id: 'xoi-ngu-sac-dong-van',
      name: { vi: 'Xôi Ngũ Sắc Đồng Văn', en: 'Đồng Văn Five-Color Sticky Rice' },
      ingredients: { vi: 'Gạo nếp nương, màu tự nhiên, muối vừng', en: 'Highland sticky rice, natural color, sesame salt' },
      price: '95.000',
      region: 'Đồng Văn, Hà Giang',
    },
    {
      id: 'com-lam-cao-bang',
      name: { vi: 'Cơm Lam Cao Bằng', en: 'Cao Bằng Rice in Bamboo Tubes' },
      ingredients: { vi: 'Gạo nếp nương, lạc, ống nứa, muối vừng', en: 'Highland sticky rice, bamboo tubes, sesame salt' },
      price: '95.000',
      region: 'Cao Bằng',
    },
    {
      id: 'banh-mi',
      name: { vi: 'Bánh Mì', en: 'Rice Bread' },
      ingredients: { vi: 'Bột gạo, gluten-free', en: 'Rice flour, gluten-free' },
      price: '25.000',
    },
    {
      id: 'com-nieu-gao-soc-trang',
      name: { vi: 'Cơm Niêu Gạo Sóc Trăng', en: 'Sóc Trăng ST25 Steamed Rice' },
      ingredients: { vi: 'Gạo ST25, lá nếp thơm', en: 'ST25 rice, pandan leaf' },
      price: '40.000',
      region: 'Sóc Trăng',
    },
    {
      id: 'banh-da-lang-ke',
      name: { vi: 'Bánh Đa Làng Kế', en: 'Kế Village Crispy Rice Paper' },
      ingredients: { vi: 'Gạo, vừng lạc, khoai lang và cơm trắng', en: 'Rice, peanuts, sesame' },
      price: '25.000',
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
    en: 'Dessert is the sweet ending of a meal. Let our "sweet spoon" make you happy!',
  },
  items: [
    {
      id: 'banh-flan-bi-do-dana',
      name: { vi: 'Bánh Flan Bí Đỏ Dāna', en: 'Dāna Pumpkin Flan' },
      ingredients: { vi: 'Bí đỏ, sữa hạt điều, phô mai hạt điều', en: 'Pumpkin, cashew cheese, sugar' },
      price: '65.000',
    },
    {
      id: 'trai-cay-theo-mua',
      name: { vi: 'Trái Cây Theo Mùa', en: 'Seasonal Fruits' },
      ingredients: { vi: 'Trái cây tươi theo mùa của Việt Nam', en: 'Seasonal fresh fruits of Vietnam' },
      price: '105.000',
    },
    {
      id: 'panna-cotta-thuan-chay',
      name: { vi: 'Panna Cotta Thuần Chay', en: 'Homemade Vegan Panna Cotta' },
      ingredients: { vi: 'Sữa dừa, sữa hạt điều, gelatin', en: 'Coconut milk, cashew milk' },
      price: '65.000',
      isSignature: true,
    },
    {
      id: 'kem-pudding-gao-thai-binh',
      name: { vi: 'Kem Pudding Gạo Thái Bình', en: 'Ice Cream with Thái Bình Rice Pudding' },
      ingredients: { vi: 'Kem dừa, gạo Thái Bình, trái cây', en: 'Rice, sugar, coconut ice cream, fruits' },
      price: '95.000',
      isSignature: true,
      region: 'Thái Bình',
    },
    {
      id: 'ruou-nep-que',
      name: { vi: 'Rượu Nếp Quê', en: 'Fermented Rice Dessert' },
      ingredients: { vi: 'Gạo nếp cái hoa vàng, gạo nếp cẩm, đường', en: 'Golden flower glutinous rice, black glutinous rice, sugar' },
      price: '45.000',
    },
    {
      id: 'kem-xoai-sorbet-xi-muoi',
      name: { vi: 'Kem Xoài Sorbet Xí Muội', en: 'Fusion Mango Sorbet' },
      ingredients: { vi: 'Xoài chín, quất/chanh, muối, ô mai', en: 'Fresh mango, kumquat / lemon, plum salt' },
      price: '95.000',
      isSignature: true,
    },
    {
      id: 'che-tu-nhien',
      name: { vi: 'Chè Tự Nhiên', en: 'Natural Sweet Soup' },
      ingredients: { vi: 'Chè theo mùa từ các loại hạt, quả', en: 'A seasonal sweet soup made from nuts, beans, roots, and fruits' },
      price: '65.000',
    },
    {
      id: 'kem-chay-ruou-nep',
      name: { vi: 'Kem Cháy Rượu Nếp', en: 'Crème Brûlée with Fermented Rice' },
      ingredients: { vi: 'Flan thuần chay, đường, rượu nếp quê', en: 'Vegan flan, sugar, traditional fermented rice' },
      price: '85.000',
      isSignature: true,
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


// ─── MÂM NHÀ DANA — TASTING SETS ─────────────────────────────────────────────
// Entries with hidden: true are previous versions, kept for reuse.
const mamNhaAll: SetMenuItem[] = [
  {
    id: 'mam-me-nau',
    name: { vi: 'Mâm Cơm Mẹ Nấu', en: "Mom's Table to Share" },
    dishes: [
      'Salad Trái Cây Bốn Mùa',
      'Nấm Châu Thành Rang Muối',
      'Đậu Hũ Non Sốt Gấc & Miso',
      'Rau Trong Vườn Hấp Chấm Kho Quẹt',
      'Cà Tím Kho Tộ Nam Bộ',
      'Cơm Séng Cù Bao Cấp',
    ],
    dishesEn: [
      'Seasonal Fruits Salad',
      'Salt Roasted Châu Thành Mushroom',
      'Silken Tofu With Gấc & Miso Sauce',
      'Steamed Garden Veggie With "Kho Quẹt" Sauce',
      'Southern Clay Pot Braised Eggplant',
      '"Bao Cấp" Styled Steamed Rice',
    ],
    originalPrice: 950000,
    price: 799000,
    serves: '2–4 người / 2–4 guests',
  },
  {
    id: 'mam-bo-nau',
    name: { vi: 'Mâm Cơm Bố Nấu', en: "Daddy's Table to Share" },
    dishes: [
      'Cuốn Thính Nam Định',
      'Gỏi Rau Muống Sốt Thái',
      'Đậu Tẩm Hành Chợ Gạo',
      'Nấm Om Tiêu Xanh Phú Quốc',
      'Canh Chua Nam Bộ',
      'Cơm Niêu Dāna',
    ],
    dishesEn: [
      'Mushroom With Nam Định Powdered Grilled Rice',
      'Thai-Style Morning Glory Salad',
      '"Chợ Gạo" Fried Tofu With Onion Sauce',
      'Braised Mushroom With Phú Quốc Green Pepper',
      'Southern-Styled Sour Soup',
      'Dāna Rice Claypot',
    ],
    originalPrice: 890000,
    price: 799000,
    serves: '2–4 người / 2–4 guests',
  },
  {
    id: 'mam-bac',
    name: { vi: 'Mâm Cơm Bắc', en: 'Northern Table to Share' },
    dishes: [
      'Nộm Bờ Hồ Đổi Mới',
      'Cơm Cháy Ninh Bình Sốt Nấm',
      'Nấm Hấp Xả Quê',
      'Nem Bánh Chưng Bún Lá Tứ Kỳ',
      'Rau Hà Nội Xào Theo Mùa',
      'Nấm Sốt Vang Hà Nội',
      'Cơm Séng Cù Bao Cấp',
    ],
    dishesEn: [
      'The New "Bờ Hồ" Salad',
      'Ninh Bình Crispy Rice With Mushroom Sauce',
      'Hometown-Styled Steamed Mushroom With Lemongrass',
      'Bánh Chưng Spring Rolls & Tứ Kỳ Vermicelli',
      'Stir-Fried Seasonal Hanoi Vegetables',
      'Mushroom With Hanoi Styled Wine Stew',
      '"Bao Cấp" Styled Steamed Rice',
    ],
    originalPrice: 1115000,
    price: 999000,
    serves: '2–4 người / 2–4 guests',
  },
  {
    id: 'mam-nam',
    name: { vi: 'Mâm Cơm Nam', en: 'Southern Table to Share' },
    dishes: [
      'Salad Củ Đậu & Dừa Non Bến Tre',
      'Bánh Xèo Miền Tây',
      'Nấm Châu Thành Rang Muối',
      'Tảo Biển Cochayuyo Xào Xả Ớt',
      'Cà Tím Kho Tộ Nam Bộ',
      'Canh Chua Nam Bộ',
      'Cơm Trắng',
    ],
    dishesEn: [
      'Jicama & Bến Tre Young Coconut Salad',
      'Mekong Delta Bánh Xèo Crepes',
      'Salt Roasted Châu Thành Mushroom',
      'Stir-Fried Cochayuyo Seaweed With Lemongrass & Chili',
      'Southern Clay Pot Braised Eggplant',
      'Southern-Styled Sour Soup',
      'Steamed Rice',
    ],
    originalPrice: 1030000,
    price: 925000,
    serves: '2–4 người / 2–4 guests',
  },
  {
    id: 'mam-tay-bac',
    name: { vi: 'Mâm Cơm Tây Bắc', en: 'Northern Highlands Table to Share' },
    dishes: [
      'Salad Rau Củ Mộc Châu Nướng',
      'Ngô Bung Tây Bắc',
      'Bánh Khoải Mường Khương Sốt Đậu Xị',
      'Xôi Ngũ Sắc Đồng Văn',
      'Rau Trong Vườn Hấp Chấm Kho Quẹt',
      'Tảo Cochayuyo Xào Xả Ớt',
      'Canh Nấm Hạt Sen',
      'Cơm Niêu Dāna',
    ],
    dishesEn: [
      'Grilled Mộc Châu Vegetables Salad',
      'Tây Bắc Corn Stew',
      'Mường Khương Rice Cake With Fermented Bean Sauce',
      'Đồng Văn Five-Color Sticky Rice',
      'Steamed Garden Veggie With "Kho Quẹt" Sauce',
      'Stir-Fried Cochayuyo Seaweed With Lemongrass & Chili',
      'Mushroom And Lotus Seeds Soup',
      'Dāna Rice Claypot',
    ],
    originalPrice: 1240000,
    price: 1050000,
    serves: '2–4 người / 2–4 guests',
  },
  {
    id: 'mam-tay-ta',
    name: { vi: 'Mâm Cơm Tây Ta', en: 'Tây-Ta Table to Share' },
    dishes: [
      'Salad Rocket Địa Trung Hải',
      'Tempe Om Chuối Đậu',
      'Đậu Hũ Non Sốt Gấc & Miso',
      'Gnocchi Cà Ri',
      'Nấm Viên Chiên Sốt Mala Hạt Điều',
      'Dāna Pizza',
      'Canh Chua Nam Bộ',
      'Cơm Niêu Dāna',
    ],
    dishesEn: [
      'Mediterranean Rocket Salad',
      'Tempeh With Banana & Tofu Stew',
      'Silken Tofu With Gấc & Miso Sauce',
      'Curry Gnocchi',
      'Crispy Mushroom Balls With Mala Cashew Sauce',
      'Dāna Pizza',
      'Southern-Styled Sour Soup',
      'Dāna Rice Claypot',
    ],
    originalPrice: 1490000,
    price: 1250000,
    serves: '2–4 người / 2–4 guests',
  },
  // — Hidden: previous versions of the sets
  {
    id: 'mam-me-nau-prev',
    hidden: true,
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
    id: 'mam-bac-prev',
    hidden: true,
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
    id: 'mam-tay-bac-prev',
    hidden: true,
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
    id: 'mam-bo-nau-prev',
    hidden: true,
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
    id: 'mam-nam-prev',
    hidden: true,
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
    id: 'mam-tay-ta-prev',
    hidden: true,
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

// Hidden items/sets stay in the data above but are filtered out of what the site renders.
const live = (c: MenuCategory): MenuCategory => ({ ...c, items: c.items.filter(i => !i.hidden) })
export const mamNha = mamNhaAll.filter(s => !s.hidden)

// ─── ALL CATEGORIES (ordered for menu page) ──────────────────────────────────
export const allCategories: MenuCategory[] = [
  batCon,
  batOTo,
  thoBaMien,
  mam,
  duaCa,
  thiaNgot,
  giaiKhat,
].map(live)

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

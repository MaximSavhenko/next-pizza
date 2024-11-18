export const categories = [
  {
    name: 'Пицца',
  },
  {
    name: 'Завтрак',
  },
  {
    name: 'Закуски',
  },
  {
    name: 'Коктейли',
  },
  {
    name: 'Напитки',
  },
  {
    name: 'Десерты',
  },
]

export const ingredients = [
  {
    name: 'Сливочная моцарелла',
    price: 29,
    imageUrl:
      'https://adminbm.kharkiv.ua/uploads/mozzarella_sir_244aa06555.jpg',
  },
  {
    name: 'Чеддер',
    price: 29,
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/Chedder_f949491329.jpg',
  },
  {
    name: 'Пармезан',
    price: 29,
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/Parmezan_a1729938b0.jpg',
  },
  {
    name: 'Сир дор юлю',
    price: 29,
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/Dor_blyu_51d6082949.jpg',
  },
  {
    name: 'Острый перец халапеньо',
    price: 29,
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/perez_ostrij_09bf9a53b0.jpg',
  },
  {
    name: 'Нежный цыпленок',
    price: 29,
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/file_kurinoe_30ead07482.jpg',
  },
  {
    name: 'Шампиньоны',
    price: 29,
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/Shampinony_ab1fef7150.jpg',
  },
  {
    name: 'Ветчина',
    price: 29,
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/shinka_04453d9cd3.jpeg',
  },
  {
    name: 'Маринованные огурчики',
    price: 29,
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/ogirok_ca54316364.jpeg',
  },
  {
    name: 'Свежие томаты',
    price: 29,
    imageUrl:
      'https://adminbm.kharkiv.ua/uploads/Pomidory_cherri_1d4c4426af.jpg',
  },
  {
    name: 'Красный лук',
    price: 29,
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/Luk_krasnyj_430076327e.jpg',
  },
  {
    name: 'Сочные ананасы',
    price: 29,
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/ananas_84eb5ed8bd.jpg',
  },
  {
    name: 'Сладкий перец',
    price: 29,
    imageUrl:
      'https://adminbm.kharkiv.ua/uploads/Perecz_bolgarskij_98bd89f633.jpg',
  },
  {
    name: 'Маслини',
    price: 29,
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/Masliny_f0c9ea1d4c.jpg',
  },
].map((obj, index) => ({ id: index + 1, ...obj }))

export const products = [
  {
    name: 'Омлет с ветчиной и грибами',
    imageUrl:
      'https://adminbm.kharkiv.ua/uploads/Picza_Fungo_Karne_860f90c6f1.webp',
    categoryId: 2,
  },
  {
    name: 'Омлет с пепперони',
    imageUrl:
      'https://adminbm.kharkiv.ua/uploads/DSC_08717_kopiya_5e21a2e842.webp',
    categoryId: 2,
  },
  {
    name: 'Пиво Dunkel темное',
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/Dunkel_f2f27debac.webp',
    categoryId: 2,
  },
  {
    name: 'Дэнвич ветчина и сыр',
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/DSC_09891_n_ef8d2e2b56.webp',
    categoryId: 3,
  },
  {
    name: 'Куриные наггетсы',
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/DSC_09830_4effeeb542.webp',
    categoryId: 3,
  },
  {
    name: 'Картофель из печи с соусом 🌱',
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/Kartofel_fri_b871054993.webp',
    categoryId: 3,
  },
  {
    name: 'Додстер',
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/DSC_09840_0b0d10c973.webp',
    categoryId: 3,
  },
  {
    name: 'Острый Додстер 🌶️🌶️',
    imageUrl:
      'https://adminbm.kharkiv.ua/uploads/Smazhenij_sir_Moczarela_Spicy_1c70f39565.webp',
    categoryId: 3,
  },
  {
    name: 'Банановый молочный коктейль',
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/carlsberg_ae7f2de3ce.webp',
    categoryId: 4,
  },
  {
    name: 'Карамельное яблоко молочный коктейль',
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/Somersby_6278cc5643.webp',
    categoryId: 4,
  },
  {
    name: 'Молочный коктейль с печеньем Орео',
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/kronenbourg_5461cc499a.webp',
    categoryId: 4,
  },
  {
    name: 'Классический молочный коктейль 👶',
    imageUrl:
      'https://adminbm.kharkiv.ua/uploads/Somersby_chernika_3bad190d47.webp',
    categoryId: 4,
  },
  {
    name: 'Ирландский Капучино',
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/jack_honey_6182681ab3.webp',
    categoryId: 5,
  },
  {
    name: 'Кофе Карамельный капучино',
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/jackdaniels_14e69a54f7.webp',
    categoryId: 5,
  },
  {
    name: 'Кофе Кокосовый латте',
    imageUrl:
      'https://adminbm.kharkiv.ua/uploads/Vino_igriste_Decordi_Fragolino_Rosso_06730bb514.webp',
    categoryId: 5,
  },
  {
    name: 'Кофе Американо',
    imageUrl:
      'https://adminbm.kharkiv.ua/uploads/Vino_Decordi_Bianco_Secco_002667462f.webp',
    categoryId: 5,
  },
  {
    name: 'Кофе Латте',
    imageUrl: 'https://adminbm.kharkiv.ua/uploads/finlandia_a4932d34a5.webp',
    categoryId: 5,
  },
]

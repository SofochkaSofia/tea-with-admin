// config/site.ts
export const siteConfig = {
  name: 'Tea Shop',
  description: 'Лучший чай в городе. Элитные сорта, аксессуары, доставка.',
  url: 'https://vash-domen.ru',
  
  navigation: [
    { title: 'Главная', href: '/' },
    { title: 'Блог', href: '/blog' },
    { title: 'О нас', href: '/about' },
    { title: 'Контакты', href: '/contact' }
  ],
  
  social: {
    vk: 'https://vk.com/yourpage',
    telegram: 'https://t.me/yourchannel',
    whatsapp: null,
    yandex: null,
    email: 'info@vash-domen.ru'
  },
  
  contact: {
    email: 'info@vash-domen.ru',
    phone: '+7 (999) 000-00-00',
    phoneFormatted: '+7 (999) 000-00-00',
    address: 'г. Москва, ул. Примерная, дом 1, офис 101',
    workingHours: 'Пн-Пт: 10:00-19:00, Сб-Вс: выходной'
  },
  
  seo: {
    defaultTitle: 'Tea Shop',
    titleTemplate: '%s | Tea Shop',
    defaultDescription: 'Магазин элитного чая и аксессуаров. Доставка по России.',
    keywords: ['чай', 'элитный чай', 'чайный магазин', 'доставка чая'],
    defaultImage: '/images/og-default.jpg'
  },
  
  features: {
    blog: true,
    admin: true,
    auth: ['yandex', 'vk'] as Array<'yandex' | 'vk'>
  }
} as const

export type SiteConfig = typeof siteConfig
export const { navigation, social, contact, seo, features } = siteConfig
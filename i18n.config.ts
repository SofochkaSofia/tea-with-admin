// i18n.config.ts
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'ru',
  messages: {
    ru: {
      welcome: 'Добро пожаловать',
      navigation: {
        home: 'Главная',
        blog: 'Блог',
        about: 'О нас',
        contact: 'Контакты',
        admin: 'Админ-панель'
      },
      blog: {
        title: 'Блог',
        noPosts: 'Нет опубликованных статей',
        loading: 'Загрузка...',
        readMore: 'Читать далее',
        published: 'Опубликовано',
        draft: 'Черновик'
      },
      auth: {
        login: 'Войти',
        logout: 'Выйти',
        loginYandex: 'Войти через Яндекс',
        loginVk: 'Войти через ВКонтакте',
        unauthorized: 'Требуется авторизация'
      },
      admin: {
        dashboard: 'Дашборд',
        posts: 'Посты',
        createPost: 'Создать пост',
        editPost: 'Редактировать пост',
        deletePost: 'Удалить пост',
        confirmDelete: 'Вы уверены, что хотите удалить этот пост?',
        save: 'Сохранить',
        cancel: 'Отмена',
        published: 'Опубликовано',
        draft: 'Черновик'
      },
      common: {
        error: 'Произошла ошибка',
        notFound: 'Страница не найдена',
        back: 'Назад',
        loading: 'Загрузка...'
      }
    },
    en: {
      welcome: 'Welcome',
      navigation: {
        home: 'Home',
        blog: 'Blog',
        about: 'About',
        contact: 'Contact',
        admin: 'Admin Panel'
      },
      blog: {
        title: 'Blog',
        noPosts: 'No published posts',
        loading: 'Loading...',
        readMore: 'Read more',
        published: 'Published',
        draft: 'Draft'
      },
      auth: {
        login: 'Sign in',
        logout: 'Sign out',
        loginYandex: 'Sign in with Yandex',
        loginVk: 'Sign in with VK',
        unauthorized: 'Authorization required'
      },
      admin: {
        dashboard: 'Dashboard',
        posts: 'Posts',
        createPost: 'Create post',
        editPost: 'Edit post',
        deletePost: 'Delete post',
        confirmDelete: 'Are you sure you want to delete this post?',
        save: 'Save',
        cancel: 'Cancel',
        published: 'Published',
        draft: 'Draft'
      },
      common: {
        error: 'An error occurred',
        notFound: 'Page not found',
        back: 'Back',
        loading: 'Loading...'
      }
    },
    de: {
      welcome: 'Willkommen',
      navigation: {
        home: 'Startseite',
        blog: 'Blog',
        about: 'Über uns',
        contact: 'Kontakt',
        admin: 'Admin-Bereich'
      },
      blog: {
        title: 'Blog',
        noPosts: 'Keine veröffentlichten Beiträge',
        loading: 'Wird geladen...',
        readMore: 'Weiterlesen',
        published: 'Veröffentlicht',
        draft: 'Entwurf'
      },
      auth: {
        login: 'Anmelden',
        logout: 'Abmelden',
        loginYandex: 'Mit Yandex anmelden',
        loginVk: 'Mit VK anmelden',
        unauthorized: 'Anmeldung erforderlich'
      },
      admin: {
        dashboard: 'Dashboard',
        posts: 'Beiträge',
        createPost: 'Beitrag erstellen',
        editPost: 'Beitrag bearbeiten',
        deletePost: 'Beitrag löschen',
        confirmDelete: 'Möchten Sie diesen Beitrag wirklich löschen?',
        save: 'Speichern',
        cancel: 'Abbrechen',
        published: 'Veröffentlicht',
        draft: 'Entwurf'
      },
      common: {
        error: 'Ein Fehler ist aufgetreten',
        notFound: 'Seite nicht gefunden',
        back: 'Zurück',
        loading: 'Wird geladen...'
      }
    },
    tr: {
      welcome: 'Hoş geldiniz',
      navigation: {
        home: 'Ana Sayfa',
        blog: 'Blog',
        about: 'Hakkımızda',
        contact: 'İletişim',
        admin: 'Yönetim Paneli'
      },
      blog: {
        title: 'Blog',
        noPosts: 'Yayınlanmış gönderi yok',
        loading: 'Yükleniyor...',
        readMore: 'Devamını oku',
        published: 'Yayınlandı',
        draft: 'Taslak'
      },
      auth: {
        login: 'Giriş yap',
        logout: 'Çıkış yap',
        loginYandex: "Yandex ile giriş yap",
        loginVk: "VK ile giriş yap",
        unauthorized: 'Giriş gerekiyor'
      },
      admin: {
        dashboard: 'Kontrol Paneli',
        posts: 'Gönderiler',
        createPost: 'Gönderi oluştur',
        editPost: 'Gönderiyi düzenle',
        deletePost: 'Gönderiyi sil',
        confirmDelete: 'Bu gönderiyi silmek istediğinizden emin misiniz?',
        save: 'Kaydet',
        cancel: 'İptal',
        published: 'Yayınlandı',
        draft: 'Taslak'
      },
      common: {
        error: 'Bir hata oluştu',
        notFound: 'Sayfa bulunamadı',
        back: 'Geri',
        loading: 'Yükleniyor...'
      }
    }
  }
}))
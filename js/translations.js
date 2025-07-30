const translations = {
  ru: {
    nav: {
      home: 'Главная',
      exploits: 'Эксплойты',
      team: 'Команда',
      contact: 'Контакты',
      language: 'Язык',
      russian: 'Русский',
      english: 'English',
      chinese: '中文'
    },
    hero: {
      title: 'Элитная команда по кибербезопасности',
      subtitle: 'Эксперты по тестированию на проникновение и исследованию уязвимостей',
      cta: 'Узнать больше'
    },
    exploits: {
      title: 'Наши эксплойты',
      description: 'Исследование и разработка эксплойтов для уязвимостей нулевого дня',
      viewAll: 'Показать все'
    },
    // Добавьте другие переводы по мере необходимости
  },
  en: {
    nav: {
      home: 'Home',
      exploits: 'Exploits',
      team: 'Team',
      contact: 'Contact',
      language: 'Language',
      russian: 'Русский',
      english: 'English',
      chinese: '中文'
    },
    hero: {
      title: 'Elite Cybersecurity Team',
      subtitle: 'Experts in penetration testing and vulnerability research',
      cta: 'Learn More'
    },
    exploits: {
      title: 'Our Exploits',
      description: 'Research and development of zero-day vulnerability exploits',
      viewAll: 'View All'
    },
    // Add other translations as needed
  },
  zh: {
    nav: {
      home: '首页',
      exploits: '漏洞利用',
      team: '团队',
      contact: '联系我们',
      language: '语言',
      russian: 'Русский',
      english: 'English',
      chinese: '中文'
    },
    hero: {
      title: '精英网络安全团队',
      subtitle: '渗透测试和漏洞研究专家',
      cta: '了解更多'
    },
    exploits: {
      title: '我们的漏洞利用',
      description: '零日漏洞利用的研究与开发',
      viewAll: '查看全部'
    },
    // 根据需要添加其他翻译
  }
};

// Функция для изменения языка
function changeLanguage(lang) {
  if (!translations[lang]) return;
  
  // Сохраняем выбранный язык
  localStorage.setItem('selectedLanguage', lang);
  
  // Обновляем все элементы с атрибутом data-translate
  document.querySelectorAll('[data-translate]').forEach(element => {
    const keys = element.getAttribute('data-translate').split('.');
    let translation = translations[lang];
    
    for (const key of keys) {
      if (translation && translation[key] !== undefined) {
        translation = translation[key];
      } else {
        console.warn(`Translation not found for key: ${keys.join('.')}`);
        return;
      }
    }
    
    if (element.tagName === 'INPUT' && element.type === 'placeholder') {
      element.placeholder = translation;
    } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.value = translation;
    } else {
      element.textContent = translation;
    }
  });
  
  // Обновляем атрибут lang у html-элемента
  document.documentElement.lang = lang;
  
  // Обновляем мета-теги для SEO
  document.title = translations[lang].meta?.title || document.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', translations[lang].meta?.description || '');
}

// Инициализация языка при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем сохраненный язык или используем язык браузера
  const savedLang = localStorage.getItem('selectedLanguage');
  const browserLang = navigator.language.split('-')[0];
  const defaultLang = ['ru', 'en', 'zh'].includes(browserLang) ? browserLang : 'en';
  
  // Устанавливаем язык
  changeLanguage(savedLang || defaultLang);
  
  // Обработчики для переключения языка
  document.querySelectorAll('[data-lang-switch]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = button.getAttribute('data-lang-switch');
      changeLanguage(lang);
    });
  });
});

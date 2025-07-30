// Language configuration for the website
const languages = {
    en: {
        code: 'en',
        name: 'English',
        strings: {
            // Header
            'nav.exploits': 'Exploits',
            'nav.about': 'About Us',
            
            // Hero Section
            'hero.title': 'Elite Security Research',
            'hero.subtitle': 'Professional Cybersecurity Research',
            
            // Exploits Section
            'exploits.title': 'Latest Research',
            'exploits.subtitle': 'Analysis of critical vulnerabilities actively exploited in cyber attacks worldwide',
            'exploits.viewAll': 'View all vulnerabilities',
            
            // About Section
            'about.title': 'About Our Team',
            'about.description': 'We are a team of cybersecurity experts specializing in vulnerability research and exploit development. Our mission is to enhance security in cyberspace through in-depth analysis and understanding of modern threats.',
            
            // Footer
            'footer.contact': 'Contact via Jabber',
            'footer.copyright': '© 2023 Elite Security Research Team. All rights reserved.'
        }
    },
    ru: {
        code: 'ru',
        name: 'Русский',
        strings: {
            // Header
            'nav.exploits': 'Эксплойты',
            'nav.about': 'О нас',
            
            // Hero Section
            'hero.title': 'Elite Security Research',
            'hero.subtitle': 'Профессиональные исследования в области кибербезопасности',
            
            // Exploits Section
            'exploits.title': 'Последние исследования',
            'exploits.subtitle': 'Анализ самых критических уязвимостей, активно используемых в кибератаках по всему миру',
            'exploits.viewAll': 'Смотреть все уязвимости',
            
            // About Section
            'about.title': 'О нашей команде',
            'about.description': 'Мы — команда экспертов по кибербезопасности, специализирующаяся на исследовании уязвимостей и разработке эксплойтов. Наша миссия — повышать уровень безопасности в киберпространстве через глубокий анализ и понимание современных угроз.',
            
            // Footer
            'footer.contact': 'Связаться через Jabber',
            'footer.copyright': '© 2023 Elite Security Research Team. Все права защищены.'
        }
    },
    zh: {
        code: 'zh',
        name: '中文',
        strings: {
            // Header
            'nav.exploits': '漏洞利用',
            'nav.about': '关于我们',
            
            // Hero Section
            'hero.title': '精英安全研究',
            'hero.subtitle': '专业网络安全研究',
            
            // Exploits Section
            'exploits.title': '最新研究',
            'exploits.subtitle': '分析全球网络攻击中积极利用的关键漏洞',
            'exploits.viewAll': '查看所有漏洞',
            
            // About Section
            'about.title': '关于我们的团队',
            'about.description': '我们是一支专注于漏洞研究和漏洞利用开发的网络安全专家团队。我们的使命是通过深入分析和理解现代威胁，提高网络空间的安全性。',
            
            // Footer
            'footer.contact': '通过Jabber联系我们',
            'footer.copyright': '© 2023 精英安全研究团队。保留所有权利。'
        }
    }
};

// Function to set the language
function setLanguage(lang) {
    if (!languages[lang]) return;
    
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (languages[lang].strings[key]) {
            element.textContent = languages[lang].strings[key];
        }
    });
    
    // Update active state in language switcher
    document.querySelectorAll('.language-switcher button').forEach(button => {
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Initialize language
function initLanguage() {
    // Check for saved language preference or use browser language
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.split('-')[0];
    const defaultLang = languages[Object.keys(languages)[0]].code;
    
    // Try to use saved language, then browser language, then default to first language
    const langToUse = savedLang || (languages[browserLang] ? browserLang : defaultLang);
    
    setLanguage(langToUse);
}

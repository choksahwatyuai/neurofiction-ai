// Language Management
const LANGUAGES = ['ru', 'en', 'ko', 'zh'];
let currentLanguage = localStorage.getItem('language') || 'ru';

// DOM Elements
const elements = {
    languageSwitcher: document.querySelector('.language-switcher'),
    languageButtons: document.querySelectorAll('.lang-btn'),
    elementsWithLang: document.querySelectorAll('[data-lang]')
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    setLanguage(currentLanguage);
    initSmoothScrolling();
    initAnimations();
});

// Language Switcher
function initLanguageSwitcher() {
    if (!elements.languageSwitcher) return;

    // Set active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        }

        // Add click event
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang !== currentLanguage) {
                setLanguage(lang);
            }
        });
    });
}

// Set language
function setLanguage(lang) {
    if (!LANGUAGES.includes(lang)) return;
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update UI
    updateLanguageElements();
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.pushState({}, '', url);
}

// Update all language-specific elements
function updateLanguageElements() {
    // Hide all language elements first
    document.querySelectorAll('[data-lang]').forEach(el => {
        if (!el.closest('.language-switcher') && !el.closest('nav')) {
            el.style.display = 'none';
        }
    });
    
    // Show elements for current language
    const currentLangElements = document.querySelectorAll(`[data-lang="${currentLanguage}"]`);
    currentLangElements.forEach(el => {
        el.style.display = '';
    });
    
    // Update active button in language switcher
    if (elements.languageButtons) {
        elements.languageButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === currentLanguage) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize animations
function initAnimations() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// Initialize mobile menu
initMobileMenu();
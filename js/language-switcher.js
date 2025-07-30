/**
 * Language Switcher Module
 * Handles all language switching functionality
 */

const LanguageSwitcher = (() => {
    // Supported languages
    const SUPPORTED_LANGUAGES = [
        { code: 'en', name: 'EN', fullName: 'English' },
        { code: 'ru', name: 'RU', fullName: 'Русский' },
        { code: 'zh', name: '中文', fullName: '中文' }
    ];
    const DEFAULT_LANGUAGE = 'en';
    
    // Language storage key
    const STORAGE_KEY = 'selectedLanguage';
    
    // Current language
    let currentLanguage = DEFAULT_LANGUAGE;
    
    // DOM Elements
    let elements = {
        languageSwitcher: null,
        languageButtons: null,
        languageElements: null
    };
    
    /**
     * Initialize the language switcher
     */
    function init() {
        // Get DOM elements
        cacheElements();
        
        // Get saved language from storage or detect from browser
        const savedLanguage = getSavedLanguage();
        
        // Set the language
        setLanguage(savedLanguage);
        
        // Add event listeners
        addEventListeners();
        
        // Initial language update
        updateLanguageElements();
    }
    
    /**
     * Cache DOM elements
     */
    function cacheElements() {
        elements.languageSwitcher = document.querySelector('.language-switcher');
        elements.languageButtons = document.querySelectorAll('.language-switcher .lang-btn');
        elements.languageElements = document.querySelectorAll('[data-lang]');
    }
    
    /**
     * Add event listeners
     */
    function addEventListeners() {
        // Language switcher buttons
        elements.languageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                if (lang && lang !== currentLanguage) {
                    setLanguage(lang);
                }
            });
        });
        
        // Update elements when DOM changes
        const observer = new MutationObserver(() => {
            cacheElements();
            updateLanguageElements();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    /**
     * Get saved language from storage or detect from browser
     */
    function getSavedLanguage() {
        try {
            // Try to get from localStorage
            const savedLang = localStorage.getItem(STORAGE_KEY);
            if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
                return savedLang;
            }
            
            // Try to detect from browser
            const browserLang = (navigator.language || navigator.userLanguage || '').substr(0, 2).toLowerCase();
            if (SUPPORTED_LANGUAGES.includes(browserLang)) {
                return browserLang;
            }
            
            // Fallback to default
            return DEFAULT_LANGUAGE;
        } catch (e) {
            console.error('Error getting saved language:', e);
            return DEFAULT_LANGUAGE;
        }
    }
    
    /**
     * Set the current language
     */
    function setLanguage(lang) {
        if (!SUPPORTED_LANGUAGES.includes(lang)) {
            console.warn(`Language "${lang}" is not supported`);
            return;
        }
        
        // Update current language
        currentLanguage = lang;
        
        // Save to storage
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
            console.error('Error saving language to storage:', e);
        }
        
        // Update UI
        updateLanguageElements();
        
        // Update document language attribute
        document.documentElement.lang = lang;
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }
    
    /**
     * Update all language-specific elements
     */
    function updateLanguageElements() {
        if (!elements.languageElements) return;
        
        // Hide all language elements first
        elements.languageElements.forEach(el => {
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
        
        // Show at least one title
        const titles = document.querySelectorAll('title[data-lang]');
        if (titles.length > 0) {
            let defaultTitle = document.querySelector('title:not([data-lang])') || document.createElement('title');
            const currentTitle = Array.from(titles).find(t => t.getAttribute('data-lang') === currentLanguage);
            if (currentTitle) {
                defaultTitle.textContent = currentTitle.textContent;
            }
        }
        
        // Dispatch event
        const event = new CustomEvent('languageChanged', {
            detail: { language: currentLanguage }
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Get the current language
     */
    function getCurrentLanguage() {
        return currentLanguage;
    }
    
    // Public API
    return {
        init,
        setLanguage,
        getCurrentLanguage
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LanguageSwitcher.init());
} else {
    LanguageSwitcher.init();
}

// Export for modules
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = LanguageSwitcher;
}

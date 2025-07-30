/**
 * Main JavaScript File
 * Initializes all modules and handles global functionality
 */

// Import modules
import { LanguageSwitcher } from './language-switcher.js';
import { MobileMenu } from './mobile-menu.js';

// Initialize modules when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language switcher
    LanguageSwitcher.init();
    
    // Initialize mobile menu
    MobileMenu.init();
    
    // Add scroll event listener for header
    const header = document.querySelector('.site-header');
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scrolled', 'scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                // Scroll down
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                // Scroll up
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            
            header.classList.add('scrolled');
            lastScroll = currentScroll;
        });
    }
    
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Handle language change events
    document.addEventListener('languageChanged', (e) => {
        console.log(`Language changed to: ${e.detail.language}`);
        // You can add additional language change handlers here
    });
});

// Handle service worker registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Export for modules
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        LanguageSwitcher,
        MobileMenu
    };
}

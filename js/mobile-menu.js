/**
 * Mobile Menu Module
 * Handles mobile menu toggle and accessibility
 */

const MobileMenu = (() => {
    // DOM Elements
    const selectors = {
        menuToggle: '.mobile-menu-toggle',
        mobileMenu: '#mobile-menu',
        navLinks: '.mobile-nav-link',
        header: '.site-header'
    };
    
    let elements = {};
    let isMenuOpen = false;
    
    /**
     * Initialize the mobile menu
     */
    function init() {
        // Cache DOM elements
        cacheElements();
        
        // Add event listeners
        addEventListeners();
    }
    
    /**
     * Cache DOM elements
     */
    function cacheElements() {
        elements = {
            menuToggle: document.querySelector(selectors.menuToggle),
            mobileMenu: document.querySelector(selectors.mobileMenu),
            navLinks: document.querySelectorAll(selectors.navLinks),
            header: document.querySelector(selectors.header)
        };
    }
    
    /**
     * Add event listeners
     */
    function addEventListeners() {
        if (elements.menuToggle) {
            elements.menuToggle.addEventListener('click', toggleMenu);
        }
        
        // Close menu when clicking on nav links
        elements.navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && 
                !elements.mobileMenu.contains(e.target) && 
                !elements.menuToggle.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Handle keyboard navigation
        document.addEventListener('keydown', handleKeyDown);
    }
    
    /**
     * Toggle mobile menu
     */
    function toggleMenu() {
        if (!isMenuOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }
    
    /**
     * Open mobile menu
     */
    function openMenu() {
        if (!elements.mobileMenu || !elements.menuToggle) return;
        
        elements.mobileMenu.setAttribute('aria-hidden', 'false');
        elements.menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        isMenuOpen = true;
        
        // Add class to header
        if (elements.header) {
            elements.header.classList.add('menu-open');
        }
        
        // Set focus to first nav item
        if (elements.navLinks.length > 0) {
            setTimeout(() => {
                elements.navLinks[0].focus();
            }, 100);
        }
    }
    
    /**
     * Close mobile menu
     */
    function closeMenu() {
        if (!elements.mobileMenu || !elements.menuToggle) return;
        
        elements.mobileMenu.setAttribute('aria-hidden', 'true');
        elements.menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        isMenuOpen = false;
        
        // Remove class from header
        if (elements.header) {
            elements.header.classList.remove('menu-open');
        }
        
        // Return focus to menu toggle button
        if (elements.menuToggle) {
            elements.menuToggle.focus();
        }
    }
    
    /**
     * Handle keyboard navigation
     */
    function handleKeyDown(e) {
        // Close menu on Escape key
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
        
        // Trap focus inside menu when open
        if (e.key === 'Tab' && isMenuOpen) {
            const focusableElements = Array.from(elements.mobileMenu.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex="0"]'
            ));
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }
    
    // Public API
    return {
        init,
        openMenu,
        closeMenu
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MobileMenu.init());
} else {
    MobileMenu.init();
}

// Export for modules
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = MobileMenu;
}

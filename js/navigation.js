// Navigation System with data-navigate attribute
class NavigationSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigationListeners();
        this.setupKeyboardNavigation();
    }

    // Setup click listeners for all elements with data-navigate attribute
    setupNavigationListeners() {
        // Get all elements with data-navigate attribute
        const navigableElements = document.querySelectorAll('[data-navigate]');
        
        navigableElements.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior
                
                const destination = element.getAttribute('data-navigate');
                this.navigateTo(destination);
            });
            
            // Add visual feedback for clickable elements
            element.style.cursor = 'pointer';
            
            // Add hover effects
            element.addEventListener('mouseenter', () => {
                element.style.opacity = '0.8';
                element.style.transform = 'scale(1.02)';
                element.style.transition = 'all 0.2s ease';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            });
        });
    }

    // Main navigation function
    navigateTo(destination) {
        if (!destination) {
            console.warn('No destination specified for navigation');
            return;
        }

        // Handle special destinations
        switch (destination.toLowerCase()) {
            case 'index':
            case 'home':
            case 'trang-chu':
                this.goToPage('index.html');
                break;
            
            case 'courses':
            case 'khoa-hoc':
                this.goToPage('courses.html');
                break;
            
            case 'login':
            case 'dang-nhap':
                this.goToPage('login.html');
                break;
            
            case 'register':
            case 'dang-ky':
                this.goToPage('register.html');
                break;
            
            case 'avatar-customizer':
            case 'tuy-chinh-nhan-vat':
                this.goToPage('avatar-customizer.html');
                break;
            
            case 'course-complete':
            case 'hoan-thanh-khoa-hoc':
                this.goToPage('course-complete.html');
                break;
            
            case 'course5':
            case 'dien-bien-phu':
                this.goToPage('course5.html');
                break;
            
            case 'forgot-password':
            case 'quen-mat-khau':
                this.goToPage('forgot-password.html');
                break;
            
            case 'verify-code':
            case 'xac-thuc-ma':
                this.goToPage('verify-code.html');
                break;
            
            case 'new-password':
            case 'mat-khau-moi':
                this.goToPage('newpassword.html');
                break;
            
            default:
                // If destination already has .html extension, use as is
                if (destination.endsWith('.html')) {
                    this.goToPage(destination);
                } else {
                    // Otherwise, add .html extension
                    this.goToPage(destination + '.html');
                }
                break;
        }
    }

    // Function to actually change the page
    goToPage(page) {
        try {
            // Add loading effect
            this.showLoadingEffect();
            
            // Small delay for smooth transition
            setTimeout(() => {
                window.location.href = page;
            }, 300);
            
        } catch (error) {
            console.error('Navigation error:', error);
            this.hideLoadingEffect();
        }
    }

    // Setup keyboard navigation (optional)
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Alt + H for Home
            if (e.altKey && e.key.toLowerCase() === 'h') {
                e.preventDefault();
                this.navigateTo('index');
            }
            
            // Alt + C for Courses
            if (e.altKey && e.key.toLowerCase() === 'c') {
                e.preventDefault();
                this.navigateTo('courses');
            }
            
            // Alt + L for Login
            if (e.altKey && e.key.toLowerCase() === 'l') {
                e.preventDefault();
                this.navigateTo('login');
            }
        });
    }

    // Show loading effect during navigation
    showLoadingEffect() {
        // Create loading overlay if it doesn't exist
        let loadingOverlay = document.getElementById('navigation-loading');
        
        if (!loadingOverlay) {
            loadingOverlay = document.createElement('div');
            loadingOverlay.id = 'navigation-loading';
            loadingOverlay.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner"></div>
                    <div class="loading-text">Đang chuyển trang...</div>
                </div>
            `;
            
            // Add styles
            loadingOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(248, 250, 253, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            // Add spinner styles
            const style = document.createElement('style');
            style.textContent = `
                .loading-spinner {
                    text-align: center;
                }
                
                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #ffc107;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 10px;
                }
                
                .loading-text {
                    font-family: 'Be Vietnam', sans-serif;
                    font-size: 16px;
                    color: #303030;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(loadingOverlay);
        }
        
        // Show loading overlay
        setTimeout(() => {
            loadingOverlay.style.opacity = '1';
        }, 10);
    }

    // Hide loading effect
    hideLoadingEffect() {
        const loadingOverlay = document.getElementById('navigation-loading');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 300);
        }
    }

    // Utility function to add data-navigate to elements programmatically
    static addNavigationAttribute(selector, destination) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.setAttribute('data-navigate', destination);
        });
    }

    // Utility function to remove navigation from elements
    static removeNavigationAttribute(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.removeAttribute('data-navigate');
            element.style.cursor = 'default';
        });
    }
}

// Initialize navigation system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const navigation = new NavigationSystem();
    
    // Make navigation system globally available
    window.NavigationSystem = NavigationSystem;
    window.navigation = navigation;
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationSystem;
}

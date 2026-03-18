// Page Transition Manager - Simple Version without SessionStorage
class PageTransition {
    constructor() {
        this.isNavigating = false;
        this.progressInterval = null;
        this.init();
    }

    init() {
        // Reset navigation state
        this.isNavigating = false;
        
        // Always hide loader immediately on page load
        this.hideLoaderImmediately();
        
        // Add click handlers for navigation
        this.addNavigationHandlers();
    }

    startProgressAnimation() {
        const progressBar = document.querySelector('.progress-bar');
        const progressPercentage = document.querySelector('.progress-percentage');
        
        if (progressBar && progressPercentage) {
            // Clear any existing interval
            if (this.progressInterval) {
                clearInterval(this.progressInterval);
            }
            
            let progress = 0;
            const duration = 1000; // 1 second
            const increment = 100 / (duration / 50); // Update every 50ms

            this.progressInterval = setInterval(() => {
                progress += increment;
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(this.progressInterval);
                    this.progressInterval = null;
                }
                
                // Update both width and text
                progressBar.style.width = progress + '%';
                progressPercentage.textContent = Math.round(progress) + '%';
            }, 50);
        }
    }

    continueProgressAnimation(startProgress = 0) {
        const progressBar = document.querySelector('.progress-bar');
        const progressPercentage = document.querySelector('.progress-percentage');
        
        if (progressBar && progressPercentage) {
            // Clear any existing interval
            if (this.progressInterval) {
                clearInterval(this.progressInterval);
            }
            
            let progress = startProgress;
            const duration = 750; // Reduced duration for continuation
            const increment = (100 - startProgress) / (duration / 50);

            // Set initial progress
            progressBar.style.width = progress + '%';
            progressPercentage.textContent = Math.round(progress) + '%';

            this.progressInterval = setInterval(() => {
                progress += increment;
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(this.progressInterval);
                    this.progressInterval = null;
                }
                
                // Update both width and text
                progressBar.style.width = progress + '%';
                progressPercentage.textContent = Math.round(progress) + '%';
            }, 50);
        }
    }

    // Stop all animations and clear intervals
    stopAllAnimations() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    showLoader() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.remove('fade-out');
            loader.style.display = 'flex';
            
            // Reset progress
            const progressPercentage = loader.querySelector('.progress-percentage');
            if (progressPercentage) {
                progressPercentage.textContent = '0%';
            }
            
            // Start progress animation
            this.startProgressAnimation();
        }
    }

    hideLoader() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            // Ensure progress reaches 100% before hiding
            const progressPercentage = loader.querySelector('.progress-percentage');
            if (progressPercentage) {
                progressPercentage.textContent = '100%';
            }

            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 400);
            }, 250);
        }

        // Show page content
        const pageContent = document.querySelector('.page-content');
        
        if (pageContent) {
            pageContent.classList.add('show');
            pageContent.style.opacity = '1';
            pageContent.style.transform = 'translateY(0)';
        }
        
        // Show header using script.js function
        if (window.showHeader) {
            window.showHeader();
        }
        
        // Ensure body is visible
        document.body.style.opacity = '1';
    }

    hideLoaderImmediately() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.style.display = 'none';
        }

        // Show page content immediately
        const pageContent = document.querySelector('.page-content');
        
        if (pageContent) {
            pageContent.classList.add('show');
            pageContent.style.opacity = '1';
            pageContent.style.transform = 'translateY(0)';
        }
        
        // Show header using script.js function
        if (window.showHeader) {
            window.showHeader();
        }
        
        // Ensure body is visible
        document.body.style.opacity = '1';
    }

    navigateToPage(url, buttonElement = null) {
        // Prevent multiple simultaneous navigations
        if (this.isNavigating) {
            return;
        }
        
        this.isNavigating = true;
        
        // Add loading state to button if provided
        if (buttonElement) {
            buttonElement.classList.add('btn-loading');
            const originalText = buttonElement.innerHTML;
            buttonElement.innerHTML = '<span>' + originalText + '</span>';
        }

        // Show loader
        this.showLoader();

        // Navigate after a short delay
        setTimeout(() => {
            window.location.href = url;
        }, 600);
    }

    // Method for direct navigation
    navigateTo(url) {
        // Short delay then navigate
        setTimeout(() => {
            window.location.href = url;
        }, 150);
    }

    showTransition() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            // Start from a higher progress since we're continuing from navigation
            const progressBar = loader.querySelector('.progress-bar');
            const progressPercentage = loader.querySelector('.progress-percentage');
            
            if (progressBar && progressPercentage) {
                // Start from 30% and continue to 100%
                this.continueProgressAnimation(30);
                
                // Hide loader after reaching 100%
                setTimeout(() => {
                    this.hideLoader();
                }, 750);
            } else {
                // Fallback: just hide immediately if no progress elements
                this.hideLoaderImmediately();
            }
        } else {
            // No loader found, show content immediately
            this.hideLoaderImmediately();
        }
    }

    addNavigationHandlers() {
        // Prevent multiple handlers on same elements
        if (this.handlersAdded) return;
        this.handlersAdded = true;

        // Generic navigation handler for all data-navigate elements
        const navigateElements = document.querySelectorAll('[data-navigate]');
        
        navigateElements.forEach((element, index) => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (this.isNavigating) return;
                this.isNavigating = true;
                
                const navigateType = element.getAttribute('data-navigate');
                let targetUrl = '';
                
                // Determine target URL based on navigation type
                switch(navigateType) {
                    case 'login':
                        targetUrl = 'login.html';
                        break;
                    case 'home':
                        targetUrl = 'index.html';
                        break;
                    case 'forgot-password':
                        targetUrl = 'forgot-password.html';
                        break;
                    case 'verify-code':
                        targetUrl = 'verify-code.html';
                        break;
                    case 'register':
                        targetUrl = 'register.html';
                        break;
                    case 'newpassword':
                        targetUrl = 'newpassword.html';
                        break;
                    default:
                        // Use href if available, otherwise use navigate type as filename
                        targetUrl = element.href || `${navigateType}.html`;
                        break;
                }
                
                this.navigateToPage(targetUrl, element);
            }, true); // Use capturing phase
        });

        // Handle form submissions with transitions (for any form with data-navigate-to attribute)
        const formsWithTransition = document.querySelectorAll('form[data-navigate-to]');
        
        formsWithTransition.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (this.isNavigating) return;
                this.isNavigating = true;
                
                const targetUrl = form.getAttribute('data-navigate-to');
                const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
                
                if (submitButton) {
                    submitButton.classList.add('btn-loading');
                    const originalText = submitButton.innerHTML;
                    submitButton.innerHTML = '<span>' + originalText + '</span>';
                }

                // Simulate form processing time
                setTimeout(() => {
                    this.showLoader();
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 500);
                }, 750);
            });
        });
    }
}

// Simple DOM loading without sessionStorage
document.addEventListener('DOMContentLoaded', function() {
    // Force hide loader immediately on any page load
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Force show page content immediately
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
        pageContent.classList.add('show');
        pageContent.style.opacity = '1';
        pageContent.style.transform = 'translateY(0)';
    }
    
    // Show header
    if (window.showHeader) {
        window.showHeader();
    }
    
    // Ensure body is visible
    document.body.style.opacity = '1';
    
    // Initialize page transitions
    setTimeout(() => {
        window.pageTransitionInstance = new PageTransition();
    }, 50);
});

// Handle browser back/forward navigation - simple approach
window.addEventListener('popstate', function() {
    // Force hide loader immediately
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Force show page content
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
        pageContent.classList.add('show');
        pageContent.style.opacity = '1';
        pageContent.style.transform = 'translateY(0)';
    }
    
    // Show header
    if (window.showHeader) {
        window.showHeader();
    }
    
    // Ensure body is visible
    document.body.style.opacity = '1';
    
    // Reset navigation state
    if (window.pageTransitionInstance) {
        window.pageTransitionInstance.isNavigating = false;
    }
});

// Handle page loaded from cache (back/forward button)
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Force hide loader
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.style.display = 'none';
        }
        
        // Force show content
        const pageContent = document.querySelector('.page-content');
        if (pageContent) {
            pageContent.style.opacity = '1';
            pageContent.style.transform = 'translateY(0)';
        }
        
        // Reset navigation state
        if (window.pageTransitionInstance) {
            window.pageTransitionInstance.isNavigating = false;
        }
    }
});

// Fallback navigation for critical links (in case of conflicts)
document.addEventListener('click', function(e) {
    const element = e.target.closest('[data-navigate]');
    if (element && !window.pageTransitionInstance) {
        e.preventDefault();
        
        const navigateType = element.getAttribute('data-navigate');
        let targetUrl = '';
        
        switch(navigateType) {
            case 'login':
                targetUrl = 'login.html';
                break;
            case 'home':
                targetUrl = 'index.html';
                break;
            case 'forgot-password':
                targetUrl = 'forgot-password.html';
                break;
            case 'verify-code':
                targetUrl = 'verify-code.html';
                break;
            case 'register':
                targetUrl = 'register.html';
                break;
            case 'newpassword':
                targetUrl = 'newpassword.html';
                break;
            default:
                targetUrl = element.href || `${navigateType}.html`;
                break;
        }
        
        window.location.href = targetUrl;
    }
}, true);

// Smooth scroll for internal links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

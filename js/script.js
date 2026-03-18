// Main JavaScript for Viet Su Ky Website
document.addEventListener('DOMContentLoaded', function() {
    // Force scroll to top on page load/reload
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    
    // Immediately scroll to top
    window.scrollTo(0, 0);
    
    // Ensure scroll to top after any browser back/forward navigation
    window.addEventListener('beforeunload', function() {
        window.scrollTo(0, 0);
    });
    
    // Handle browser back/forward - always scroll to top
    window.addEventListener('pageshow', function(event) {
        window.scrollTo(0, 0);
    });
    
    // Header Animation Management
    function initHeaderAnimation() {
        const header = document.querySelector('.header');
        if (header) {
            // Check if we need to show header immediately (back navigation)
            const isBackForwardNavigation = window.performance && 
                window.performance.navigation && 
                window.performance.navigation.type === 2;
                
            if (isBackForwardNavigation) {
                // Show header immediately for back navigation
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            } else {
                // Animate header in after a short delay
                setTimeout(() => {
                    header.style.opacity = '1';
                    header.style.transform = 'translateY(0)';
                }, 200);
            }
        }
    }

    // Initialize header animation
    initHeaderAnimation();

    // Export function for page transition to use
    window.showHeader = function() {
        const header = document.querySelector('.header');
        if (header) {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }
    };

    // Scroll Animation Setup
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('cards-container')) {
                    const cards = entry.target.querySelectorAll('.card-item');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all sections and elements for animation
    const animatedElements = document.querySelectorAll(`
        .features, .achievements, .feedback, .pricing,
        .feature-card, .feedback-card, .pricing-card,
        .achievements-text, .achievements-stats,
        .feedback-header, .hero-content
    `);

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Add special classes for different animation types
    document.querySelectorAll('.features-cards').forEach(el => {
        el.classList.add('cards-container');
        el.querySelectorAll('.feature-card').forEach(card => card.classList.add('card-item'));
    });

    document.querySelectorAll('.feedback-grid').forEach(el => {
        el.classList.add('cards-container');
        el.querySelectorAll('.feedback-card').forEach(card => card.classList.add('card-item'));
    });

    document.querySelectorAll('.pricing-grid').forEach(el => {
        el.classList.add('cards-container');
        el.querySelectorAll('.pricing-card').forEach(card => card.classList.add('card-item'));
    });

    // Parallax effect for hero section
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        const heroContent = document.querySelector('.hero-content');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        ticking = false;
    }
    
    function requestParallax() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallax);

    // Smooth reveal for hero text
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('hero-revealed');
        }
    }, 300);

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('mobile-active');
                mobileMenuToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-toggle')) {
                navMenu.classList.remove('mobile-active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Pricing card interactions
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.pricing-card');
            const planName = card.querySelector('.plan-name').textContent;
            const planPrice = card.querySelector('.price').textContent;
            
            alert(`Bạn đã chọn gói: ${planName} - Giá: ${planPrice}`);
            
            // Add animation effect
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Feedback interactions
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.feedback-card');
            const authorName = card.querySelector('.author-name').textContent;
            alert(`Đọc thêm câu chuyện của ${authorName}...`);
        });
    });
    
    // Counter animation for achievements
    const statNumbers = document.querySelectorAll('.stat-number');
    let animationTriggered = false;
    
    function animateCounters() {
        if (animationTriggered) return;
        
        const achievementsSection = document.querySelector('.achievements');
        const rect = achievementsSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animationTriggered = true;
            
            statNumbers.forEach(stat => {
                const originalText = stat.textContent;
                const hasPlusSign = originalText.includes('+');
                const finalValue = parseInt(originalText.replace(/[,+]/g, ''));
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    
                    if (currentValue >= finalValue) {
                        currentValue = finalValue;
                        clearInterval(counter);
                    }
                    
                    const formattedNumber = Math.floor(currentValue).toLocaleString();
                    stat.textContent = hasPlusSign ? formattedNumber + '+' : formattedNumber;
                }, 30);
            });
        }
    }
    
    window.addEventListener('scroll', animateCounters);
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    // Create scroll progress indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxHeight) * 100;
        
        scrollIndicator.style.transform = `scaleX(${progress / 100})`;
        
        // Header background effect
        if (scrolled > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Smooth scroll to top functionality
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #d62829;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(214, 40, 41, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(20px)';
        }
    });
    
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'translateY(0) scale(1.1)';
        scrollToTopBtn.style.boxShadow = '0 8px 25px rgba(214, 40, 41, 0.4)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
        scrollToTopBtn.style.boxShadow = '0 4px 15px rgba(214, 40, 41, 0.3)';
    });

    // Enhanced text reveal animation
    const textRevealElements = document.querySelectorAll(`
        .hero-title, .hero-subtitle, .hero-greeting,
        .features-title, .achievements-title, .feedback-title h2, .pricing-title
    `);
    
    textRevealElements.forEach(element => {
        element.classList.add('text-reveal');
        observer.observe(element);
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Add smooth reveal for page load
    window.addEventListener('load', () => {
        document.body.classList.add('page-loaded');
        // Ensure we're at top after everything loads
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);
    });
    
    // Enhanced scroll effects for different sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                
                // Add specific effects for each section
                if (section.classList.contains('achievements')) {
                    // Trigger counter animation
                    animateCounters();
                    
                    // Stagger stat items
                    const statItems = section.querySelectorAll('.stat-item');
                    statItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                        }, index * 100);
                    });
                }
                
                if (section.classList.contains('feedback')) {
                    // Stagger feedback cards
                    const feedbackCards = section.querySelectorAll('.feedback-card');
                    feedbackCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 150);
                    });
                }
                
                if (section.classList.contains('pricing')) {
                    // Stagger pricing cards
                    const pricingCards = section.querySelectorAll('.pricing-card');
                    pricingCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe sections for enhanced animations
    document.querySelectorAll('.achievements, .feedback, .pricing').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Auth button interactions
    const loginBtn = document.querySelector('.auth-buttons .btn-primary');
    const signupBtn = document.querySelector('.auth-buttons .btn-outline');
    
    // View All feedback button
    const viewAllBtn = document.querySelector('.feedback-header .btn');
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Xem tất cả phản hồi...');
        });
    }
});

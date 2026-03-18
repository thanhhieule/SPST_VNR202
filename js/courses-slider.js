// Courses slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Page transition effect (similar to index.html)
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
        // Check if this is a direct page load or navigation
        const isDirectLoad = !document.referrer || !document.referrer.includes(window.location.hostname);
        
        if (isDirectLoad) {
            // Direct load - show immediately with class for styling
            pageContent.classList.add('direct-load');
        } else {
            // Navigation from another page - show with transition
            setTimeout(() => {
                pageContent.classList.add('show');
            }, 100);
        }
    }
    
    // Header visibility on page load (copied from main.js)
    const header = document.querySelector('.header');
    if (header) {
        setTimeout(() => {
            header.classList.add('header-visible');
        }, 100);
    }

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('mobile-active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            }
        });
    }

    // Modern smooth slider functionality - Manual control only
    const coursesContainer = document.querySelector('.courses-container');
    const originalCards = document.querySelectorAll('.course-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!coursesContainer || originalCards.length === 0) return;
    
    // Slider configuration
    let currentSlide = 0;
    const totalSlides = originalCards.length;
    const cardWidth = 285; // Width of each card + gap (260px card + 25px gap)
    const visibleCards = Math.floor((window.innerWidth - 100) / cardWidth); // Account for padding
    const maxSlide = Math.max(0, totalSlides - visibleCards);
    
    // Setup smooth slider
    function initializeSlider() {
        // Reset container position
        coursesContainer.style.transform = 'translateX(0)';
        
        // Setup hover effects for all cards
        setupHoverEffects();
    }
    
    // Smooth slide animation with pixel-perfect calculation
    function goToSlide(slideIndex, animate = true) {
        // Ensure slide index is within bounds
        currentSlide = Math.max(0, Math.min(slideIndex, maxSlide));
        
        // Calculate exact transform based on card width
        const translateX = -(currentSlide * cardWidth);
        
        if (animate) {
            coursesContainer.style.transition = 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)';
        } else {
            coursesContainer.style.transition = 'none';
        }
        
        coursesContainer.style.transform = `translateX(${translateX}px)`;
    }
    
    // Move to next slide with smooth push effect
    function nextSlide() {
        if (currentSlide < maxSlide) {
            currentSlide++;
            goToSlide(currentSlide);
        } else {
            // Smooth bounce effect when at the end
            coursesContainer.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            coursesContainer.style.transform = `translateX(${-(currentSlide * cardWidth) - 20}px)`;
            
            setTimeout(() => {
                coursesContainer.style.transition = 'transform 0.3s ease-out';
                coursesContainer.style.transform = `translateX(${-(currentSlide * cardWidth)}px)`;
            }, 150);
        }
    }
    
    // Move to previous slide with smooth push effect
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            goToSlide(currentSlide);
        } else {
            // Smooth bounce effect when at the beginning
            coursesContainer.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            coursesContainer.style.transform = `translateX(20px)`;
            
            setTimeout(() => {
                coursesContainer.style.transition = 'transform 0.3s ease-out';
                coursesContainer.style.transform = `translateX(0px)`;
            }, 150);
        }
    }

    // Setup hover effects for all cards
    function setupHoverEffects() {
        const allCards = coursesContainer.querySelectorAll('.course-card');
        allCards.forEach(card => {
            // Remove existing event listeners to prevent duplicates
            card.removeEventListener('mouseenter', cardHoverIn);
            card.removeEventListener('mouseleave', cardHoverOut);
            
            // Add event listeners
            card.addEventListener('mouseenter', cardHoverIn);
            card.addEventListener('mouseleave', cardHoverOut);
        });
    }

    // Card hover in effect
    function cardHoverIn() {
        const content = this.querySelector('.card-content');
        const overlay = this.querySelector('.card-overlay');
        const img = this.querySelector('.card-image img');
        
        // Show content
        if (content) {
            content.style.transform = 'translateY(0)';
            content.style.opacity = '1';
        }
        
        // Change overlay to yellow
        if (overlay) {
            overlay.style.background = 'linear-gradient(to bottom, rgba(252, 194, 74, 0.2) 0%, rgba(252, 194, 74, 0.6) 50%, rgba(252, 194, 74, 0.9) 100%)';
        }
        
        // Remove grayscale and scale image
        if (img) {
            img.style.filter = 'grayscale(0%) brightness(1)';
            img.style.transform = 'scale(1.1)';
        }
    }

    // Card hover out effect - Reset to grayscale state
    function cardHoverOut() {
        const content = this.querySelector('.card-content');
        const overlay = this.querySelector('.card-overlay');
        const img = this.querySelector('.card-image img');
        
        // Reset content to hidden state
        if (content) {
            content.style.transform = 'translateY(30px)';
            content.style.opacity = '0';
        }
        
        // Reset overlay to dark state
        if (overlay) {
            overlay.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.8) 100%)';
        }
        
        // Reset image to grayscale
        if (img) {
            img.style.filter = 'grayscale(100%) brightness(0.7)';
            img.style.transform = 'scale(1)';
        }
    }

    // Function to reset all cards to grayscale state
    function resetAllCardsToGrayscale() {
        const allCards = coursesContainer.querySelectorAll('.course-card');
        allCards.forEach(card => {
            // Skip cards that are currently being hovered
            if (!card.matches(':hover')) {
                cardHoverOut.call(card);
            }
        });
    }

    // Initialize slider
    initializeSlider();
    
    // Event listeners for manual controls only
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
    }
    
    // Reset all cards to grayscale state initially
    setTimeout(() => {
        resetAllCardsToGrayscale();
    }, 100);
    
    // No auto-play - manual control only
    
    // Smooth hover effects without auto-play interference
    coursesContainer.addEventListener('mouseenter', function() {
        // Just maintain smooth hover state
    });
    
    // Resume smooth state on mouse leave
    coursesContainer.addEventListener('mouseleave', function() {
        setTimeout(() => {
            resetAllCardsToGrayscale();
        }, 100);
    });

    // Handle responsive behavior with smooth transitions
    function handleResize() {
        const newVisibleCards = Math.floor((window.innerWidth - 100) / cardWidth);
        
        if (window.innerWidth <= 768) {
            coursesContainer.style.transform = 'translateX(0)';
            coursesContainer.style.transition = 'none';
            coursesContainer.style.overflowX = 'auto';
            coursesContainer.style.scrollBehavior = 'smooth';
        } else {
            coursesContainer.style.overflowX = 'visible';
            // Recalculate current slide position
            const newMaxSlide = Math.max(0, totalSlides - newVisibleCards);
            currentSlide = Math.min(currentSlide, newMaxSlide);
            goToSlide(currentSlide, false);
        }
    }

    // Initial resize check
    handleResize();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);

    // Image Expansion Effect
    function initImageExpansionEffect() {
        const courseCards = document.querySelectorAll('.course-card');
        const overlay = document.getElementById('imageExpansionOverlay');
        const expansionImage = document.getElementById('expansionImage');

        courseCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get course link
                const courseLink = this.getAttribute('data-course-link');
                if (!courseLink) return;

                // Get card image and its position
                const cardImage = this.querySelector('.card-image img');
                const cardRect = this.getBoundingClientRect();
                const cardImageRect = cardImage.getBoundingClientRect();

                // Add click feedback
                this.classList.add('clicked');
                setTimeout(() => this.classList.remove('clicked'), 150);

                // Start expansion effect
                startImageExpansion(cardImage.src, courseLink, cardImageRect);
            });
        });

        function startImageExpansion(imageSrc, courseLink, startRect) {
            // Set image source and initial position/size
            expansionImage.src = imageSrc;
            expansionImage.style.left = startRect.left + 'px';
            expansionImage.style.top = startRect.top + 'px';
            expansionImage.style.width = startRect.width + 'px';
            expansionImage.style.height = startRect.height + 'px';

            // Show overlay
            overlay.classList.add('active');

            // Start expansion animation
            setTimeout(() => {
                expansionImage.classList.add('expanding');
            }, 50);

            // Expand to full screen
            setTimeout(() => {
                expansionImage.classList.add('full-screen');
            }, 200);

            // Fade out and navigate
            setTimeout(() => {
                expansionImage.classList.add('fade-out');
                
                // Navigate after fade out
                setTimeout(() => {
                    window.location.href = courseLink;
                }, 800);
            }, 1200);
        }

        // Reset function (optional - for escape key)
        function resetExpansion() {
            overlay.classList.remove('active');
            expansionImage.classList.remove('expanding', 'full-screen', 'fade-out');
            setTimeout(() => {
                expansionImage.src = '';
                expansionImage.style.cssText = '';
            }, 300);
        }

        // Escape key to cancel
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                resetExpansion();
            }
        });
    }

    // Initialize image expansion effect
    initImageExpansionEffect();
});

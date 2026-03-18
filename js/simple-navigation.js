// Simple Navigation System - Override any conflicts
(function () {
    'use strict';

    function simpleNavigate(url) {

        // Show loader if available
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.style.display = 'flex';
            loader.classList.remove('fade-out');

            // Reset and start progress animation
            const progressBar = loader.querySelector('.progress-bar');
            const progressText = loader.querySelector('.progress-percentage');

            if (progressBar && progressText) {
                // Reset progress
                progressBar.style.width = '0%';
                progressText.textContent = '0%';

                // Animate progress from 0 to 100%
                let progress = 0;
                const duration = 750; // 0.75 seconds
                const increment = 100 / (duration / 50); // Update every 50ms

                const progressInterval = setInterval(() => {
                    progress += increment;

                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(progressInterval);

                        // Navigate after reaching 100%
                        setTimeout(() => {
                            window.location.href = url;
                        }, 100);
                    }

                    progressBar.style.width = progress + '%';
                    progressText.textContent = Math.round(progress) + '%';
                }, 50);
            } else {
                // Fallback if no progress elements
                setTimeout(() => {
                    window.location.href = url;
                }, 400);
            }
        } else {
            // No loader, navigate immediately
            window.location.href = url;
        }
    }

    function initSimpleNavigation() {
        // Handle all data-navigate elements
        const navElements = document.querySelectorAll('[data-navigate]');

        navElements.forEach((element, index) => {

            // Remove existing listeners
            element.onclick = null;

            element.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                const navType = this.getAttribute('data-navigate');
                let url = '';
                url = `${navType}.html`;
                simpleNavigate(url);
            }, true);
        });

        // Handle forms
        const forms = document.querySelectorAll('form[data-navigate-to]');

        forms.forEach(form => {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                e.stopPropagation();

                const url = this.getAttribute('data-navigate-to');
                simpleNavigate(url);
            }, true);
        });
    }

    // Initialize after DOM loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initSimpleNavigation, 150);
        });
    } else {
        setTimeout(initSimpleNavigation, 150);
    }

    // Make available globally
    window.simpleNavigate = simpleNavigate;
    window.initSimpleNavigation = initSimpleNavigation;

})();

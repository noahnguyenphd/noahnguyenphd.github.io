/**
 * Main JavaScript for Portfolio Website
 * Handles navigation, active states, and general utilities
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        // Load shared page fragments and then activate the current nav link
        loadSharedLayout();

        // Smooth scroll to top on page load
        window.scrollTo(0, 0);

        // Add event listeners for navigation links
        addNavigationListeners();
    });

    function loadPartial(url, selector) {
        const element = document.querySelector(selector);
        if (!element) {
            return Promise.resolve();
        }

        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${url}: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;
            })
            .catch(error => {
                console.warn(error);
            });
    }

    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            link.classList.toggle('active', href.toLowerCase() === currentPage);
        });
    }

    function loadSharedLayout() {
        Promise.all([
            loadPartial('includes/navigation.html', '#site-header'),
            loadPartial('includes/footer.html', '#site-footer')
        ]).then(() => {
            setActiveNavLink();
        });
    }

    function addNavigationListeners() {
        // Reserved for future navbar event handling. No nav click logic needed today.
    }

    function initMobileMenu() {
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        const navbar = document.querySelector('.navbar');

        if (toggleBtn && navbar) {
            toggleBtn.addEventListener('click', function() {
                navbar.classList.toggle('show');
            });
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Make scrollToTop available globally
    window.scrollToTop = scrollToTop;
})();

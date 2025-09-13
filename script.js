document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // Preloader
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500); // Delay to ensure content is rendered
        });
    }

    // 1. Navbar effect on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        // Call once on load to check initial position
        handleScroll();
    }

    // 2. Active navigation based on scroll position
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const activateNavLink = () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', activateNavLink);
    activateNavLink();

    // 3. Portfolio filter with Isotope
    const portfolioContainer = document.querySelector('.portfolio-container');
    if (portfolioContainer) {
        // Initialize Isotope
        const portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        // Event listener for filter buttons
        const portfolioFilters = document.querySelectorAll('#portfolio-filters li');
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', function(e) {
                e.preventDefault();

                // Remove active class from all filters
                portfolioFilters.forEach(el => el.classList.remove('filter-active'));
                
                // Add active class to the clicked filter
                this.classList.add('filter-active');

                // Perform filter
                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
            });
        });
    }

    // 4. 3D Tilt effect on Service Cards (Optional, but adds a dynamic effect)
    const cards = document.querySelectorAll('.card-3d');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = (y / (rect.height / 2)) * -7; // Max rotation 7 degrees
            const rotateY = (x / (rect.width / 2)) * 7;  // Max rotation 7 degrees

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

});
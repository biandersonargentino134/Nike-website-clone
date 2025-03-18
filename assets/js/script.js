// Global variables to track scroll position and timer
let lastScrollTop = 0;
let scrollTimer = null;
let isMobileView = window.innerWidth <= 960;

// Update mobile view status on resize
window.addEventListener('resize', function() {
    isMobileView = window.innerWidth <= 960;
});

// Header scroll behavior management
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const headerTop = document.querySelector('.header-top');
    const headerMain = document.querySelector('.header-main-section');
    const dropdownContent = document.querySelector('.dropdown-content');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = scrollTop - lastScrollTop;
    
    if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
    }

    // Prevent excessive scroll calculations by setting a minimum threshold
    if (Math.abs(scrollDelta) < 5) {
        return;
    }

    // Mobile view has different behavior
    if (isMobileView) {
        if (scrollDelta > 0 && scrollTop > 60) {
            // Scrolling down - hide header
            header.classList.add('header--hidden');
            header.classList.remove('header--compact');
        } else {
            // Scrolling up or at top - show header
            header.classList.remove('header--hidden');
        }
    } else {
        // Desktop behavior
        // Handle scrolling down behavior
        if (scrollDelta > 0) {
            // Scrolling down
            if (scrollTop > 200) {
                header.classList.add('header--hidden');
                header.classList.remove('header--compact');
                header.classList.remove('header-scrolled');
            } else if (scrollTop > headerTop.offsetHeight) {
                header.classList.add('header--compact');
                header.classList.add('header-scrolled');
                if (dropdownContent && dropdownContent.style.display === 'block') {
                    dropdownContent.style.top = '60px';
                }
            }
        } else {
            // Scrolling up
            header.classList.remove('header--hidden');
            
            if (scrollTop > headerTop.offsetHeight) {
                header.classList.add('header--compact');
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header--compact');
                header.classList.remove('header-scrolled');
                if (dropdownContent && dropdownContent.style.display === 'block') {
                    dropdownContent.style.top = '100%';
                }
            }
        }
    }

    // Reset header states when scrolled to top
    scrollTimer = setTimeout(() => {
        if (scrollTop <= 0) {
            header.classList.remove('header--hidden', 'header--compact', 'header-scrolled');
        }
    }, 150);

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Image Carousel/Scroll Container Implementation 
function initializeScrollContainer(sectionNum, scrollAmount) {
    const imageContainer = document.getElementById(`imageScrollContainers${sectionNum}`);
    const leftArrow = document.getElementById(`leftArrows${sectionNum}`);
    const rightArrow = document.getElementById(`rightArrows${sectionNum}`);

    function updateArrows() {
        const maxScrollLeft = imageContainer.scrollWidth - imageContainer.clientWidth;

        if (imageContainer.scrollLeft === 0) {
            leftArrow.style.backgroundColor = '#cdcdcd';
            leftArrow.style.color = '#000';
            rightArrow.style.backgroundColor = '#000';
            rightArrow.style.color = '#fff';
        } else if (imageContainer.scrollLeft >= maxScrollLeft - 1) {
            rightArrow.style.backgroundColor = '#cdcdcd';
            rightArrow.style.color = '#000';
            leftArrow.style.backgroundColor = '#000';
            leftArrow.style.color = '#fff';
        } else {
            leftArrow.style.backgroundColor = '#e7e7e7';
            leftArrow.style.color = '#000';
            rightArrow.style.backgroundColor = '#e7e7e7';
            rightArrow.style.color = '#000';
        }
    }

    leftArrow.addEventListener('click', () => {
        imageContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    rightArrow.addEventListener('click', () => {
        imageContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    imageContainer.addEventListener('scroll', updateArrows);
    updateArrows();
}

// Initialize all scroll containers
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollContainer(2, 750);  // Section 2
    initializeScrollContainer(3, 470);  // Section 3
    initializeScrollContainer(4, 470);  // Section 4

    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    if (menuToggle && closeMenu && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('active');
            }
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });

        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
            }
            document.body.style.overflow = ''; // Re-enable scrolling
        });

        // Close menu when clicking on the overlay
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            });
        }
    }
});




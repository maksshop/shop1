// Force scroll to top on page load
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeToggleDesktop = document.getElementById('dark-mode-toggle-desktop');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIconDesktop = document.querySelector('.sun-icon-desktop');
    const moonIconDesktop = document.querySelector('.moon-icon-desktop');
    
    // Check localStorage for saved preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    function applyDarkMode(enabled) {
        if (enabled) {
            document.body.classList.add('dark-mode');
            if (sunIcon) sunIcon.classList.add('hidden');
            if (moonIcon) moonIcon.classList.remove('hidden');
            if (sunIconDesktop) sunIconDesktop.classList.add('hidden');
            if (moonIconDesktop) moonIconDesktop.classList.remove('hidden');
        } else {
            document.body.classList.remove('dark-mode');
            if (sunIcon) sunIcon.classList.remove('hidden');
            if (moonIcon) moonIcon.classList.add('hidden');
            if (sunIconDesktop) sunIconDesktop.classList.remove('hidden');
            if (moonIconDesktop) moonIconDesktop.classList.add('hidden');
        }
    }
    
    // Apply initial state
    applyDarkMode(isDarkMode);
    
    // Toggle dark mode function
    function toggleDarkMode() {
        const isDark = document.body.classList.contains('dark-mode');
        applyDarkMode(!isDark);
        localStorage.setItem('darkMode', (!isDark).toString());
    }
    
    // Add event listeners to both buttons
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    if (darkModeToggleDesktop) {
        darkModeToggleDesktop.addEventListener('click', toggleDarkMode);
    }
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        // Handle both click and touch events for better mobile support
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
        
        mobileMenuButton.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-item').forEach(el => observer.observe(el));

    // Hover handled in CSS; no JS needed

    // Form validation and submission
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const firstName = this.querySelector('input[type="text"]').value;
            const lastName = this.querySelectorAll('input[type="text"]')[1].value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            if (!firstName || !lastName || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Navbar sticky behavior on scroll
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;
    let isScrolling = false;

    // Ensure navbar is always sticky
    if (navbar) {
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.left = '0';
        navbar.style.right = '0';
        navbar.style.zIndex = '50';
    }

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (navbar) {
            if (scrollTop > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }
        lastScrollTop = scrollTop;
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });

        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // Add CSS for image loading
    const imageStyle = document.createElement('style');
    imageStyle.textContent = `
        img {
            transition: opacity 0.3s ease;
            opacity: 0;
        }
        img.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(imageStyle);

    // Button ripple effect
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scrolltop';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    const scrollIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    scrollIcon.setAttribute('class', 'icon');
    scrollIcon.setAttribute('viewBox', '0 0 24 24');
    scrollIcon.setAttribute('aria-hidden', 'true');
    const scrollPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    scrollPath.setAttribute('d', 'M12 4l-7 7h4v9h6v-9h4z');
    scrollPath.setAttribute('fill', '#fff');
    scrollIcon.appendChild(scrollPath);
    scrollToTopBtn.appendChild(scrollIcon);
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) scrollToTopBtn.classList.add('show');
        else scrollToTopBtn.classList.remove('show');
    });

    // Image enlargement functionality for promotion section
    const enlargeImageElements = document.querySelectorAll('.enlarge-image');
    enlargeImageElements.forEach(element => {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchMoved = false;
        let touchStartTime = 0;
        
        // Handle touch start to detect scroll vs tap
        element.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchMoved = false;
            touchStartTime = Date.now();
        }, { passive: true });
        
        // Track touch movement
        element.addEventListener('touchmove', function(e) {
            const touchCurrentX = e.touches[0].clientX;
            const touchCurrentY = e.touches[0].clientY;
            const deltaX = Math.abs(touchCurrentX - touchStartX);
            const deltaY = Math.abs(touchCurrentY - touchStartY);
            
            // If moved more than 10px in any direction, consider it a scroll
            if (deltaX > 10 || deltaY > 10) {
                touchMoved = true;
            }
        }, { passive: true });
        
        // Handle touch end - only enlarge if it was a tap, not a scroll
        element.addEventListener('touchend', function(e) {
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            
            // Only trigger if:
            // 1. Touch didn't move (or moved very little - less than 10px)
            // 2. Touch duration was less than 300ms (quick tap, not a press)
            if (!touchMoved && touchDuration < 300) {
                e.preventDefault();
                e.stopPropagation();
                const imageSrc = this.getAttribute('data-image');
                enlargeImageFunction(imageSrc);
            }
        });
        
        // Handle click events for desktop
        element.addEventListener('click', function(e) {
            // Only handle click if not triggered by touch
            if (touchMoved) {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            const imageSrc = this.getAttribute('data-image');
            enlargeImageFunction(imageSrc);
        });
    });

    // Image enlargement function
    function enlargeImageFunction(imageSrc) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        // Close modal function
        function closeModal() {
            modal.remove();
            document.body.style.overflow = ''; // Restore scrolling
        }

        // Close on overlay click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Create enlarged image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'modal-image-wrap';

        // Create enlarged image
        const enlargedImage = document.createElement('img');
        enlargedImage.src = imageSrc;
        enlargedImage.className = 'modal-img';
        enlargedImage.alt = 'Enlarged promotional image';
        
        // Zoom state
        let currentScale = 1;
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let scrollLeft = 0;
        let scrollTop = 0;
        let initialDistance = 0;
        let initialScale = 1;
        
        // Apply transform
        function applyTransform() {
            enlargedImage.style.transform = `scale(${currentScale})`;
        }
        
        // Reset zoom
        function resetZoom() {
            currentScale = 1;
            applyTransform();
            enlargedImage.style.transformOrigin = 'center';
        }
        
        enlargedImage.addEventListener('load', function() {
            enlargedImage.classList.add('loaded');
        });
        if (enlargedImage.complete) {
            enlargedImage.classList.add('loaded');
        }
        
        // Click to close when not zoomed, double-click to zoom when zoomed
        let lastTap = 0;
        enlargedImage.addEventListener('click', function(e) {
            const now = Date.now();
            const isDoubleTap = (now - lastTap < 300 && !isDragging);
            
            if (currentScale === 1) {
                // When at normal zoom, single click closes modal
                e.stopPropagation();
                closeModal();
            } else if (isDoubleTap) {
                // When zoomed, double tap resets zoom
                e.preventDefault();
                e.stopPropagation();
                resetZoom();
            } else {
                // First tap when zoomed - just update lastTap for double tap detection
                lastTap = now;
            }
        });
        
        // Pinch-to-zoom for touch devices
        let touches = [];
        enlargedImage.addEventListener('touchstart', function(e) {
            touches = Array.from(e.touches);
            if (touches.length === 2) {
                e.preventDefault();
                const touch1 = touches[0];
                const touch2 = touches[1];
                initialDistance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                initialScale = currentScale;
            } else if (touches.length === 1 && currentScale > 1) {
                // Allow dragging when zoomed
                isDragging = true;
                startX = e.touches[0].pageX - enlargedImage.offsetLeft;
                startY = e.touches[0].pageY - enlargedImage.offsetTop;
            }
        }, { passive: false });
        
        enlargedImage.addEventListener('touchmove', function(e) {
            touches = Array.from(e.touches);
            if (touches.length === 2) {
                e.preventDefault();
                const touch1 = touches[0];
                const touch2 = touches[1];
                const currentDistance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                const scale = initialScale * (currentDistance / initialDistance);
                currentScale = Math.max(1, Math.min(scale, 4)); // Limit zoom between 1x and 4x
                applyTransform();
            } else if (isDragging && currentScale > 1) {
                e.preventDefault();
                const x = e.touches[0].pageX - startX;
                const y = e.touches[0].pageY - startY;
                enlargedImage.style.transform = `scale(${currentScale}) translate(${x / currentScale}px, ${y / currentScale}px)`;
            }
        }, { passive: false });
        
        enlargedImage.addEventListener('touchend', function(e) {
            if (touches.length <= 1) {
                isDragging = false;
            }
            if (e.touches.length === 0) {
                touches = [];
            }
        }, { passive: true });

        // Mouse wheel zoom
        enlargedImage.addEventListener('wheel', function(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const delta = e.deltaY > 0 ? 0.9 : 1.1;
                currentScale = Math.max(1, Math.min(currentScale * delta, 4));
                applyTransform();
            }
        }, { passive: false });
        
        // Create zoom controls
        const zoomControls = document.createElement('div');
        zoomControls.style.cssText = 'position: absolute; top: 8px; left: 8px; display: flex; gap: 8px; z-index: 1001;';
        
        const zoomInBtn = document.createElement('button');
        zoomInBtn.setAttribute('aria-label', 'Zoom in');
        zoomInBtn.style.cssText = 'background: rgba(0,0,0,0.6); border: none; border-radius: 8px; padding: 8px; cursor: pointer; color: #fff;';
        
        const zoomInSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        zoomInSvg.setAttribute('class', 'icon');
        zoomInSvg.setAttribute('viewBox', '0 0 24 24');
        zoomInSvg.setAttribute('style', 'width: 24px; height: 24px;');
        const zoomInPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        zoomInPath.setAttribute('d', 'M12 5v14m-7-7h14');
        zoomInPath.setAttribute('stroke', '#fff');
        zoomInPath.setAttribute('stroke-width', '2');
        zoomInPath.setAttribute('stroke-linecap', 'round');
        zoomInSvg.appendChild(zoomInPath);
        zoomInBtn.appendChild(zoomInSvg);
        zoomInBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentScale = Math.min(currentScale * 1.2, 4);
            applyTransform();
        });
        
        const zoomOutBtn = document.createElement('button');
        zoomOutBtn.setAttribute('aria-label', 'Zoom out');
        zoomOutBtn.style.cssText = 'background: rgba(0,0,0,0.6); border: none; border-radius: 8px; padding: 8px; cursor: pointer; color: #fff;';
        
        const zoomOutSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        zoomOutSvg.setAttribute('class', 'icon');
        zoomOutSvg.setAttribute('viewBox', '0 0 24 24');
        zoomOutSvg.setAttribute('style', 'width: 24px; height: 24px;');
        const zoomOutPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        zoomOutPath.setAttribute('d', 'M5 12h14');
        zoomOutPath.setAttribute('stroke', '#fff');
        zoomOutPath.setAttribute('stroke-width', '2');
        zoomOutPath.setAttribute('stroke-linecap', 'round');
        zoomOutSvg.appendChild(zoomOutPath);
        zoomOutBtn.appendChild(zoomOutSvg);
        zoomOutBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentScale = Math.max(currentScale / 1.2, 1);
            applyTransform();
        });
        
        const resetBtn = document.createElement('button');
        resetBtn.setAttribute('aria-label', 'Reset zoom');
        resetBtn.style.cssText = 'background: rgba(0,0,0,0.6); border: none; border-radius: 8px; padding: 8px; cursor: pointer; color: #fff;';
        
        const resetSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        resetSvg.setAttribute('class', 'icon');
        resetSvg.setAttribute('viewBox', '0 0 24 24');
        resetSvg.setAttribute('style', 'width: 24px; height: 24px;');
        const resetPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        resetPath.setAttribute('d', 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M3 21a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 16M21 21v-5h-5');
        resetPath.setAttribute('stroke', '#fff');
        resetPath.setAttribute('stroke-width', '2');
        resetPath.setAttribute('stroke-linecap', 'round');
        resetPath.setAttribute('stroke-linejoin', 'round');
        resetSvg.appendChild(resetPath);
        resetBtn.appendChild(resetSvg);
        resetBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            resetZoom();
        });
        
        zoomControls.appendChild(zoomInBtn);
        zoomControls.appendChild(zoomOutBtn);
        zoomControls.appendChild(resetBtn);

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
        closeButton.className = 'modal-close';
        closeButton.style.touchAction = 'none';
        closeButton.addEventListener('click', closeModal);
        closeButton.addEventListener('touchend', function(e) {
            e.preventDefault();
            closeModal();
        });

        // Assemble modal
        imageContainer.appendChild(enlargedImage);
        imageContainer.appendChild(zoomControls);
        imageContainer.appendChild(closeButton);
        modal.appendChild(imageContainer);
        document.body.appendChild(modal);
        
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';

        // Add keyboard support for closing
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
        
        // Initialize transform
        applyTransform();
    };

    // Removed phone number ripple enhancement to match simplified markup

    // Restaurant Image Carousel (local images only)
    const restaurantImages = [
        'img/restorant01.jpg',
        'img/restorant02.JPG',
        'img/restorant03.JPG',
        'img/restorant04.JPG',
        'img/restorant05.jpg',
        'img/restorant06.jpeg'
    ];

    const restaurantImageElement = document.querySelector('#restaurant-image');
    let currentImageIndex = 0;
    let isTransitioning = false;

    if (restaurantImageElement) {
        function changeRestaurantImage() {
            if (isTransitioning || restaurantImages.length === 0) return;

            isTransitioning = true;
            currentImageIndex = (currentImageIndex + 1) % restaurantImages.length;

            // Fade out
            restaurantImageElement.style.opacity = '0';

            setTimeout(() => {
                const nextSrc = restaurantImages[currentImageIndex];
                const probe = new Image();
                probe.onload = function() {
                    restaurantImageElement.src = nextSrc;
                    restaurantImageElement.classList.add('loaded');
                    // Fade in
                    setTimeout(() => {
                        restaurantImageElement.style.opacity = '1';
                        isTransitioning = false;
                    }, 50);
                };
                probe.onerror = function() {
                    // Skip missing image and try the next one
                    isTransitioning = false;
                    changeRestaurantImage();
                };
                probe.src = nextSrc;
            }, 800);
        }

        // Change image every 3 seconds
        setInterval(changeRestaurantImage, 3000);

        // Add smooth fade transition effect
        restaurantImageElement.style.transition = 'opacity 1s ease-in-out';
        restaurantImageElement.style.opacity = '1';
    }

    // Delivery Image Carousel
    const deliveryImages = [
        'img/delivery.jpg',
        'img/van.jpg',
        'img/dragalevci.JPG',
        'img/mladost.JPG'
    ];

    const deliveryImageElement = document.querySelector('#delivery-image');
    let currentDeliveryIndex = 0;
    let isDeliveryTransitioning = false;

    if (deliveryImageElement) {
        function changeDeliveryImage() {
            if (isDeliveryTransitioning || deliveryImages.length === 0) return;

            isDeliveryTransitioning = true;
            currentDeliveryIndex = (currentDeliveryIndex + 1) % deliveryImages.length;

            // Fade out
            deliveryImageElement.style.opacity = '0';

            setTimeout(() => {
                const nextSrc = deliveryImages[currentDeliveryIndex];

                // Preload next image
                const img = new Image();
                img.onload = () => {
                    deliveryImageElement.src = nextSrc;
                    deliveryImageElement.classList.add('loaded');

                    setTimeout(() => {
                        deliveryImageElement.style.opacity = '1';
                        isDeliveryTransitioning = false;
                    }, 50);
                };
                img.onerror = () => {
                    isDeliveryTransitioning = false;
                    changeDeliveryImage();
                };
                img.src = nextSrc;
            }, 1000);
        }

        // Change image every 3 seconds
        setInterval(changeDeliveryImage, 3000);

        // Add smooth fade transition effect
        deliveryImageElement.style.transition = 'opacity 1s ease-in-out';
        deliveryImageElement.style.opacity = '1';
    }
});

// TrustWay Digital - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu.classList.contains('active') && 
            !event.target.closest('.nav-menu') && 
            !event.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Update icon
            if (themeIcon) {
                if (document.body.classList.contains('dark-mode')) {
                    themeIcon.className = 'fas fa-sun';
                    localStorage.setItem('theme', 'dark');
                } else {
                    themeIcon.className = 'fas fa-moon';
                    localStorage.setItem('theme', 'light');
                }
            }
        });
    }
    
    // Language Toggle
    const langToggle = document.getElementById('langToggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const currentLang = this.textContent.includes('हिंदी') ? 'English' : 'हिंदी';
            this.innerHTML = `<i class="fas fa-language"></i> ${currentLang}`;
            // Here you would implement actual language switching
            console.log('Language switched to:', currentLang);
        });
    }
    
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // WhatsApp Widget
    const widgetClose = document.getElementById('widgetClose');
    const widgetOptions = document.querySelectorAll('.widget-option');
    const widgetInput = document.getElementById('widgetInput');
    const widgetSend = document.getElementById('widgetSend');
    const whatsappWidget = document.querySelector('.whatsapp-widget');
    
    // Show widget after 5 seconds
    setTimeout(() => {
        if (whatsappWidget && !localStorage.getItem('widgetClosed')) {
            whatsappWidget.classList.add('show');
        }
    }, 5000);
    
    // Close widget
    if (widgetClose) {
        widgetClose.addEventListener('click', function() {
            whatsappWidget.classList.remove('show');
            localStorage.setItem('widgetClosed', 'true');
        });
    }
    
    // Widget options
    if (widgetOptions) {
        widgetOptions.forEach(option => {
            option.addEventListener('click', function() {
                const message = this.getAttribute('data-message');
                window.open(`https://wa.me/919286224731?text=${encodeURIComponent(message)}`, '_blank');
            });
        });
    }
    
    // Send message from widget
    if (widgetSend && widgetInput) {
        widgetSend.addEventListener('click', function() {
            const message = widgetInput.value.trim();
            if (message) {
                window.open(`https://wa.me/919286224731?text=${encodeURIComponent(message)}`, '_blank');
                widgetInput.value = '';
            }
        });
        
        widgetInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                widgetSend.click();
            }
        });
    }
    
    // Animated Counters
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-count');
                    const increment = target / 100;
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current);
                            setTimeout(updateCounter, 20);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {

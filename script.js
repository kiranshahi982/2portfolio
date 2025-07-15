document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const toggleBall = document.querySelector('.toggle-ball');
    const html = document.documentElement;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    
    if (savedTheme === 'dark') {
        toggleBall.style.transform = 'translateX(30px)';
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            toggleBall.style.transform = 'translateX(30px)';
        } else {
            toggleBall.style.transform = 'translateX(0)';
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Link on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Typing Animation
    const typed = new Typed('.typing', {
        strings: ['Full Stack Developer', 'Software Enginer', 'Tech Enthusiast'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Sample projects data (in a real app, this might come from an API)
    const projects = [
        {
            id: 1,
            title: 'E-commerce Platform',
            category: 'web',
            description: 'A full-featured e-commerce platform with payment integration and admin dashboard.',
            image: 'https://via.placeholder.com/400x250',
            links: [
                { url: '#', icon: 'eye', text: 'Preview' },
                { url: '#', icon: 'code', text: 'Code' }
            ]
        },
        {
            id: 2,
            title: 'Fitness Tracker App',
            category: 'mobile',
            description: 'A mobile app to track workouts, nutrition, and progress with data visualization.',
            image: 'https://via.placeholder.com/400x250',
            links: [
                { url: '#', icon: 'eye', text: 'Preview' },
                { url: '#', icon: 'code', text: 'Code' }
            ]
        },
        {
            id: 3,
            title: 'Portfolio Website Design',
            category: 'design',
            description: 'Modern and responsive portfolio website design with custom animations.',
            image: 'https://via.placeholder.com/400x250',
            links: [
                { url: '#', icon: 'eye', text: 'Preview' },
                { url: '#', icon: 'code', text: 'Code' }
            ]
        },
        {
            id: 4,
            title: 'Task Management System',
            category: 'web',
            description: 'A collaborative task management system with real-time updates and team features.',
            image: 'https://via.placeholder.com/400x250',
            links: [
                { url: '#', icon: 'eye', text: 'Preview' },
                { url: '#', icon: 'code', text: 'Code' }
            ]
        },
        {
            id: 5,
            title: 'Recipe Sharing App',
            category: 'mobile',
            description: 'Mobile application for sharing and discovering recipes with social features.',
            image: 'https://via.placeholder.com/400x250',
            links: [
                { url: '#', icon: 'eye', text: 'Preview' },
                { url: '#', icon: 'code', text: 'Code' }
            ]
        },
        {
            id: 6,
            title: 'Brand Identity Design',
            category: 'design',
            description: 'Complete brand identity design including logo, colors, and typography system.',
            image: 'https://via.placeholder.com/400x250',
            links: [
                { url: '#', icon: 'eye', text: 'Preview' },
                { url: '#', icon: 'code', text: 'Code' }
            ]
        }
    ];
    
    // Display all projects initially
    displayProjects(projects);
    
    // Filter projects
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            if (filter === 'all') {
                displayProjects(projects);
            } else {
                const filteredProjects = projects.filter(project => project.category === filter);
                displayProjects(filteredProjects);
            }
        });
    });
    
    function displayProjects(projectsToDisplay) {
        projectsGrid.innerHTML = '';
        
        if (projectsToDisplay.length === 0) {
            projectsGrid.innerHTML = '<p class="no-projects">No projects found in this category.</p>';
            return;
        }
        
        projectsToDisplay.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-img">
                <div class="project-content">
                    <span class="project-category">${project.category}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-links">
                        ${project.links.map(link => `
                            <a href="${link.url}" class="project-link">
                                <i class="fas fa-${link.icon}"></i>
                                <span>${link.text}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
    }

    // Testimonials Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialSlides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide change every 5 seconds
    setInterval(nextSlide, 5000);

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.querySelector('.form-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send the form data to a server here
        // For this example, we'll just simulate a successful submission
        
        // Show success message
        formMessage.textContent = 'Your message has been sent successfully!';
        formMessage.classList.add('success');
        formMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skills-content, .about-content, .project-card, .skill-card, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.skills-content, .about-content, .project-card, .skill-card, .contact-content').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on page load in case elements are already in view
    animateOnScroll();

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Download CV button (simulated)
    const downloadCvBtn = document.querySelector('.download-cv');
    downloadCvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('In a real application, this would download your CV file.');
    });
});

// Typed.js for typing animation (you would need to include the Typed.js library)
// This is a fallback in case Typed.js is not loaded
if (typeof Typed === 'undefined') {
    console.warn('Typed.js not loaded - using fallback typing animation');
    const typingElement = document.querySelector('.typing');
    const strings = ['Full Stack Developer', 'Software Enginer', 'Tech Enthusiast'];
    let i = 0;
    let j = 0;
    let isDeleting = false;
    let currentString = '';
    
    function type() {
        currentString = strings[i];
        
        if (isDeleting) {
            typingElement.textContent = currentString.substring(0, j - 1);
            j--;
            
            if (j === 0) {
                isDeleting = false;
                i = (i + 1) % strings.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, 50);
            }
        } else {
            typingElement.textContent = currentString.substring(0, j + 1);
            j++;
            
            if (j === currentString.length) {
                isDeleting = true;
                setTimeout(type, 1000);
            } else {
                setTimeout(type, 100);
            }
        }
    }
    
    type();
}
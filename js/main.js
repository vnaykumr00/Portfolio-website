// =========================================
// MAIN.JS — Animations, Effects & Interactions
// =========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX - 4 + 'px';
            cursorDot.style.top = mouseY - 4 + 'px';
        });

        // Smooth outline follow
        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .glass-card, .skill-icon-card, input, textarea');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
        });
    }

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scroll-top');

    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        // Scroll to top button
        if (scrollTopBtn) {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Mobile menu ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    // --- Active nav link highlight ---
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function highlightNav() {
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(a => a.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 120;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    // Initial check
    revealOnScroll();

    // --- Typing Animation ---
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const texts = [
            'Java Full Stack Developer',
            'Microservices Architect',
            'Cloud Engineer',
            'Problem Solver',
            'Backend Specialist'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function typeText() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = 2000; // pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // pause before new word
            }

            setTimeout(typeText, typingSpeed);
        }

        typeText();
    }

    // --- Animated Skill Bars ---
    const skillFills = document.querySelectorAll('.skill-fill');

    function animateSkillBars() {
        skillFills.forEach(fill => {
            const rect = fill.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50 && !fill.classList.contains('animated')) {
                const width = fill.getAttribute('data-width');
                fill.style.setProperty('--target-width', width + '%');
                fill.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();

    // --- Particle Background ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min(80, Math.floor(canvas.width * canvas.height / 15000));
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const opacity = (1 - distance / 150) * 0.15;
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            animationId = requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        // Pause particles when tab not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animateParticles();
            }
        });
    }

    // --- Tilt Effect on Profile Image ---
    const tiltCard = document.querySelector('.tilt-card');
    if (tiltCard && window.innerWidth > 768) {
        tiltCard.addEventListener('mousemove', (e) => {
            const rect = tiltCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        tiltCard.addEventListener('mouseleave', () => {
            tiltCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }

    // --- Year in footer ---
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});

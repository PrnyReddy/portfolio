document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    
    cursor.className = 'cursor';
    cursorDot.className = 'cursor-dot';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorDotX = 0;
    let cursorDotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Add hover effect for clickable elements
        const target = e.target;
        if (target.tagName.toLowerCase() === 'a' ||
            target.tagName.toLowerCase() === 'button' ||
            target.classList.contains('project-card')) {
            cursor.style.transform = 'scale(1.5)';
            cursorDot.style.transform = 'scale(1.5)';
        } else {
            cursor.style.transform = 'scale(1)';
            cursorDot.style.transform = 'scale(1)';
        }
    });
    
    // Smooth cursor animation
    const animateCursor = () => {
        const easeFactor = 0.15;
        const dotEaseFactor = 0.2;
        
        cursorX += (mouseX - cursorX) * easeFactor;
        cursorY += (mouseY - cursorY) * easeFactor;
        cursorDotX += (mouseX - cursorDotX) * dotEaseFactor;
        cursorDotY += (mouseY - cursorDotY) * dotEaseFactor;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        cursorDot.style.left = `${cursorDotX}px`;
        cursorDot.style.top = `${cursorDotY}px`;
        
        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();

    // Static glitch effect for hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        heroTitle.style.animation = 'glitch 3s infinite linear alternate-reverse';
    }
});
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-category, .achievement-category').forEach(element => {
    element.classList.add('hidden');
    observer.observe(element);
});

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .hidden {
        opacity: 0;
        filter: blur(5px);
        transform: translateY(20px);
        transition: all 0.6s ease;
    }

    .fade-in {
        opacity: 1;
        filter: blur(0);
        transform: translateY(0);
    }

    .nav-links a.active {
        color: var(--accent-color);
    }

    @media (prefers-reduced-motion) {
        .hidden {
            transition: none;
        }
    }
`;
document.head.appendChild(style);

// Add hover effect to skills
document.querySelectorAll('.skill-category li').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.color = 'var(--accent-color)';
        this.style.transform = 'translateX(10px)';
        this.style.transition = 'all 0.3s ease';
    });

    skill.addEventListener('mouseleave', function() {
        this.style.color = '';
        this.style.transform = '';
    });
});
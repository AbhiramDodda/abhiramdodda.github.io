// Configuration - Update this once for all pages
const SITE_CONFIG = {
  lastUpdated: 'January 31, 2026',
  copyrightYear: '2026'
};

// Theme Toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(themeIcon, currentTheme);
    
    themeToggle.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme');
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(themeIcon, newTheme);
    });
  });
  
  function updateThemeIcon(icon, theme) {
    if (theme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }
  
  // Mobile Menu Toggle
  document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
    });
  
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-container')) {
        navLinks.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  
    // Close menu when window is resized
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Active Navigation Link
  document.addEventListener('DOMContentLoaded', () => {
    const currentPage = document.body.getAttribute('data-page');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active');
      }
    });
  });
  
  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll-based Animation Trigger
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up, .scale-in');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Animate only once
        }
      });
    }, {
      threshold: 0.1
    });
  
    animatedElements.forEach(el => observer.observe(el));
  });

  // Update footer with centralized date
  document.addEventListener('DOMContentLoaded', () => {
    const footerContent = document.querySelector('.footer-content p');
    if (footerContent) {
      footerContent.innerHTML = `&copy; ${SITE_CONFIG.copyrightYear} Abhiram Dodda. All rights reserved. Hosted by <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>. Last updated: ${SITE_CONFIG.lastUpdated}.`;
    }
  });

  // Background animation for projects page
  document.addEventListener('DOMContentLoaded', () => {
    if (document.body.getAttribute('data-page') === 'projects') {
      console.log('Projects page detected, creating floating shapes...');
      createFloatingShapes();
    }
  });

  function createFloatingShapes() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) {
      console.error('Projects section not found!');
      return;
    }

    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'floating-shapes';
    projectsSection.insertBefore(shapesContainer, projectsSection.firstChild);

    // Create 8 floating shapes with different sizes and speeds
    const shapes = [
      { size: 120, duration: 25, delay: 0, opacity: 0.08 },
      { size: 80, duration: 20, delay: 3, opacity: 0.1 },
      { size: 100, duration: 30, delay: 7, opacity: 0.09 },
      { size: 70, duration: 22, delay: 12, opacity: 0.11 },
      { size: 90, duration: 28, delay: 5, opacity: 0.1 },
      { size: 110, duration: 26, delay: 10, opacity: 0.09 },
      { size: 75, duration: 24, delay: 15, opacity: 0.1 },
      { size: 85, duration: 27, delay: 2, opacity: 0.095 }
    ];

    shapes.forEach((shape, index) => {
      const shapeElement = document.createElement('div');
      shapeElement.className = 'floating-shape';
      shapeElement.style.width = `${shape.size}px`;
      shapeElement.style.height = `${shape.size}px`;
      shapeElement.style.left = `${Math.random() * 100}%`;
      shapeElement.style.top = `${Math.random() * 100}%`;
      shapeElement.style.animationDuration = `${shape.duration}s`;
      shapeElement.style.animationDelay = `${shape.delay}s`;
      shapeElement.style.opacity = shape.opacity;
      
      // Alternate between circle and square shapes
      if (index % 2 === 0) {
        shapeElement.style.borderRadius = '50%';
      } else {
        shapeElement.style.borderRadius = '15%';
        shapeElement.style.transform = `rotate(${Math.random() * 360}deg)`;
      }
      
      shapesContainer.appendChild(shapeElement);
    });
    
    console.log(`Created ${shapes.length} floating shapes`);
  }
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
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
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
  
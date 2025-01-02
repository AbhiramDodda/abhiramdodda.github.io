// Theme Toggle
const themeToggleButton = document.getElementById('theme-toggle');
const themeIcon = themeToggleButton.querySelector('i');

// Check for saved user preference and set theme; default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
if (currentTheme === 'dark') {
  themeIcon.classList.replace('fa-moon', 'fa-sun');
} else {
  themeIcon.classList.replace('fa-sun', 'fa-moon');
}

themeToggleButton.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }
});

// Highlight Active Link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', event => {
    // Remove active class from all links
    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));

    // Add active class to the clicked link
    event.target.classList.add('active');

    // Close menu on mobile
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.remove('active');
  });
});


const navLinks = document.querySelectorAll('.nav-link');
const currentPage = document.body.dataset.page; // Add `data-page` to body in each HTML file

navLinks.forEach(link => {
  if (link.dataset.page === currentPage) {
    link.classList.add('active');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const nav = document.querySelector('nav');
  
  // Toggle menu
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
    // Toggle aria-expanded for accessibility
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains('mobile-active')) {
      navLinks.classList.remove('mobile-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when window is resized past mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 920 && navLinks.classList.contains('mobile-active')) {
      navLinks.classList.remove('mobile-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
});


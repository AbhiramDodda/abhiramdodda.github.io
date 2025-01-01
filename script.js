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

// Menu Toggle Functionality
const menuToggle = document.getElementById("menu-toggle");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


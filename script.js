// Theme Toggle Script
// Theme Toggle Script
const toggleCheckbox = document.getElementById('theme-toggle-checkbox');

// Function to apply the theme
const applyTheme = (theme) => {
    if (theme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
};

// Initialize theme on page load
const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark

applyTheme(savedTheme);

// Set the toggle state based on saved theme
if (savedTheme === 'dark') {
    toggleCheckbox.checked = true;
} else {
    toggleCheckbox.checked = false;
}

// Event listener for theme toggle
toggleCheckbox.addEventListener('change', function() {
    if (this.checked) {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
    }
});

// Hamburger Menu Script
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Active Link Highlighting
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80; // Adjust based on navbar height
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) {
            a.classList.add('active');
        }
    });
});

// Configuration - Update this once for all pages
const SITE_CONFIG = {
  lastUpdated: 'July 5, 2026',
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

// ===== BACKGROUND ANIMATIONS =====
// Uses z-index:-1 canvas element so it can never block clicks

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.getAttribute('data-page');
  if (page === 'publications') initPublicationsAnim();
  else if (page === 'blog')    initBlogAnim();
  else if (page === 'activities') initActivitiesAnim();
});

function makeCanvas() {
  const c = document.createElement('canvas');
  c.className = 'bg-canvas';
  c.width  = window.innerWidth;
  c.height = window.innerHeight;
  document.body.appendChild(c);
  window.addEventListener('resize', () => {
    c.width  = window.innerWidth;
    c.height = window.innerHeight;
  });
  return c;
}

/* --- Publications: drifting constellation --- */
function initPublicationsAnim() {
  const c = makeCanvas();
  const ctx = c.getContext('2d');
  const N = 22, DIST = 160;
  const color = [225, 106, 84];

  const nodes = Array.from({length: N}, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 1.5,
  }));

  function tick() {
    c.width = c.width; // clear
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > c.width)  n.vx *= -1;
      if (n.y < 0 || n.y > c.height) n.vy *= -1;
    });
    // lines
    for (let i = 0; i < N; i++) {
      for (let j = i+1; j < N; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < DIST) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${color},${(1-d/DIST)*0.18})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    // dots
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${color},0.35)`;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
}

/* --- Blog: rising particles --- */
function initBlogAnim() {
  const c = makeCanvas();
  const ctx = c.getContext('2d');
  const particles = [];
  const colors = [[225,106,84],[126,184,212],[201,169,110]];

  function spawn() {
    const col = colors[Math.floor(Math.random()*colors.length)];
    particles.push({
      x: Math.random() * c.width,
      y: c.height + 10,
      r: Math.random() * 2.5 + 1,
      vy: -(Math.random() * 0.6 + 0.3),
      vx: (Math.random() - 0.5) * 0.3,
      alpha: 0,
      fadeIn: true,
      col,
    });
  }

  for (let i = 0; i < 25; i++) {
    spawn();
    particles[i].y = Math.random() * c.height; // pre-scatter
  }
  setInterval(spawn, 1600);

  function tick() {
    c.width = c.width;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.fadeIn) { p.alpha = Math.min(p.alpha + 0.015, 0.7); if (p.alpha >= 0.7) p.fadeIn = false; }
      if (p.y < c.height * 0.1) p.alpha -= 0.008;
      if (p.alpha <= 0 || p.y < -20) { particles.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${p.col},${p.alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
}

/* --- Activities: slow gradient orbs via canvas --- */
function initActivitiesAnim() {
  const c = makeCanvas();
  const ctx = c.getContext('2d');
  const orbs = [
    { x: c.width*0.1,  y: c.height*0.2,  r: 300, col:[225,106,84],  ox:0, oy:0, spd:0.0004 },
    { x: c.width*0.8,  y: c.height*0.5,  r: 250, col:[100,160,220], ox:1, oy:0, spd:0.0003 },
    { x: c.width*0.3,  y: c.height*0.75, r: 220, col:[180,130,220], ox:2, oy:1, spd:0.0005 },
    { x: c.width*0.75, y: c.height*0.2,  r: 200, col:[80,200,160],  ox:3, oy:2, spd:0.00035 },
  ];
  let t = 0;

  function tick() {
    c.width = c.width;
    t += 1;
    orbs.forEach(o => {
      const cx = o.x + Math.sin(t * o.spd + o.ox) * 80;
      const cy = o.y + Math.cos(t * o.spd + o.oy) * 60;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r);
      grad.addColorStop(0,   `rgba(${o.col},0.12)`);
      grad.addColorStop(1,   `rgba(${o.col},0)`);
      ctx.beginPath();
      ctx.arc(cx, cy, o.r, 0, Math.PI*2);
      ctx.fillStyle = grad;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
}
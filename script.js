/* ============================================
   Ali Mehdi Portfolio — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==========================================
  // THEME MANAGEMENT
  // ==========================================
  const themeButtons = document.querySelectorAll('.theme-toggle-btn');
  const html = document.documentElement;

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(mode) {
    if (mode === 'system') {
      const systemTheme = getSystemTheme();
      html.setAttribute('data-theme', systemTheme);
    } else {
      html.setAttribute('data-theme', mode);
    }

    themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.themeOption === mode);
    });

    localStorage.setItem('theme-preference', mode);
  }

  // Initial theme
  const savedTheme = localStorage.getItem('theme-preference') || 'system';
  applyTheme(savedTheme);

  // Theme button clicks
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(btn.dataset.themeOption);
    });
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const current = localStorage.getItem('theme-preference') || 'system';
    if (current === 'system') {
      applyTheme('system');
    }
  });

  // ==========================================
  // TYPING ANIMATION
  // ==========================================
  const typingElement = document.getElementById('typingText');
  const roles = [
    'Full Stack Web Developer',
    'Cross-Platform Mobile App Dev',
    'AI Developer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
      } else {
        typingSpeed = 80 + Math.random() * 40; // Natural typing speed
      }
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before next word
      } else {
        typingSpeed = 40; // Faster deletion
      }
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Start typing after initial animations
  setTimeout(typeEffect, 1200);

  // ==========================================
  // NAVBAR SCROLL EFFECTS
  // ==========================================
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTop');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar shadow
    navbar.classList.toggle('scrolled', scrollY > 50);

    // Scroll to top button
    scrollTopBtn.classList.toggle('visible', scrollY > 400);

    // Active nav link based on scroll
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Scroll to top
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================
  // MOBILE MENU
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  // Close menu on link click
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });

  // ==========================================
  // SCROLL REVEAL ANIMATIONS (Enhanced)
  // ==========================================
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate, .stagger-children, [data-animate]'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Staggered animation for skill badges within data-animate containers
        if (entry.target.hasAttribute('data-animate')) {
          const badges = entry.target.querySelectorAll('.skill-badge');
          badges.forEach((badge, index) => {
            badge.style.transitionDelay = `${0.04 * (index + 1)}s`;
          });
        }
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // SMOOTH SCROLL FOR NAV LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // HERO CANVAS - Interactive Particle Grid
  // ==========================================
  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const heroSection = document.getElementById('home');
    let particles = [];
    let mouse = { x: null, y: null, active: false };
    let animationFrameId = null;

    function resizeCanvas() {
      canvas.width = heroSection.clientWidth;
      canvas.height = heroSection.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });

    heroSection.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 1.5;
        this.colorType = Math.random() > 0.55 ? 1 : 0; // 0 = blue, 1 = orange
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw(colors) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.colorType === 0 ? colors.primary + '0.2)' : colors.secondary + '0.2)';
        ctx.fill();
      }
    }

    function getColors() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      return {
        primary: isDark ? 'rgba(59, 130, 246, ' : 'rgba(37, 99, 235, ',
        secondary: 'rgba(249, 115, 22, ',
        line: isDark ? 'rgba(59, 130, 246, 0.05)' : 'rgba(37, 99, 235, 0.05)'
      };
    }

    function initParticles() {
      particles = [];
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 18000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    initParticles();
    window.addEventListener('resize', initParticles);

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = getColors();

      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw(colors);
      });

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.07;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].colorType === 0 ? colors.primary + `${alpha})` : colors.secondary + `${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw lines to mouse
      if (mouse.active) {
        particles.forEach(p => {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = p.colorType === 0 ? colors.primary + `${alpha})` : colors.secondary + `${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(tick);
    }

    // Only animate when visible using IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!animationFrameId) {
            tick();
          }
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      });
    }, { threshold: 0 });

    observer.observe(heroSection);
  }

  // Initialize Canvas Particles
  initHeroCanvas();

  // ==========================================
  // SKILL BADGE HOVER — maintain text color for light-bg brands
  // ==========================================
  document.querySelectorAll('.skill-badge[data-color]').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      // For badges that explicitly set dark text on hover (via inline style)
      // the CSS handles it, no JS needed
    });
  });

  // Initial scroll check
  handleScroll();
});

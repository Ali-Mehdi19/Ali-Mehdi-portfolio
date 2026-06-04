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
  // PARALLAX EFFECT ON HERO BG IMAGE
  // ==========================================
  const heroBgImage = document.querySelector('.hero-bg-image');
  if (heroBgImage) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = document.querySelector('.hero').offsetHeight;
      if (scrollY < heroHeight) {
        const parallaxOffset = scrollY * 0.3;
        heroBgImage.style.transform = `translateY(${parallaxOffset}px)`;
      }
    }, { passive: true });
  }

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

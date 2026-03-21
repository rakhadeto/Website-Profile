/* ============================================
   NAUFAL RAKHADETO — PROFILE WEBSITE
   script.js · Interactions & Animations
   ============================================ */

/* --- Year --- */
document.getElementById('year').textContent = new Date().getFullYear();

/* --- Dynamic greeting based on time --- */
function setGreeting() {
  const hour = new Date().getHours();
  let greeting;
  if (hour >= 5 && hour < 12)
    greeting = "Good morning! Selamat datang di halaman profil saya — semoga harimu produktif! ☀️";
  else if (hour >= 12 && hour < 17)
    greeting = "Halo! Glad you stopped by — feel free to explore and connect. 👋";
  else if (hour >= 17 && hour < 21)
    greeting = "Good evening! Terima kasih sudah mampir — let's build something cool together. 🌆";
  else
    greeting = "Haloo, masih melek juga ya? Thanks for visiting! Let's connect. 🌙";

  const el = document.getElementById('dynamic-greeting');
  if (el) el.textContent = greeting;
}
setGreeting();

/* ============================================
   TAB SWITCHING
   ============================================ */
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPages  = document.querySelectorAll('.tab-page');
const bnBtns    = document.querySelectorAll('.bn-btn');

function switchTab(targetId) {
  // deactivate all
  tabBtns.forEach(b  => b.classList.remove('active'));
  bnBtns.forEach(b   => b.classList.remove('active'));
  tabPages.forEach(p => p.classList.remove('active'));

  // activate target
  document.querySelectorAll(`[data-tab="${targetId}"]`).forEach(b => b.classList.add('active'));
  const page = document.getElementById(`tab-${targetId}`);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // if about tab, animate skill bars
  if (targetId === 'about') {
    setTimeout(animateSkillBars, 300);
  }
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});
bnBtns.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

/* CTA buttons on home page */
document.querySelectorAll('[data-goto]').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.goto));
});

/* ============================================
   SKILL BARS ANIMATION
   ============================================ */
function animateSkillBars() {
  document.querySelectorAll('.sbi-fill').forEach(bar => {
    const pct = bar.getAttribute('data-pct');
    bar.style.width = pct + '%';
  });
}

/* ============================================
   STAGGERED ENTRY ANIMATIONS
   ============================================ */
function staggerItems(selector, delay = 80, baseDelay = 200) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = `opacity 0.45s ease ${baseDelay + i * delay}ms, transform 0.45s ease ${baseDelay + i * delay}ms`;
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 50);
    });
  });
}

// Observe tab pages and trigger animations when they become active
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      const target = mutation.target;
      if (target.classList.contains('active')) {
        if (target.id === 'tab-home') {
          staggerItems('#tab-home .chip', 80, 400);
        }
        if (target.id === 'tab-contact') {
          staggerItems('#tab-contact .link-card', 90, 200);
        }
        if (target.id === 'tab-about') {
          staggerItems('#tab-about .about-card', 80, 100);
          setTimeout(animateSkillBars, 500);
        }
      }
    }
  });
});

tabPages.forEach(page => observer.observe(page, { attributes: true }));

/* Initial load animations */
setTimeout(() => staggerItems('#tab-home .chip', 80, 0), 600);

/* ============================================
   RIPPLE EFFECT ON LINK CARDS
   ============================================ */
const style = document.createElement('style');
style.textContent = `@keyframes ripple { from{width:0;height:0;opacity:.8} to{width:220px;height:220px;opacity:0} }`;
document.head.appendChild(style);

document.querySelectorAll('.link-card').forEach(card => {
  card.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = card.getBoundingClientRect();
    Object.assign(ripple.style, {
      position: 'absolute',
      left: `${e.clientX - rect.left}px`,
      top: `${e.clientY - rect.top}px`,
      background: 'rgba(255,255,255,0.06)',
      borderRadius: '50%',
      transform: 'translate(-50%,-50%)',
      pointerEvents: 'none',
      animation: 'ripple 0.6s ease-out forwards'
    });
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

/* ============================================
   PARALLAX BLOBS (desktop)
   ============================================ */
if (window.matchMedia('(min-width: 820px)').matches) {
  const blobs = document.querySelectorAll('.blob');
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    blobs.forEach((b, i) => {
      const d = (i + 1) * 12;
      b.style.transform = `translate(${dx*d}px, ${dy*d}px)`;
    });
  });
}

/* ============================================
   HERO CARD 3D TILT (desktop)
   ============================================ */
const heroCard = document.querySelector('.hero-card');
if (heroCard && window.matchMedia('(min-width: 820px)').matches) {
  heroCard.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 12;
    heroCard.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.02)`;
    heroCard.style.transition = 'transform 0.1s ease';
  });
  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = '';
    heroCard.style.transition = 'transform 0.5s ease';
  });
}

/* ============================================
   TYPING CURSOR on nav logo
   ============================================ */
const logo = document.querySelector('.nav-logo');
if (logo) {
  let visible = true;
  setInterval(() => {
    logo.style.opacity = visible ? '0.7' : '1';
    visible = !visible;
  }, 1200);
}

/* ============================================
   NAV STATUS TEXT cycle
   ============================================ */
const navStatus = document.getElementById('nav-status');
if (navStatus) {
  const statuses = ['Available', 'Open to Work', 'Let\'s Connect'];
  let si = 0;
  setInterval(() => {
    si = (si + 1) % statuses.length;
    navStatus.style.opacity = '0';
    navStatus.style.transition = 'opacity 0.4s';
    setTimeout(() => {
      navStatus.textContent = statuses[si];
      navStatus.style.opacity = '1';
    }, 400);
  }, 3500);
}

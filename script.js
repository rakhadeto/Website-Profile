/* ============================================
   NAUFAL RAKHADETO — script.js  (scroll version)
   ============================================ */

// ── Year ──
document.getElementById('year').textContent = new Date().getFullYear();

// ── Greeting ──
var hour = new Date().getHours();
var greeting;
if      (hour >= 5  && hour < 12) greeting = "Good morning! Selamat datang di halaman profil saya — semoga harimu produktif! ☀️";
else if (hour >= 12 && hour < 17) greeting = "Halo! Glad you stopped by — feel free to explore and connect. 👋";
else if (hour >= 17 && hour < 21) greeting = "Good evening! Terima kasih sudah mampir — let's build something cool together. 🌆";
else                               greeting = "Haloo, masih melek juga ya? Thanks for visiting! Let's connect. 🌙";
document.getElementById('dynamic-greeting').textContent = greeting;

// ── SMOOTH SCROLL to section ──
// used by nav buttons, CTA buttons, and bottom nav
function scrollToSection(id) {
  var target = document.getElementById(id);
  if (!target) return;
  var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
  var top = target.getBoundingClientRect().top + window.pageYOffset - navH;
  window.scrollTo({ top: top, behavior: 'smooth' });
}

// Nav top buttons
document.querySelectorAll('.tab-btn[data-target]').forEach(function(btn) {
  btn.addEventListener('click', function() { scrollToSection(this.getAttribute('data-target')); });
});

// CTA buttons (data-target on home section)
document.querySelectorAll('[data-target]').forEach(function(btn) {
  if (btn.tagName === 'BUTTON') {
    btn.addEventListener('click', function() { scrollToSection(this.getAttribute('data-target')); });
  }
});

// Bottom nav buttons
document.querySelectorAll('.bn-btn[data-target]').forEach(function(btn) {
  btn.addEventListener('click', function() { scrollToSection(this.getAttribute('data-target')); });
});

// ── ACTIVE NAV HIGHLIGHT on scroll (IntersectionObserver) ──
var sections   = document.querySelectorAll('.section');
var navBtns    = document.querySelectorAll('.tab-btn');
var bottomBtns = document.querySelectorAll('.bn-btn');
var navH       = 64; // fallback

function setActiveNav(id) {
  navBtns.forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-target') === id);
  });
  bottomBtns.forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-target') === id);
  });
}

// Use IntersectionObserver — fires when section crosses 30% of viewport
var ioNav = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) setActiveNav(entry.target.id);
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

sections.forEach(function(s) { ioNav.observe(s); });

// ── SCROLL-REVEAL (IntersectionObserver) ──
var ioReveal = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // once visible, trigger skill bars if inside about section
      var fill = entry.target.querySelectorAll('.sbi-fill');
      if (fill.length) {
        setTimeout(function() {
          fill.forEach(function(bar) { bar.style.width = bar.getAttribute('data-pct') + '%'; });
        }, 300);
      }
      ioReveal.unobserve(entry.target); // only animate once
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(function(el) { ioReveal.observe(el); });

// ── RIPPLE on link cards ──
document.querySelectorAll('.link-card').forEach(function(card) {
  card.addEventListener('click', function(e) {
    var r = document.createElement('span');
    var rect = card.getBoundingClientRect();
    r.style.cssText = [
      'position:absolute',
      'left:' + (e.clientX - rect.left) + 'px',
      'top:'  + (e.clientY - rect.top)  + 'px',
      'background:rgba(255,255,255,0.06)',
      'border-radius:50%',
      'transform:translate(-50%,-50%)',
      'pointer-events:none',
      'animation:ripple 0.6s ease-out forwards'
    ].join(';');
    card.appendChild(r);
    setTimeout(function() { r.remove(); }, 650);
  });
});

// ── PARALLAX BLOBS (desktop) ──
if (window.matchMedia('(min-width:820px)').matches) {
  document.addEventListener('mousemove', function(e) {
    var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    var dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
    document.querySelectorAll('.blob').forEach(function(b, i) {
      var d = (i + 1) * 12;
      b.style.transform = 'translate(' + (dx*d) + 'px,' + (dy*d) + 'px)';
    });
  });

  // Hero card tilt
  var hc = document.querySelector('.hero-card');
  if (hc) {
    hc.addEventListener('mousemove', function(e) {
      var rect = hc.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
      var y = ((e.clientY - rect.top)  / rect.height - 0.5) * 12;
      hc.style.transform = 'perspective(600px) rotateX(' + (-y) + 'deg) rotateY(' + x + 'deg) scale(1.02)';
      hc.style.transition = 'transform 0.1s ease';
    });
    hc.addEventListener('mouseleave', function() {
      hc.style.transform = '';
      hc.style.transition = 'transform 0.5s ease';
    });
  }
}

// ── NAV STATUS CYCLE ──
var ns  = document.getElementById('nav-status');
var sts = ['Available', 'Open to Work', "Let's Connect"];
var si  = 0;
setInterval(function() {
  si = (si + 1) % sts.length;
  ns.style.opacity = '0';
  setTimeout(function() { ns.textContent = sts[si]; ns.style.opacity = '1'; }, 400);
}, 3500);

/* =============================================
   NAUFAL RAKHADETO — script.js
   ============================================= */

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Greeting
var h = new Date().getHours();
var g;
if      (h >= 5  && h < 12) g = "Good morning! Selamat datang — semoga harimu produktif! \u2600\uFE0F";
else if (h >= 12 && h < 17) g = "Halo! Glad you stopped by — feel free to explore and connect. \uD83D\uDC4B";
else if (h >= 17 && h < 21) g = "Good evening! Terima kasih sudah mampir \u2014 let's build something cool. \uD83C\uDF06";
else                         g = "Haloo, masih melek juga ya? Thanks for visiting! \uD83C\uDF19";
document.getElementById('dynamic-greeting').textContent = g;

// ── SMOOTH SCROLL ──
function goTo(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var nh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
  var top = el.getBoundingClientRect().top + window.pageYOffset - nh;
  window.scrollTo({ top: top, behavior: 'smooth' });
}

// All buttons with data-target
document.querySelectorAll('[data-target]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    goTo(this.getAttribute('data-target'));
  });
});

// ── ACTIVE NAV on scroll ──
var sections = document.querySelectorAll('.section');
var allNavBtns = document.querySelectorAll('[data-target]');

function setActive(id) {
  allNavBtns.forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-target') === id);
  });
}

var io = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) setActive(e.target.id);
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

sections.forEach(function(s) { io.observe(s); });

// ── SCROLL REVEAL ──
var ioReveal = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    // animate skill bars when visible
    e.target.querySelectorAll('.skill-fill').forEach(function(bar) {
      setTimeout(function() {
        bar.style.width = bar.getAttribute('data-pct') + '%';
      }, 300);
    });
    ioReveal.unobserve(e.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function(el) {
  ioReveal.observe(el);
});

// ── RIPPLE on link cards ──
document.querySelectorAll('.link-card').forEach(function(card) {
  card.addEventListener('click', function(e) {
    var r = document.createElement('span');
    var rect = card.getBoundingClientRect();
    r.style.cssText = 'position:absolute;border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;background:rgba(255,255,255,0.06);animation:ripple .6s ease-out forwards;left:' + (e.clientX - rect.left) + 'px;top:' + (e.clientY - rect.top) + 'px';
    card.appendChild(r);
    setTimeout(function() { r.remove(); }, 650);
  });
});

// ── PARALLAX BLOBS desktop ──
if (window.matchMedia('(min-width:820px)').matches) {
  document.addEventListener('mousemove', function(e) {
    var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    var dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
    document.querySelectorAll('.blob').forEach(function(b, i) {
      var d = (i + 1) * 12;
      b.style.transform = 'translate(' + dx * d + 'px,' + dy * d + 'px)';
    });
  });

  // hero card tilt
  var hc = document.querySelector('.hero-card');
  if (hc) {
    hc.addEventListener('mousemove', function(e) {
      var r = hc.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width - .5) * 12;
      var y = ((e.clientY - r.top) / r.height - .5) * 12;
      hc.style.transform = 'perspective(600px) rotateX(' + (-y) + 'deg) rotateY(' + x + 'deg) scale(1.02)';
      hc.style.transition = 'transform .1s ease';
    });
    hc.addEventListener('mouseleave', function() {
      hc.style.transform = '';
      hc.style.transition = 'transform .5s ease';
    });
  }
}

// ── NAV STATUS CYCLE ──
var ns = document.getElementById('nav-status');
var sts = ['Available', 'Open to Work', "Let's Connect"];
var si = 0;
setInterval(function() {
  si = (si + 1) % sts.length;
  ns.style.opacity = '0';
  setTimeout(function() { ns.textContent = sts[si]; ns.style.opacity = '1'; }, 400);
}, 3500);

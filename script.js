/* ============================================
   NAUFAL RAKHADETO — script.js
   ============================================ */

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Greeting
var hour = new Date().getHours();
var greeting;
if (hour >= 5 && hour < 12)
  greeting = "Good morning! Selamat datang di halaman profil saya — semoga harimu produktif! ☀️";
else if (hour >= 12 && hour < 17)
  greeting = "Halo! Glad you stopped by — feel free to explore and connect. 👋";
else if (hour >= 17 && hour < 21)
  greeting = "Good evening! Terima kasih sudah mampir — let's build something cool together. 🌆";
else
  greeting = "Haloo, masih melek juga ya? Thanks for visiting! Let's connect. 🌙";
document.getElementById('dynamic-greeting').textContent = greeting;

// ── TAB SWITCHING ──
function switchTab(id) {
  document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
  document.querySelectorAll('.bn-btn').forEach(function(b) { b.classList.remove('active'); });
  document.querySelectorAll('.tab-page').forEach(function(p) { p.classList.remove('active'); });
  document.querySelectorAll('[data-tab="' + id + '"]').forEach(function(b) { b.classList.add('active'); });
  var pg = document.getElementById('tab-' + id);
  if (pg) { pg.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  if (id === 'about') setTimeout(animateSkillBars, 300);
}

document.querySelectorAll('.tab-btn').forEach(function(b) {
  b.addEventListener('click', function() { switchTab(this.getAttribute('data-tab')); });
});
document.querySelectorAll('.bn-btn').forEach(function(b) {
  b.addEventListener('click', function() { switchTab(this.getAttribute('data-tab')); });
});
document.querySelectorAll('[data-goto]').forEach(function(b) {
  b.addEventListener('click', function() { switchTab(this.getAttribute('data-goto')); });
});

// ── SKILL BARS ──
function animateSkillBars() {
  document.querySelectorAll('.sbi-fill').forEach(function(bar) {
    bar.style.width = bar.getAttribute('data-pct') + '%';
  });
}

// ── RIPPLE on link cards ──
document.querySelectorAll('.link-card').forEach(function(card) {
  card.addEventListener('click', function(e) {
    var r = document.createElement('span');
    var rect = card.getBoundingClientRect();
    r.style.cssText = 'position:absolute;left:' + (e.clientX - rect.left) + 'px;top:' + (e.clientY - rect.top) + 'px;background:rgba(255,255,255,0.06);border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;animation:ripple 0.6s ease-out forwards';
    card.appendChild(r);
    setTimeout(function() { r.remove(); }, 650);
  });
});

// ── PARALLAX BLOBS (desktop only) ──
if (window.matchMedia('(min-width:820px)').matches) {
  document.addEventListener('mousemove', function(e) {
    var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    var dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
    document.querySelectorAll('.blob').forEach(function(b, i) {
      var d = (i + 1) * 12;
      b.style.transform = 'translate(' + (dx * d) + 'px,' + (dy * d) + 'px)';
    });
  });

  // ── HERO CARD TILT ──
  var hc = document.querySelector('.hero-card');
  if (hc) {
    hc.addEventListener('mousemove', function(e) {
      var rect = hc.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      var y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
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
var ns = document.getElementById('nav-status');
var sts = ['Available', 'Open to Work', "Let's Connect"];
var si = 0;
setInterval(function() {
  si = (si + 1) % sts.length;
  ns.style.opacity = '0';
  ns.style.transition = 'opacity 0.4s';
  setTimeout(function() { ns.textContent = sts[si]; ns.style.opacity = '1'; }, 400);
}, 3500);

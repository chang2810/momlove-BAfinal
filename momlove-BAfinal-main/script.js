// Enable scroll-reveal only when JavaScript is available; content remains visible otherwise.
document.documentElement.classList.add('js-motion');

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
  navToggle.querySelector('span').textContent = isOpen ? '×' : '☰';
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Mở menu');
    navToggle.querySelector('span').textContent = '☰';
  })
);

const nav = document.getElementById('nav');
const navItems = [...navLinks.querySelectorAll('a[href^="#"]')];
const sections = navItems
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function updateActiveNavigation() {
  const readingLine = window.innerHeight * 0.38;
  const activeSection = sections.reduce((current, section) =>
    section.getBoundingClientRect().top <= readingLine ? section : current, null);

  navItems.forEach(link => {
    const isActive = activeSection && link.getAttribute('href') === `#${activeSection.id}`;
    link.classList.toggle('is-active', isActive);
    if (isActive) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

let scrollTicking = false;
function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  nav.classList.toggle('nav-scrolled', scrollTop > 16);
  updateActiveNavigation();
  scrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(handleScroll);
}, { passive: true });

updateActiveNavigation();

// Gently reveal content as it enters the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.14 });

document.querySelectorAll('.chart-card, .interview-card, .persona-card, .bpmn-item, .todo-box, .figma-wrap, .cf-table, .gap-box, .ps-list').forEach(element => element.classList.add('reveal'));
document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
  revealObserver.observe(element);
});

// ---------- Cursor star trail ----------
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let lastStarPosition = { x: -100, y: -100 };
const starColors = ['#00D9FF', '#7C5CFF', '#FF4FA3', '#FFD84D', '#38E39B'];

function addCursorStar(x, y) {
  const star = document.createElement('span');
  star.className = 'cursor-star';
  star.setAttribute('aria-hidden', 'true');
  star.textContent = Math.random() > 0.55 ? '✦' : '✧';
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;
  star.style.setProperty('--star-size', `${13 + Math.random() * 14}px`);
  star.style.setProperty('--star-rotate', `${-25 + Math.random() * 50}deg`);
  star.style.setProperty('--star-color', starColors[Math.floor(Math.random() * starColors.length)]);
  document.body.append(star);
  star.addEventListener('animationend', () => star.remove());
}

window.addEventListener('pointermove', (event) => {
  if (reduceMotion.matches || event.pointerType === 'touch') return;

  const distance = Math.hypot(event.clientX - lastStarPosition.x, event.clientY - lastStarPosition.y);
  if (distance < 28) return;

  lastStarPosition = { x: event.clientX, y: event.clientY };
  addCursorStar(event.clientX, event.clientY);
}, { passive: true });

// ---------- Chart.js: TMĐT growth ----------
const inkSoft = '#5C5145';
const gridColor = '#E1D9C4';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = inkSoft;

new Chart(document.getElementById('chartTmdt'), {
  type: 'line',
  data: {
    labels: ['2018','2019','2020','2022','2023','2024','2025'],
    datasets: [{
      data: [8, 10.8, 11.8, 16.4, 20.5, 25, 31],
      borderColor: '#43604A',
      backgroundColor: 'rgba(67,96,74,0.12)',
      fill: true, tension: 0.25, borderWidth: 2, pointRadius: 3,
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { callback: v => v + ' tỷ' }, grid: { color: gridColor } },
      x: { grid: { display: false } }
    }
  }
});

// ---------- Chart.js: Review influence ----------
new Chart(document.getElementById('chartReview'), {
  type: 'bar',
  data: {
    labels: ['Xem ≥2-3 review/tư vấn\ntrước khi mua SP mới', 'Từng đổi quyết định mua\nsau khi đọc thảo luận trong group'],
    datasets: [{
      data: [70, 58],
      backgroundColor: '#E39159',
      borderRadius: 6,
    }]
  },
  options: {
    indexAxis: 'y',
    plugins: { legend: { display: false } },
    scales: {
      x: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' }, grid: { color: gridColor } },
      y: { grid: { display: false } }
    }
  }
});

// ---------- Chart.js: Facebook groups fragmentation ----------
new Chart(document.getElementById('chartFb'), {
  type: 'bar',
  data: {
    labels: ['Hội mẹ bỉm sữa buôn bán', 'Hội nuôi con bằng sữa mẹ - VN', 'Làm cha mẹ - Cộng đồng cha mẹ VN', 'Nhóm chuyên đồ trẻ em (ví dụ)', 'Mua bán mẹ bỉm TP.HCM', 'Nhóm khu vực nhỏ (ví dụ)'],
    datasets: [{
      data: [505, 484, 177, 124, 78.5, 34.9],
      backgroundColor: '#778D7A',
      borderRadius: 6,
    }]
  },
  options: {
    indexAxis: 'y',
    plugins: { legend: { display: false } },
    scales: {
      x: { beginAtZero: true, ticks: { callback: v => v + 'k' }, grid: { color: gridColor } },
      y: { grid: { display: false }, ticks: { font: { size: 11 } } }
    }
  }
});

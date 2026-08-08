// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

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


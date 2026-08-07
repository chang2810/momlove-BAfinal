// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ---------- Chart.js: TMĐT growth ----------
const inkSoft = '#55604F';
const gridColor = '#DAD7C8';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = inkSoft;

new Chart(document.getElementById('chartTmdt'), {
  type: 'line',
  data: {
    labels: ['2018','2019','2020','2022','2023','2024','2025'],
    datasets: [{
      data: [8, 10.8, 11.8, 16.4, 20.5, 25, 31],
      borderColor: '#3F6B54',
      backgroundColor: 'rgba(63,107,84,0.12)',
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
      backgroundColor: '#AE4A6E',
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
      backgroundColor: '#C99A3D',
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

// ---------- Mermaid ERD ----------
import mermaid from 'https://esm.sh/mermaid@11/dist/mermaid.esm.min.mjs';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    primaryColor: '#E1EAE1',
    primaryBorderColor: '#3F6B54',
    lineColor: '#55604F',
    textColor: '#202A20',
  },
});

const erdDefinition = `erDiagram
  USER ||--o| VENDOR : "co gian hang"
  VENDOR ||--o{ PRODUCT : "ban"
  CATEGORY ||--o{ PRODUCT : "phan loai"
  CATEGORY ||--o{ FORUM_POST : "phan loai"
  USER ||--o| CART : "so huu"
  CART ||--o{ CART_ITEM : "chua"
  PRODUCT ||--o{ CART_ITEM : "duoc them"
  USER ||--o{ ORDERS : "dat"
  ORDERS ||--o{ ORDER_ITEM : "gom"
  PRODUCT ||--o{ ORDER_ITEM : "duoc dat"
  ORDERS ||--|| PAYMENT : "thanh toan qua"
  USER ||--o{ PRODUCT_REVIEW : "viet"
  PRODUCT ||--o{ PRODUCT_REVIEW : "nhan"
  ORDERS ||--o{ PRODUCT_REVIEW : "xac thuc"
  ORDER_ITEM ||--o{ RETURN_REQUEST : "bi khieu nai"
  USER ||--o{ RETURN_REQUEST : "yeu cau"
  USER ||--o{ FORUM_POST : "dang"
  FORUM_POST ||--o{ COMMENT : "co"
  USER ||--o{ COMMENT : "viet"
  COMMENT ||--o{ HELPFUL_VOTE : "nhan"
  USER ||--o{ HELPFUL_VOTE : "danh gia"
  USER ||--o{ NOTIFICATION : "nhan"
  USER ||--o{ REPORT : "gui"
  USER ||--o{ MESSAGE : "gui"

  USER {
    int user_id PK
    string full_name
    string email UK
    string phone
    string role "buyer/vendor/admin"
    datetime created_at
  }
  VENDOR {
    int vendor_id PK
    int user_id FK
    string shop_name
    string business_license_no
    string license_status "pending/verified/rejected"
    datetime verified_at
  }
  CATEGORY {
    int category_id PK
    string name
    string type "product/forum_topic"
  }
  PRODUCT {
    int product_id PK
    int vendor_id FK
    int category_id FK
    string name
    decimal price
    int stock_qty
    string status
  }
  CART {
    int cart_id PK
    int user_id FK
  }
  CART_ITEM {
    int cart_item_id PK
    int cart_id FK
    int product_id FK
    int quantity
  }
  ORDERS {
    int order_id PK
    int user_id FK
    decimal total_amount
    string status "cart/pending/paid/shipped/completed"
    datetime created_at
  }
  ORDER_ITEM {
    int order_item_id PK
    int order_id FK
    int product_id FK
    int quantity
    decimal unit_price
  }
  PAYMENT {
    int payment_id PK
    int order_id FK
    string method
    decimal amount
    string status
    datetime paid_at
  }
  PRODUCT_REVIEW {
    int review_id PK
    int product_id FK
    int user_id FK
    int order_id FK
    int rating
    string content
    datetime created_at
  }
  RETURN_REQUEST {
    int return_id PK
    int order_item_id FK
    int user_id FK
    string reason
    string status
    int resolved_by FK
    datetime created_at
  }
  FORUM_POST {
    int post_id PK
    int user_id FK
    int category_id FK
    string title
    string content
    string type "hoi_dap/chia_se"
    datetime created_at
  }
  COMMENT {
    int comment_id PK
    int post_id FK
    int user_id FK
    string content
    datetime created_at
  }
  HELPFUL_VOTE {
    int vote_id PK
    int comment_id FK
    int user_id FK
    datetime created_at
  }
  NOTIFICATION {
    int notification_id PK
    int user_id FK
    string type
    string content
    boolean is_read
    datetime created_at
  }
  REPORT {
    int report_id PK
    int reporter_id FK
    string target_type "review/post/comment"
    int target_id
    string reason
    string status "pending/resolved"
    int resolved_by FK
    datetime created_at
  }
  MESSAGE {
    int message_id PK
    int sender_id FK
    int receiver_id FK
    string content
    datetime sent_at
  }`;

const erdEl = document.getElementById('erdDiagram');
erdEl.textContent = erdDefinition;
mermaid.run({ nodes: [erdEl] });

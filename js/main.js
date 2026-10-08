document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollSpy();
  initGameFilter();
  initCountdownTimer();
});

function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !mainNav) return;

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

function initGameFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const gameCards = document.querySelectorAll('.game-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      gameCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function salinKodeVoucher() {
  const couponText = document.getElementById('couponCode').innerText;
  const alertEl = document.getElementById('copyNotification');
  const copyBtn = document.getElementById('copyCouponBtn');

  navigator.clipboard.writeText(couponText).then(() => {
    alertEl.innerText = `✓ Kode "${couponText}" berhasil disalin ke clipboard!`;
    copyBtn.innerText = 'Tersalin!';
    copyBtn.style.backgroundColor = '#10b981';

    setTimeout(() => {
      copyBtn.innerText = 'Salin Kode';
      copyBtn.style.backgroundColor = '';
      alertEl.innerText = '';
    }, 4000);
  }).catch(() => {
    alertEl.innerText = `Kode voucher: ${couponText}`;
  });
}

function initCountdownTimer() {
  let totalSeconds = 14 * 3600 + 45 * 60 + 20;

  const hoursEl = document.getElementById('hoursVal');
  const minutesEl = document.getElementById('minutesVal');
  const secondsEl = document.getElementById('secondsVal');

  if (!hoursEl || !minutesEl || !secondsEl) return;

  const interval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(interval);
      return;
    }

    totalSeconds--;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    hoursEl.innerText = String(hours).padStart(2, '0');
    minutesEl.innerText = String(minutes).padStart(2, '0');
    secondsEl.innerText = String(seconds).padStart(2, '0');
  }, 1000);
}

function beliGame(namaGame) {
  const modal = document.getElementById('orderModal');
  const modalTitle = document.getElementById('modalGameTitle');
  const selectedGame = document.getElementById('selectedGameName');
  const waBtn = document.getElementById('whatsappCheckoutBtn');

  if (!modal) return;

  modalTitle.innerText = `Beli Game: ${namaGame}`;
  selectedGame.innerText = namaGame;

  const pesanWA = encodeURIComponent(`Halo Admin GameZone Store, saya ingin memesan game "${namaGame}" original. Mohon informasi cara pembayaran dan pengiriman CD Key.`);
  waBtn.href = `https://wa.me/6282296117166?text=${pesanWA}`;

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

function tutupModal() {
  const modal = document.getElementById('orderModal');
  if (modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }
}

window.addEventListener('click', (event) => {
  const modal = document.getElementById('orderModal');
  if (event.target === modal) {
    tutupModal();
  }
});

function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const subject = document.getElementById('gameSubject').value;
  const message = document.getElementById('userMessage').value.trim();
  const alertBox = document.getElementById('formSuccessAlert');
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (!name || !email || !message) {
    alert('Mohon lengkapi semua kolom formulir yang bertanda bintang (*).');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerText = 'Mengirim Pesan...';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerText = 'Kirim Pesan';

    alertBox.style.display = 'block';
    alertBox.innerHTML = `<strong>Terima kasih, ${escapeHtml(name)}!</strong> Pesan Anda terkait "<em>${escapeHtml(subject)}</em>" telah berhasil terkirim. Tim support GameZone Store akan segera membalas ke email <strong>${escapeHtml(email)}</strong>.`;

    form.reset();

    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 8000);
  }, 700);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

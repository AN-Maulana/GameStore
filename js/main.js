document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollSpy();
  initGameFilter();
  initCountdownTimer();
  initArticles();
  checkUrlHashForArticle();
});

/* ==========================================================================
   Mobile Navigation & ScrollSpy
   ========================================================================== */

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
      const sectionTop = current.offsetTop - 110;
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

/* ==========================================================================
   Game Catalog Filter
   ========================================================================== */

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

/* ==========================================================================
   Voucher Promo & Timer
   ========================================================================== */

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

/* ==========================================================================
   Order Game Modal
   ========================================================================== */

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

/* ==========================================================================
   Contact Form Handler
   ========================================================================== */

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
  return text ? String(text).replace(/[&<>"']/g, m => map[m]) : '';
}

/* ==========================================================================
   10 ARTIKEL DUNIA PER-GAME-AN (DATABASE & KONTEN LENGKAP)
   ========================================================================== */

const articlesData = [
  {
    id: "art-1",
    category: "rekomendasi",
    categoryLabel: "Rekomendasi Game",
    badgeClass: "badge-rekomendasi",
    title: "7 Game PC Grafis Paling Memukau Tahun Ini yang Wajib Kamu Coba",
    excerpt: "Eksplorasi deretan mahakarya visual dengan teknologi Unreal Engine 5, Full Path Tracing, dan DLSS 3.5 yang mendorong batasan kartu grafis gaming modern.",
    image: "images/article-pc-graphics.jpg",
    author: "Dimas Arya (Tech & Reviewer)",
    date: "14 Oktober 2026",
    readTime: "5 menit baca",
    relatedGame: "Cyberpunk 2077 & Black Myth: Wukong",
    contentHtml: `
      <p>Industri video game PC telah melangkah ke era baru di mana batas antara dunia nyata dan grafis komputer semakin tipis. Hadirnya <strong>Unreal Engine 5</strong> dengan sistem pencahayaan <em>Lumen</em> dan geometri mikro-poligon <em>Nanite</em>, dikombinasikan dengan kartu grafis generasi terbaru berfitur <strong>Path Tracing</strong>, menyuguhkan visual spektakuler yang belum pernah terbayangkan sebelumnya.</p>
      
      <p>Bagi Anda yang baru saja merakit PC gaming idaman atau ingin menguji kemampuan maksimal GPU Anda, berikut adalah 7 game PC dengan grafis paling memukau dan realistis yang wajib Anda rasakan langsung!</p>

      <h3>1. Black Myth: Wukong</h3>
      <p>Game aksi adaptasi mitologi klasik "Perjalanan ke Barat" ini memukau gamer seluruh dunia sejak hari pertama rilis. Dibangun di atas Unreal Engine 5.4, detail bulu Sun Wukong, cipratan air di danau hutan, hingga ukiran batu kuil kuno Tiongkok tampak nyata berkat teknologi Nanite. Pantulan cahaya di baju zirah dan armor musuh membuat setiap pertempuran terasa epik bak film bioskop layar lebar.</p>

      <h3>2. Cyberpunk 2077: Phantom Liberty</h3>
      <p>Dengan mode <strong>Ray Tracing Overdrive (Full Path Tracing)</strong>, distrik Dogtown di Night City menjadi tolak ukur standar grafis PC modern. Setiap kubangan air memantulkan kilauan neon kota secara akurat, pencahayaan dalam ruangan terasa natural tanpa trik baked-lighting, dan model karakter terlihat sangat hidup.</p>

      <h3>3. Alan Wake 2</h3>
      <p>Mahakarya Remedy Entertainment ini menawarkan tata cahaya volumetrik dan bayangan paling mencekam dalam sejarah game psychological horror. Hutan Pacific Northwest yang berkabut tebal dan dimensi surealis The Dark Place membuktikan bahwa tata pencahayaan yang presisi mampu menghadirkan atmosfer horor yang begitu mendalam.</p>

      <h3>4. Senua's Saga: Hellblade II</h3>
      <p>Jika ada game yang layak disebut "interactive movie", inilah jawabannya. Menggunakan fotogrametri pulau Islandia asli dan animasi wajah MetaHuman, ekspresi emosional Senua saat berbisik dan bertarung terasa mengerikan sekaligus memukau.</p>

      <h3>5. Horizon Forbidden West Complete Edition</h3>
      <p>Porting PC yang dikerjakan oleh Nixxes Software ini merupakan teladan optimasi terbaik. Dari helai rambut Aloy, kulit logam robot binatang purba, hingga vegetasi rimba tropis dan reruntuhan San Francisco di bawah air, semuanya tersaji dengan warna yang luar biasa tajam dan dukungan ultrawide monitor yang mulus.</p>

      <h3>6. Avatar: Frontiers of Pandora</h3>
      <p>Ditenagai Snowdrop Engine milik Ubisoft, planet Pandora digambarkan secara spektakuler. Hutan lebat yang bercahaya di malam hari (bioluminescence) dan hembusan angin yang menggoyangkan dedaunan secara dinamis menghadirkan sensasi menjelajahi dunia asing yang organik.</p>

      <h3>7. Red Dead Redemption 2</h3>
      <p>Meskipun dirilis beberapa tahun lalu, karya Rockstar Games ini tetap menjadi salah satu tolok ukur visual terhebat. Fisika lumpur, jejak salju tebal, simulasi cuaca badai petir, dan pencahayaan matahari terbit di atas tebing liar Amerika Barat belum tertandingi oleh banyak game baru sekalipun.</p>

      <div class="pro-tip-box">
        <strong>💡 Pro-Tip Optimasi Visual:</strong>
        Untuk memainkan game-game berat di atas tanpa stuttering, aktifkan teknologi upscaling AI seperti <strong>NVIDIA DLSS 3.5</strong> (dengan Frame Generation) atau <strong>AMD FSR 3</strong> pada profil <em>Quality</em>. Anda akan mendapatkan peningkatan FPS hingga 50-70% tanpa kehilangan ketajaman gambar!
      </div>

      <div class="article-table-wrapper">
        <table class="article-table">
          <thead>
            <tr>
              <th>Target Resolusi</th>
              <th>Rekomendasi Kartu Grafis (GPU)</th>
              <th>Kapasitas VRAM</th>
              <th>Estimasi FPS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1080p (Full HD)</td>
              <td>RTX 4060 / RX 7600</td>
              <td>8 GB GDDR6</td>
              <td>60 - 80 FPS (High)</td>
            </tr>
            <tr>
              <td>1440p (2K QHD)</td>
              <td>RTX 4070 Super / RX 7800 XT</td>
              <td>12 - 16 GB GDDR6</td>
              <td>75 - 110 FPS (Ultra)</td>
            </tr>
            <tr>
              <td>2160p (4K UHD)</td>
              <td>RTX 4080 Super / RTX 4090</td>
              <td>16 - 24 GB GDDR6X</td>
              <td>80 - 120 FPS (Max Path Tracing)</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },
  {
    id: "art-2",
    category: "hardware",
    categoryLabel: "Hardware & Setup",
    badgeClass: "badge-hardware",
    title: "Panduan Memilih Komponen PC Gaming Pemula: Hemat Tanpa Korbankan FPS",
    excerpt: "Tips merakit PC gaming impian dengan alokasi budget cerdas antara prosesor, kartu grafis (GPU), RAM dual-channel, hingga power supply berkualitas.",
    image: "images/article-pc-gaming.jpg",
    author: "Rian Hermawan (Hardware Enthusiast)",
    date: "12 Oktober 2026",
    readTime: "6 menit baca",
    relatedGame: "Katalog Hardware & Game PC",
    contentHtml: `
      <p>Merakit PC gaming untuk pertama kalinya sering kali terasa membingungkan. Begitu banyak istilah teknis seperti <em>bottleneck</em>, <em>VRAM</em>, <em>PCIe 4.0</em>, hingga profil <em>XMP</em>. Banyak pemula terjebak menghabiskan uang jutaan rupiah untuk komponen yang salah, sehingga performa gaming yang didapat tidak optimal.</p>

      <p>Prinsip dasar merakit PC gaming hemat namun bertenaga adalah: <strong>Keseimbangan Antar Komponen</strong>. Berikut panduan langkah demi langkah memilih suku cadang yang tepat agar setiap rupiah yang Anda investasikan menghasilkan FPS maksimal!</p>

      <h3>1. Alokasikan 40% - 50% Budget untuk Kartu Grafis (GPU)</h3>
      <p>Kartu grafis adalah motor penggerak utama frame rate game. Jangan menghabiskan uang untuk prosesor Core i9 atau casing RGB mahal jika kartu grafis yang Anda beli hanya kelas entry-level. Untuk standar gaming modern 1080p dan 1440p, pilihlah GPU dengan VRAM minimal <strong>8GB GDDR6</strong> (seperti RTX 4060 atau RX 7600) agar tidak kehabisan memori tekstur saat memuat game berat.</p>

      <h3>2. Prosesor (CPU): Kelas Mainstream Sudah Lebih dari Cukup</h3>
      <p>Banyak pemula salah kaprah mengira gaming membutuhkan prosesor kelas workstation. Padahal, prosesor 6-core / 12-thread seperti <strong>Intel Core i5-13400F</strong> atau <strong>AMD Ryzen 5 7600</strong> sudah sangat kencang dan tidak akan menjadi bottleneck bagi GPU kelas menengah hingga atas.</p>

      <h3>3. RAM Wajib Dual-Channel (Minimal 16GB atau 32GB)</h3>
      <p>Jangan pernah membeli RAM 1 keping (single channel)! Menggunakan konfigurasi <strong>Dual Channel (2x8GB atau 2x16GB)</strong> menggandakan bandwidth data dari prosesor ke memori, yang secara instan menghilangkan micro-stuttering dan meningkatkan <em>1% low FPS</em> secara signifikan.</p>

      <h3>4. Storage: Jangan Sentuh HDD untuk Game Modern, Pilih SSD NVMe!</h3>
      <p>Game open-world generasi sekarang seperti Cyberpunk 2077 dan Starfield mewajibkan media penyimpanan <strong>SSD NVMe M.2 (PCIe Gen4)</strong>. SSD dengan kecepatan baca 5000 MB/s membuat loading map yang dulunya memakan waktu 1 menit di HDD menjadi hanya 4-6 detik saja!</p>

      <h3>5. Jangan Pernah Berhemat di Power Supply (PSU)</h3>
      <p>Ini adalah kesalahan paling fatal pemula: membeli PSU abal-abal "bawaan casing". PSU yang buruk dapat meledak atau menghantarkan tegangan tidak stabil yang merusak motherboard dan kartu grafis Anda. Selalu pilih PSU dengan sertifikasi minimal <strong>80 Plus Bronze</strong> atau <strong>80 Plus Gold</strong> dari merek terpercaya (Corsair, Seasonic, be quiet!, MSI, atau Cooler Master).</p>

      <div class="pro-tip-box">
        <strong>⚡ Golden Rule Perakitan PC Gaming:</strong>
        Jangan beli komponen berdasarkan tampilan lampu RGB terlebih dahulu. Prioritaskan: <strong>GPU > CPU > RAM Dual Channel > SSD NVMe > PSU Bersertifikat > Casing dengan Airflow Jaring (Mesh)</strong>.
      </div>

      <h3>Contoh Alokasi Budget Merakit PC 10 Juta - 12 Juta:</h3>
      <ul>
        <li><strong>GPU:</strong> RTX 4060 8GB / RX 7600 8GB (~Rp 4.800.000)</li>
        <li><strong>CPU:</strong> Intel Core i5-12400F / Ryzen 5 5600 (~Rp 1.700.000)</li>
        <li><strong>Motherboard:</strong> B760M / B550M (~Rp 1.400.000)</li>
        <li><strong>RAM:</strong> 16GB (2x8GB) DDR4 3200MHz (~Rp 650.000)</li>
        <li><strong>SSD:</strong> 1TB NVMe PCIe Gen4 (~Rp 1.050.000)</li>
        <li><strong>PSU:</strong> 650W 80+ Bronze Bersertifikasi (~Rp 750.000)</li>
        <li><strong>Casing + Kipas:</strong> Mesh Mid-Tower (~Rp 550.000)</li>
      </ul>
    `
  },
  {
    id: "art-3",
    category: "wawasan",
    categoryLabel: "Tips & Edukasi",
    badgeClass: "badge-wawasan",
    title: "Bahaya Game Bajakan vs Keuntungan Nyata Beli Game Original",
    excerpt: "Kenapa lisensi original jauh lebih hemat dibanding risiko kehilangan data, malware crypto-miner tersembunyi, dan crash dari installer game bajakan.",
    image: "images/article-original-games.jpg",
    author: "Tim Keamanan Digital GameZone",
    date: "10 Oktober 2026",
    readTime: "4 menit baca",
    relatedGame: "Koleksi Game Original Steam & EA",
    contentHtml: `
      <p>Masih banyak yang menganggap bahwa mendownload game bajakan atau "tani" adalah cara pintar untuk bermain game gratis. Namun di era kejahatan siber modern saat ini, ungkapan <em>"If you are not paying for the product, you are the product"</em> benar-benar terbukti nyata.</p>

      <p>Faktanya, para pembajak game tidak merilis file crack secara sukarela demi amal. Berdasarkan riset lembaga keamanan siber internasional, lebih dari <strong>72% installer game bajakan</strong> di situs-situs repack terindikasi mengandung malware berbahaya yang disamarkan dengan sangat rapi.</p>

      <h3>Ancaman Nyata di Balik File Crack &amp; Repack:</h3>
      <ul>
        <li><strong>Silent Crypto-Miner:</strong> Malware yang diam-diam menggunakan 90% daya kartu grafis dan listrik rumah Anda untuk menambang cryptocurrency milik hacker. Akibatnya, GPU Anda menjadi cepat rusak karena overheat konstan.</li>
        <li><strong>Info-Stealer &amp; Token Logger:</strong> Trojan yang menyalin seluruh password tersimpan di browser, akun WhatsApp Web, cookie sesi login, hingga mencuri akun Steam dan Discord Anda.</li>
        <li><strong>Ransomware:</strong> Seluruh file tugas kuliah, foto keluarga, dan dokumen kerja Anda dienkripsi dan dikunci. Hacker akan meminta tebusan uang jutaan rupiah untuk membukanya.</li>
      </ul>

      <h3>5 Keuntungan Nyata Menggunakan Game Original:</h3>
      
      <h4>1. Cloud Save Otomatis Tanpa Takut Hilang</h4>
      <p>Bermain di warnet, laptop kantor, atau ganti PC baru? Cukup login akun Steam atau Epic Games, seluruh save data, level karakter, dan checkpoint Anda akan langsung tersinkronisasi otomatis dalam hitungan detik.</p>

      <h4>2. Update Bug Patch &amp; Konten Baru Otomatis</h4>
      <p>Game modern selalu merilis update perbaikan performa pasca-rilis. Pemilik game original cukup duduk manis dan launcher akan mendownload patch secara otomatis. Pengguna bajakan sering kali terjebak crash berulang-ulang di chapter tengah karena tidak bisa menginstal patch resmi.</p>

      <h4>3. Akses Penuh ke Mode Multiplayer Resmi</h4>
      <p>Tidak ada yang menandingi keseruan main bareng (mabar) dengan teman-teman di server resmi dengan ping stabil dan perlindungan anti-cheat. Game bajakan umumnya mematikan seluruh akses koneksi multiplayer online.</p>

      <h4>4. Fitur Steam Workshop &amp; Mod Legal</h4>
      <p>Ingin memasang mod grafis, skin karakter anime, atau peta kustom baru? Cukup klik tombol <em>"Subscribe"</em> di Steam Workshop, dan game Anda langsung ter-modifikasi tanpa risiko virus!</p>

      <h4>5. Harga Game Original Kini Sangat Terjangkau!</h4>
      <p>Dengan hadirnya <strong>GameZone Store</strong>, Anda tidak perlu lagi merogoh kocek dalam-dalam. Kami menyediakan diskon spesial regional Indonesia hingga 70%, promo bundle harian, dan garansi resmi seumur hidup.</p>

      <div class="info-tip-box">
        <strong>🛡️ Komitmen GameZone Store:</strong>
        Semua CD Key dan kode lisensi yang kami jual dijamin 100% legal, resmi dari publisher global, dan bebas risiko banned akun. Lindungi PC dan data pribadi Anda dengan beralih ke game original!
      </div>
    `
  },
  {
    id: "art-4",
    category: "tips",
    categoryLabel: "Tips & Optimasi",
    badgeClass: "badge-tips",
    title: "10 Cara Ampuh Optimasi Windows & Setting Game untuk Dongkrak FPS",
    excerpt: "Maksimalkan performa PC kentang menjadi lancar jaya dengan 10 langkah optimasi Windows, driver grafis, dan pengaturan in-game yang tepat.",
    image: "images/article-fps-boost.jpg",
    author: "Faisal Tanjung (Tuning & Overclock)",
    date: "08 Oktober 2026",
    readTime: "7 menit baca",
    relatedGame: "Game Esports & AAA Ringan",
    contentHtml: `
      <p>Apakah Anda sering mengalami drop FPS saat pertempuran ramai di game seperti Cyberpunk, GTA V, atau Apex Legends? Jangan buru-buru membeli kartu grafis baru! Sering kali masalahnya bukan terletak pada hardware, melainkan sistem operasi Windows dan setting in-game yang belum dioptimalkan.</p>

      <p>Terapkan 10 trik optimasi berikut untuk mendongkrak frame rate PC Anda hingga <strong>20 - 40% lebih kencang</strong> dan bebas stuttering!</p>

      <h3>1. Aktifkan Hardware-accelerated GPU Scheduling (HAGS)</h3>
      <p>Fitur bawaan Windows 10/11 ini memungkinkan kartu grafis mengelola memori videonya secara mandiri tanpa membebani antrian CPU. Cara aktifkannya: buka <em>Settings &gt; System &gt; Display &gt; Graphics &gt; Change default graphics settings</em>, lalu geser sakelar <strong>Hardware-accelerated GPU scheduling</strong> ke posisi ON dan restart PC Anda.</p>

      <h3>2. Nyalakan Windows Game Mode</h3>
      <p>Game Mode secara otomatis menangguhkan proses background yang tidak penting (seperti update Windows otomatis atau index pencarian) saat Anda sedang bermain game, sehingga seluruh resource CPU dialokasikan untuk game.</p>

      <h3>3. Optimasi NVIDIA Control Panel / AMD Adrenalin</h3>
      <p>Di NVIDIA Control Panel pada menu <em>Manage 3D Settings</em>, ubah opsi berikut:</p>
      <ul>
        <li><strong>Power management mode:</strong> Ubah ke <em>Prefer maximum performance</em>.</li>
        <li><strong>Texture filtering - Quality:</strong> Ubah ke <em>High performance</em>.</li>
        <li><strong>Low Latency Mode:</strong> Aktifkan opsi <em>On</em> atau <em>Ultra</em> untuk mengurangi input lag mouse.</li>
      </ul>

      <h3>4. Matikan Efek Motion Blur, Film Grain, &amp; Depth of Field</h3>
      <p>Efek-efek ini meniru kamera sinema Hollywood tapi justru membebani kerja GPU dan membuat musuh yang bergerak cepat menjadi buram. Mematikannya membuat gambar jauh lebih tajam dan menghemat 5-8% beban GPU!</p>

      <h3>5. Turunkan Setting "Volumetric Fog &amp; Clouds"</h3>
      <p>Efek kabut dan awan volumetrik adalah salah satu setting in-game yang paling rakus daya. Menurunkannya dari <em>Ultra</em> ke <em>Medium</em> hampir tidak terlihat bedanya bagi mata, tetapi mampu mendongkrak 10-15 FPS seketika!</p>

      <h3>6. Manfaatkan AI Upscaler (DLSS / FSR / XeSS)</h3>
      <p>Jangan render game di resolusi native jika FPS Anda pas-pasan. Aktifkan <strong>NVIDIA DLSS</strong> atau <strong>AMD FSR</strong> pada mode <em>Quality</em>. Teknologi ini merender game pada resolusi lebih rendah lalu menaikkan ketajamannya menggunakan kecerdasan buatan, memberikan lonjakan FPS hingga 50%!</p>

      <h3>7. Pastikan Profil XMP / DOCP RAM Aktif di BIOS!</h3>
      <p>Fakta mencengangkan: lebih dari 40% gamer membeli RAM 3200MHz atau 3600MHz tetapi hanya berjalan di kecepatan standar 2133MHz karena lupa mengaktifkan fitur <strong>XMP (Intel)</strong> atau <strong>EXPO/DOCP (AMD)</strong> di menu BIOS motherboard!</p>

      <h3>8. Bersihkan DirectX Shader Cache Secara Berkala</h3>
      <p>Cache shader yang menumpuk dan korup sering memicu micro-stuttering. Bersihkan lewat menu <em>Windows Disk Cleanup</em>, centang opsi <strong>DirectX Shader Cache</strong>, lalu klik OK.</p>

      <h3>9. Matikan Discord &amp; Browser Hardware Acceleration Saat Gaming</h3>
      <p>Jika Anda bermain game sambil membuka Google Chrome atau Discord di monitor kedua, matikan fitur <em>Hardware Acceleration</em> di menu pengaturan kedua aplikasi tersebut agar tidak memakan alokasi VRAM kartu grafis Anda.</p>

      <h3>10. Pantau Suhu Hardware (Hindari Thermal Throttling)</h3>
      <p>Jika suhu CPU melebihi 90°C atau GPU melebihi 83°C, prosesor akan secara otomatis menurunkan kecepatannya (thermal throttling) demi mencegah kebakaran sirkuit. Bersihkan debu kipas pendingin dan ganti thermal paste setidaknya setahun sekali.</p>

      <div class="pro-tip-box">
        <strong>🚀 Rekomendasi Aplikasi Gratis Monitoring FPS:</strong>
        Gunakan <strong>MSI Afterburner + RivaTuner Statistics Server (RTSS)</strong> untuk memantau suhu, penggunaan VRAM, dan kestabilan frametime secara real-time saat bermain.
      </div>
    `
  },
  {
    id: "art-5",
    category: "hardware",
    categoryLabel: "Hardware & Setup",
    badgeClass: "badge-hardware",
    title: "Tren Handheld Gaming PC: Steam Deck vs ROG Ally vs Legion Go",
    excerpt: "Bedah kelebihan dan kekurangan konsol handheld terpopuler saat ini. Mana perangkat gaming portabel yang paling pas untuk gaya bermain dan mobilitasmu?",
    image: "images/article-handheld-pc.jpg",
    author: "Bagus Wicaksono (Gadget & Handheld)",
    date: "05 Oktober 2026",
    readTime: "6 menit baca",
    relatedGame: "Game Ringan & Handheld Ready",
    contentHtml: `
      <p>Bermain game PC tidak lagi terpaku di kursi meja kerja atau kamar tidur. Revolusi konsol handheld PC portabel telah mengubah kebiasaan gamer di seluruh penjuru dunia. Kini, mahakarya sekelas <em>Elden Ring</em>, <em>Cyberpunk 2077</em>, hingga <em>EA SPORTS FC</em> dapat dimainkan dengan nyaman di dalam kereta, pesawat, maupun sambil bersantai di atas kasur.</p>

      <p>Tiga penguasa utama pasar handheld PC saat ini adalah <strong>Valve Steam Deck OLED</strong>, <strong>ASUS ROG Ally (Z1 Extreme)</strong>, dan <strong>Lenovo Legion Go</strong>. Mana yang paling layak Anda miliki?</p>

      <h3>1. Valve Steam Deck OLED: Rajanya Kepraktisan &amp; Efisiensi Baterai</h3>
      <p>Kelebihan utama Steam Deck bukan pada angka benchmark mentah, melainkan pada <strong>SteamOS</strong> yang luar biasa intuitif. Fitur <em>Instant Sleep &amp; Resume</em> memungkinkan Anda mematikan konsol di tengah pertarungan boss dan melanjutkannya kembali seketika tanpa harus mengulang loading game.</p>
      <ul>
        <li><strong>Layar:</strong> 7.4 inci OLED 90Hz HDR dengan kontras warna sempurna dan tingkat warna hitam pekat.</li>
        <li><strong>Kelebihan:</strong> Baterai paling awet di kelasnya (3-7 jam), ergonomi genggaman paling pas di tangan, dan trackpad ganda untuk navigasi mouse.</li>
        <li><strong>Kekurangan:</strong> Menjalankan game non-Steam (seperti EA App atau Game Pass) membutuhkan trik launcher tambahan.</li>
      </ul>

      <h3>2. ASUS ROG Ally / Ally X: Monster Performa Windows 11</h3>
      <p>Ditenagai prosesor AMD Ryzen Z1 Extreme, ROG Ally menawarkan tenaga komputasi yang jauh lebih buas dibanding Steam Deck. Layar 1080p dengan refresh rate 120Hz dan teknologi <strong>Variable Refresh Rate (VRR)</strong> membuat gameplay tetap terasa mulus meski FPS turun ke angka 45-50.</p>
      <ul>
        <li><strong>Layar:</strong> 7.0 inci IPS 1080p 120Hz VRR.</li>
        <li><strong>Kelebihan:</strong> Sistem operasi Windows 11 murni (bisa install Xbox PC Game Pass, Epic Games, Riot Client secara langsung).</li>
        <li><strong>Kekurangan:</strong> Navigasi Windows 11 di layar sentuh kecil terkadang kikuk jika belum terbiasa.</li>
      </ul>

      <h3>3. Lenovo Legion Go: Layar Raksasa &amp; Kontroler Lepas-Pasang</h3>
      <p>Bagi Anda yang menginginkan layar paling megah, Legion Go adalah juaranya. Dengan bentang layar <strong>8.8 inci resolusi QHD+ (2560x1600) 144Hz</strong>, pengalaman menonton sinematik dan membaca teks in-game sangat lega dan memanjakan mata.</p>
      <ul>
        <li><strong>Layar:</strong> 8.8 inci QHD+ IPS 144Hz.</li>
        <li><strong>Kelebihan:</strong> Controller TrueStrike bisa dilepas mirip Nintendo Switch, dan kontroler kanan bisa dialihfungsikan menjadi mouse vertikal (FPS Mode).</li>
        <li><strong>Kekurangan:</strong> Bobotnya paling berat (sekitar 854 gram) sehingga melelahkan jika digenggam menggantung lama tanpa bersandar.</li>
      </ul>

      <div class="article-table-wrapper">
        <table class="article-table">
          <thead>
            <tr>
              <th>Fitur / Spesifikasi</th>
              <th>Steam Deck OLED</th>
              <th>ASUS ROG Ally</th>
              <th>Lenovo Legion Go</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Panel &amp; Refresh Rate</td>
              <td>7.4" OLED 90Hz HDR</td>
              <td>7.0" IPS 120Hz VRR</td>
              <td>8.8" IPS 144Hz QHD+</td>
            </tr>
            <tr>
              <td>Sistem Operasi</td>
              <td>SteamOS (Linux-based)</td>
              <td>Windows 11 Home</td>
              <td>Windows 11 Home</td>
            </tr>
            <tr>
              <td>Daya Tahan Baterai Rata-rata</td>
              <td>3.5 - 7 Jam (Sangat Baik)</td>
              <td>1.5 - 3 Jam (Cukup)</td>
              <td>1.5 - 3 Jam (Cukup)</td>
            </tr>
            <tr>
              <td>Xbox PC Game Pass</td>
              <td>Cloud Gaming Saja</td>
              <td>Native Download (Penuh)</td>
              <td>Native Download (Penuh)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="info-tip-box">
        <strong>🎯 Kesimpulan Pilihan:</strong>
        Pilihlah <strong>Steam Deck OLED</strong> jika Anda ingin pengalaman konsol simpel dan baterai awet. Pilihlah <strong>ROG Ally</strong> jika Anda penggemar Game Pass dan mengejar FPS tertinggi. Dan pilihlah <strong>Legion Go</strong> jika Anda menyukai layar besar dan fleksibilitas controller lepas-pasang.
      </div>
    `
  },
  {
    id: "art-6",
    category: "wawasan",
    categoryLabel: "Wawasan Gaming",
    badgeClass: "badge-wawasan",
    title: "Mengenal Genre Soulslike: Mengapa Game Susah Justru Bikin Ketagihan?",
    excerpt: "Analisis psikologis dan daya tarik di balik fenomena genre Soulslike, mulai dari Demon's Souls, Bloodborne, hingga mahakarya Elden Ring.",
    image: "images/article-soulslike-genre.jpg",
    author: "Aditya Pratama (Game Scholar)",
    date: "03 Oktober 2026",
    readTime: "5 menit baca",
    relatedGame: "Elden Ring: Shadow of the Erdtree",
    contentHtml: `
      <p>Di era modern di mana banyak video game memanjakan pemainnya dengan navigasi panah otomatis, tutorial tanpa henti, dan tingkat kesulitan yang ramah, genre <strong>Soulslike</strong> justru hadir dengan filosofi yang berbanding terbalik 180 derajat. Lewat tulisan ikonik <em>"YOU DIED"</em> berwarna merah darah di layar, game-game ini tidak segan-segan menghukum kecerobohan pemainnya.</p>

      <p>Namun anehnya, jutaan gamer di seluruh dunia justru jatuh cinta setengah mati. Mengapa game yang terkenal menyiksa dan membuat frustrasi ini justru memicu kecanduan yang begitu dahsyat?</p>

      <h3>1. Efek Psikologis 'Dopamine Rush' yang Otentik</h3>
      <p>Ketika Anda mengalahkan boss di game biasa yang memberikan kemenangan dengan mudah, otak Anda hanya memproduksi sedikit rasa puas. Namun ketika Anda melawan boss seperti <em>Malenia, Blade of Miquella</em> di <strong>Elden Ring</strong> dan gugur sebanyak 40 kali berturut-turut, lalu akhirnya berhasil mengalahkannya dengan sisa HP setipis rambut, ledakan hormon dopamin dan rasa bangga yang Anda rasakan luar biasa nyata.</p>
      <p>Kemenangan di game Soulslike tidak pernah terasa seperti hadiah gratisan; itu adalah hasil murni dari kesabaran, kedisiplinan membaca pola serangan musuh, dan adaptasi strategi Anda sendiri.</p>

      <h3>2. Desain Level 'Interconnected' yang Jenius</h3>
      <p>Pernahkah Anda berjalan menyusuri gua gelap penuh racun selama berjam-jam, membuka satu pintu gerbang kayu tua yang berderit, lalu tiba-tiba menyadari bahwa Anda baru saja kembali ke titik awal (Bonfire/Site of Grace) pertama Anda? Itulah tanda tangan jenius sutradara game Hidetaka Miyazaki (FromSoftware). Dunia Soulslike dibangun dengan rancangan tiga dimensi yang saling terhubung secara organik tanpa layar loading terputus-putus.</p>

      <h3>3. Mekanik Bertarung yang Adil (Fair, Yet Punishing)</h3>
      <p>Game Soulslike yang baik bukanlah game yang curang. Setiap kali karakter Anda mati, Anda hampir selalu tahu penyebabnya: Anda terlalu serakah memukul musuh saat stamina habis, salah memperkirakan timing roll, atau tidak memperhatikan jebakan di pojok lorong. Rasa bersalah berada di tangan pemain, bukan karena kecurangan sistem game.</p>

      <div class="pro-tip-box">
        <strong>⚔️ 4 Tips Bertahan Hidup Pemula di Game Soulslike:</strong>
        <ol>
          <li><strong>Jangan Pernah Serakah (Greed is Death):</strong> Cukup daratkan 1 atau 2 serangan saat boss selesai mengeluarkan kombo, lalu segera mundur untuk mengisi ulang stamina.</li>
          <li><strong>Pelajari 'I-Frame' Dodge Roll:</strong> Saat Anda berguling ke arah ayunan pedang musuh, terdapat jendela sepersekian detik di mana karakter Anda kebal terhadap damage (invincibility frame).</li>
          <li><strong>Gunakan Segala Alat Pembantu:</strong> Jangan dengarkan opini elitisme; gunakan Spirit Ash summon, racun, panah sihir, atau lemparan pot jika hal itu membantu Anda menang!</li>
          <li><strong>Jangan Takut Menjelajah Tempat Lain:</strong> Di game open-world seperti Elden Ring, jika Anda tersangkut di satu boss yang terlalu kuat, pergilah ke arah lain untuk menaikkan level dan mencari senjata baru.</li>
        </ol>
      </div>
    `
  },
  {
    id: "art-7",
    category: "rekomendasi",
    categoryLabel: "Rekomendasi Game",
    badgeClass: "badge-rekomendasi",
    title: "Daftar Game Indie Terbaik dengan Cerita Mendalam yang Wajib Dimainkan",
    excerpt: "Di luar studio AAA raksasa, dunia indie menyimpan deretan mahakarya luar biasa dengan inovasi gameplay segar, visual artistik, dan cerita mengharukan.",
    image: "images/article-indie-games.jpg",
    author: "Siti Nurhaliza (Indie Curator)",
    date: "29 September 2026",
    readTime: "5 menit baca",
    relatedGame: "Koleksi Game Indie Steam",
    contentHtml: `
      <p>Sering kali game-game berbiaya ratusan juta dolar dari studio raksasa (AAA) terjebak dalam formula yang monoton dan penuh microtransaction yang menjengkelkan. Di sinilah para developer independen (indie) bersinar terang. Tanpa tekanan investor korporat, mereka bebas menuangkan idealisme artistik, mekanik gameplay eksperimental, dan narasi cerita yang menyentuh sanubari terdalam para pemainnya.</p>

      <p>Berikut adalah 5 mahakarya game indie terbaik yang wajib ada di perpustakaan Steam Anda:</p>

      <h3>1. Hades &amp; Hades II (Supergiant Games)</h3>
      <p>Supergiant Games berhasil mengubah genre roguelike yang biasanya dingin dan repetitif menjadi sebuah panggung drama mitologi Yunani yang adiktif. Setiap kali Zagreus atau Melinoë gugur dan kembali ke underworld, karakter-karakter di istana akan memberikan dialog baru yang relevan dengan penyebab kematian Anda. Musik orkestra cadas dan sistem pertarungan yang super responsif menjadikannya salah satu game terbaik sepanjang masa.</p>

      <h3>2. Hollow Knight (Team Cherry)</h3>
      <p>Dibuat oleh tim kecil yang hanya beranggotakan 3 orang dari Australia, Hollow Knight adalah standar emas genre Metroidvania modern. Anda menjelajahi kerajaan serangga bawah tanah <em>Hallownest</em> yang runtuh oleh wabah misterius. Seni lukis tangan 2D yang menawan, lore cerita yang sunyi namun memikat, serta ratusan rahasia tersembunyi menjamin pengalaman bermain lebih dari 60 jam yang tak terlupakan.</p>

      <h3>3. Celeste (Maddy Makes Games)</h3>
      <p>Di balik gameplay platformer presisi yang sangat menantang, Celeste menyembunyikan kisah emosional yang menyentuh tentang perjuangan Madeline mendaki gunung Celeste sebagai metafora menghadapi serangan kecemasan (anxiety) dan depresi batinnya. Soundtrack synth yang menghipnotis karya Lena Raine membuat setiap lompatan terasa bermakna.</p>

      <h3>4. Sea of Stars (Sabotage Studio)</h3>
      <p>Surat cinta paling tulus bagi para pecinta JRPG klasik era Chrono Trigger dan Golden Sun. Hadir dengan seni visual pixel art paling memukau di industri game saat ini, sistem pertarungan turn-based dengan timing aksi interaktif, serta alur kisah persahabatan anak-anak Solstice yang menghangatkan hati.</p>

      <h3>5. Ori and the Will of the Wisps (Moon Studios)</h3>
      <p>Bersiaplah menyiapkan tisu saat memainkan petualangan Ori. Game ini memadukan keindahan visual layaknya lukisan animasi yang hidup dengan simfoni orkestra yang sangat mengharukan. Kelincahan akrobatik Ori saat melompati duri dan meluncur di antara dahan pohon terasa luar biasa memuaskan.</p>

      <div class="info-tip-box">
        <strong>🎮 Keuntungan Bermain Game Indie:</strong>
        Game indie umumnya memiliki spesifikasi hardware PC yang sangat ringan (bisa dimainkan lancar di laptop tanpa kartu grafis diskrit), dibanderol dengan harga yang sangat ramah kantong, serta sering kali menawarkan gameplay paling berkesan seumur hidup!
      </div>
    `
  },
  {
    id: "art-8",
    category: "wawasan",
    categoryLabel: "Tips & Keamanan",
    badgeClass: "badge-wawasan",
    title: "Panduan Lengkap Mengamankan Akun Steam dari Phishing & Hacker",
    excerpt: "Lindungi inventori skin berharga dan koleksi game kesayangan dari berbagai modus kejahatan siber, phishing tautan palsu, dan pencurian API Key.",
    image: "images/article-steam-security.svg",
    author: "Tim Keamanan Digital GameZone",
    date: "26 September 2026",
    readTime: "4 menit baca",
    relatedGame: "Steam Original Games & Lisensi Legal",
    contentHtml: `
      <p>Seiring meningkatnya nilai inventori skin game seperti <em>Counter-Strike 2</em>, <em>Dota 2</em>, dan koleksi game digital bernilai puluhan juta rupiah, akun Steam kini menjadi sasaran empuk kelompok hacker internasional. Setiap hari, ratusan gamer Indonesia kehilangan akses ke akun mereka akibat kelalaian sederhana.</p>

      <p>Kabar baiknya: sistem keamanan Valve sebenarnya sangat kuat asalkan Anda memahami celah-celah penipuan sosial (social engineering) yang sering digunakan pelaku. Simak panduan wajib berikut untuk membentengi akun Steam Anda!</p>

      <h3>Modus Penipuan Paling Sering Memakan Korban:</h3>
      
      <h4>1. Modus "Vote Tim Turnamen Esports Saya"</h4>
      <p>Seseorang di daftar teman Steam atau Discord mengirim pesan: <em>"Bro, tolong bantu vote tim esport teman saya di link turnamen ini dong, kurang 1 vote lagi menang!"</em>. Tautan tersebut akan mengarahkan Anda ke situs tiruan yang meminta Anda login menggunakan Steam Guard. Begitu Anda memasukkan kode, akun Anda langsung diretas!</p>

      <h4>2. Modus "Akun Kamu Tidak Sengaja Ku-Report"</h4>
      <p>Pelaku berpura-pura telah salah melaporkan akun Anda ke Valve karena disangka melakukan penipuan duplikat item. Anda diminta menghubungi "Admin Valve Palsu" di Discord yang akan meminta screenshot riwayat pembelian atau kode verifikasi SMS. <strong>Ingat: Staf resmi Valve tidak akan pernah menghubungi Anda via Discord atau chat Steam!</strong></p>

      <h4>3. Modus 'Steam API Key Hijack' (Scam Trade Otomatis)</h4>
      <p>Jika API Key Anda bocor, bot hacker bisa membatalkan transaksi trade skin yang Anda kirimkan ke teman asli, lalu membuat trade duplikat ke akun bot tiruan dalam hitungan mikrodetik.</p>

      <h3>4 Langkah Benteng Pertahanan Akun Steam:</h3>
      
      <div class="pro-tip-box">
        <strong>🛡️ Checklist Keamanan Wajib Dilakukan Sekarang:</strong>
        <ol>
          <li><strong>Aktifkan Steam Guard Mobile Authenticator:</strong> Unduh aplikasi resmi Steam di Android atau iOS. Setiap login baru akan memerlukan persetujuan sidik jari atau kode OTP dinamis di HP Anda.</li>
          <li><strong>Cek Halaman API Key Anda:</strong> Buka tautan resmi <code>https://steamcommunity.com/dev/apikey</code>. Jika Anda melihat kolom "Domain Name" telah terisi padahal Anda bukan developer bot, segera klik tombol <strong>Revoke My Steam Web API Key</strong> sekarang juga!</li>
          <li><strong>Deauthorize All Devices:</strong> Jika merasa ada aktivitas aneh, masuk ke <em>Account Details &gt; Manage Steam Guard</em> dan klik <strong>Deauthorize all other devices</strong> untuk mengeluarkan semua sesi login yang mencurigakan.</li>
          <li><strong>Amankan Alamat Email Utama:</strong> Jangan lupa mengaktifkan verifikasi 2 langkah (2FA) pada akun Gmail atau Yahoo yang Anda gunakan untuk mendaftar akun Steam.</li>
        </ol>
      </div>

      <p>Simpan selalu bukti invoice dan kode lisensi resmi pembelian game Anda dari <strong>GameZone Store</strong>. Jika suatu saat terjadi kendala akses, bukti invoice resmi dari kami adalah bukti kepemilikan paling valid yang diakui langsung oleh tim Steam Support Valve!</p>
    `
  },
  {
    id: "art-9",
    category: "wawasan",
    categoryLabel: "Berita & Tren",
    badgeClass: "badge-wawasan",
    title: "Evolusi Esports di Indonesia: Dari Warnet Tradisional ke Panggung Dunia",
    excerpt: "Menengok perjalanan panjang industri esports tanah air, dari turnamen LAN warnet masa lalu hingga ekosistem profesional berhadiah miliaran rupiah.",
    image: "images/article-esports.svg",
    author: "Gilang Ramadhan (Esports Journalist)",
    date: "22 September 2026",
    readTime: "6 menit baca",
    relatedGame: "Game Turnamen & Kompetitif",
    contentHtml: `
      <p>Dua dekade lalu, bermain video game sering dicap sebagai kegiatan sia-sia yang membuang waktu dan masa depan. Namun kini, lanskap tersebut telah bertransformasi total. Industri <strong>Esports (Olahraga Elektronik)</strong> di Indonesia telah menjelma menjadi industri raksasa bernilai triliunan rupiah dengan jutaan penggemar fanatik dan dukungan penuh pemerintah.</p>

      <p>Bagaimana perjalanan panjang gamer Indonesia dari duduk berdesakan di bangku warnet hingga berdiri gagah di podium piala dunia?</p>

      <h3>Nostalgia Era Emas Warnet (2000 - 2012)</h3>
      <p>Bagi generasi milenial, warnet (warung internet) adalah kawah candradimuka pertama lahirnya mentalitas kompetitif. Masih lekat dalam ingatan aroma mie instan di tengah malam, bunyi teriakan komando di map <em>de_dust2</em> game <strong>Counter-Strike 1.6</strong>, riuhnya perang Guild Siege di <strong>Ragnarok Online</strong>, hingga adu tembak headshot di lorong sempit <em>Downtown</em> game <strong>Point Blank</strong>.</p>
      <p>Turnamen saat itu diadakan secara swadaya oleh pemilik warnet dengan hadiah yang sederhana: uang tunai ratusan ribu rupiah, voucher billing gratis, atau piala bergilir lokal. Namun semangat persaudaraan dan sportivitas yang lahir dari bilik warnet itulah yang menjadi pondasi kuat komunitas gaming Indonesia.</p>

      <h3>Revolusi Panggung Kompetisi Global (2013 - Sekarang)</h3>
      <p>Seiring masuknya koneksi internet fiber optik dan launcher modern seperti Steam, gamer Indonesia mulai menembus batas geografis. Kehadiran game sekelas <em>Dota 2</em>, <em>Counter-Strike: Global Offensive / CS2</em>, dan <em>Valorant</em> melahirkan atlet-atlet esports kelas dunia asal Indonesia.</p>
      <p>Nama-nama atlet kebanggaan seperti <em>Xepher</em> dan <em>Whitemon</em> berhasil mengukir sejarah sebagai orang Indonesia pertama yang bertanding di panggung paling bergengsi <strong>The International Dota 2</strong>. Di kancah Valorant, tim-tim asal Indonesia secara konsisten menjadi momok menakutkan bagi tim-tim raksasa dari Korea Selatan, Jepang, dan Amerika Utara.</p>

      <h3>Peluang Karir Nyata di Industri Game Masa Kini</h3>
      <p>Esports masa kini bukan lagi sekadar impian menjadi atlet pro-player. Ekosistem ini telah membuka ribuan lapangan kerja profesional yang menjanjikan:</p>
      <ul>
        <li><strong>Pelatih &amp; Analis Taktik (Coach &amp; Analyst):</strong> Merancang strategi draf hero, mempelajari pola gameplay lawan melalui data telemetri, dan menjaga mentalitas atlet.</li>
        <li><strong>Shoutcaster &amp; Host Acara:</strong> Pembawa acara yang menghidupkan jalannya pertandingan dengan narasi cepat dan analisis menghibur.</li>
        <li><strong>Event Organizer &amp; Broadcast Engineer:</strong> Kru teknis di balik megahnya tata panggung lampu laser, siaran live streaming beresolusi tinggi, dan turnamen arena.</li>
        <li><strong>Content Creator &amp; Streamer:</strong> Menghibur komunitas gamer dan membuka peluang sponsorship dari brand-brand teknologi terkemuka.</li>
      </ul>

      <div class="info-tip-box">
        <strong>🏆 Harapan Masa Depan:</strong>
        Dengan diakuinya esports sebagai cabang olahraga resmi di bawah naungan PBESI dan KONI, generasi muda Indonesia memiliki jalur prestasi resmi yang diakui negara. Tetap jaga keseimbangan antara latihan disiplin, pendidikan formal, dan kesehatan fisik!
      </div>
    `
  },
  {
    id: "art-10",
    category: "tips",
    categoryLabel: "Kesehatan Gamer",
    badgeClass: "badge-tips",
    title: "Tips Ergonomi Gamer: Menjaga Kesehatan Mata, Punggung, dan Pergelangan Tangan",
    excerpt: "Panduan praktis menjaga tubuh tetap bugar dan terbebas dari Carpal Tunnel Syndrome serta mata lelah meski sering push rank berjam-jam.",
    image: "images/article-ergonomics.svg",
    author: "dr. Kevin Pratama (Dokter & Gamer)",
    date: "18 September 2026",
    readTime: "4 menit baca",
    relatedGame: "Koleksi Aksesoris & Game Santai",
    contentHtml: `
      <p>Sebagai gamer, kita sering kali lupa waktu ketika sedang asyik bermain bersama teman atau fokus menaikkan rank kompetitif. Sesi bermain yang semula direncanakan hanya 1 jam bisa berlanjut menjadi 5 hingga 8 jam nonstop di depan layar komputer.</p>

      <p>Jika dibiarkan terus-menerus tanpa memperhatikan faktor ergonomi, tubuh akan mulai mengirimkan sinyal bahaya: mata perih berair, sakit kepala tegang, leher kaku, hingga kesemutan di pergelangan tangan (<em>Carpal Tunnel Syndrome</em>). Simak 5 tips medis sederhana berikut agar Anda bisa tetap push rank secara sehat dan bugar!</p>

      <h3>1. Terapkan Aturan Emas 20-20-20 untuk Kesehatan Mata</h3>
      <p>Saat menatap layar monitor, frekuensi kedipan mata berkurang hingga 60%, yang menyebabkan lapisan air mata mengering dan memicu rasa perih. Terapkan aturan <strong>20-20-20</strong>:</p>
      <ul>
        <li>Setiap <strong>20 menit</strong> bermain game,</li>
        <li>Alihkan pandangan Anda ke objek yang berjarak minimal <strong>20 kaki</strong> (sekitar 6 meter),</li>
        <li>Fokuskan mata Anda ke objek tersebut selama <strong>20 detik</strong>.</li>
      </ul>
      <p>Hal ini memberikan kesempatan bagi otot siliaris lensa mata Anda untuk berelaksasi dari ketegangan jarak dekat.</p>

      <h3>2. Postur Duduk Ideal di Kursi Battlestation</h3>
      <p>Banyak gamer memiliki kebiasaan membungkuk ke arah layar monitor (disebut fenomena <em>"Gamer Neck"</em>). Postur ideal yang benar adalah:</p>
      <ul>
        <li><strong>Telapak Kaki:</strong> Menapak rata di atas lantai. Jangan menyilangkan kaki terlalu lama karena menghambat sirkulasi darah vena.</li>
        <li><strong>Posisi Lutut &amp; Pinggul:</strong> Membentuk sudut sekitar 90 hingga 100 derajat.</li>
        <li><strong>Sandaran Punggung (Lumbar Support):</strong> Pastikan lekukan pinggang bawah ditopang dengan baik oleh bantal kursi untuk mengurangi beban kompresi pada bantalan tulang belakang.</li>
        <li><strong>Tinggi Layar Monitor:</strong> Tepi atas layar harus sejajar lurus dengan pandangan mata Anda saat duduk tegak, dengan jarak sekitar satu bentangan lengan (50 - 70 cm).</li>
      </ul>

      <h3>3. Mencegah Cedera Saraf Pergelangan Tangan (Carpal Tunnel)</h3>
      <p>Gerakan flick mouse cepat dan posisi pergelangan tangan yang tertekuk tajam ke atas meja dapat menekan saraf medianus. Gunakan mousepad yang cukup besar dan sesuaikan ketinggian sandaran tangan (armrest) kursi agar sejajar dengan tinggi permukaan meja. Bila perlu, gunakan mousepad dengan bantalan pergelangan tangan (wrist rest) yang empuk.</p>

      <h3>4. Peregangan Singkat 3 Menit Antar Match</h3>
      <p>Manfaatkan waktu tunggu matchmaking atau jeda respawn untuk melakukan stretching ringan:</p>
      <ol>
        <li>Tautkan jari-jari tangan lalu dorong telapak tangan ke depan dan ke atas kepala selama 10 detik.</li>
        <li>Putar bahu ke arah belakang secara perlahan sebanyak 10 kali putaran.</li>
        <li>Tengokkan kepala perlahan ke kiri dan ke kanan untuk melemaskan otot trapezius leher.</li>
      </ol>

      <div class="pro-tip-box">
        <strong>💧 Kunci Terakhir: Hidrasi Air Putih!</strong>
        Selalu letakkan tumbler atau botol air putih di samping meja gaming Anda. Kurangi konsumsi minuman energi tinggi kafein dan gula berlebih yang justru mempercepat dehidrasi dan mengganggu kualitas tidur malam Anda.
      </div>
    `
  }
];

/* ==========================================================================
   Article Rendering, Filtering & Search
   ========================================================================== */

let currentArticleFilter = 'all';
let currentArticleSearch = '';

function initArticles() {
  renderArticles();

  // Filter Buttons
  const filterButtons = document.querySelectorAll('.art-filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentArticleFilter = btn.getAttribute('data-category');
      renderArticles();
    });
  });

  // Search Input
  const searchInput = document.getElementById('articleSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentArticleSearch = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = currentArticleSearch.length > 0 ? 'flex' : 'none';
      }
      renderArticles();
    });
  }
}

function renderArticles() {
  const grid = document.getElementById('articleGrid');
  const emptyBox = document.getElementById('noArticleFound');
  if (!grid) return;

  const filtered = articlesData.filter(item => {
    const matchCategory = currentArticleFilter === 'all' || item.category === currentArticleFilter;
    const matchSearch = currentArticleSearch === '' || 
      item.title.toLowerCase().includes(currentArticleSearch) ||
      item.excerpt.toLowerCase().includes(currentArticleSearch) ||
      item.categoryLabel.toLowerCase().includes(currentArticleSearch);

    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyBox) emptyBox.style.display = 'block';
    return;
  }

  if (emptyBox) emptyBox.style.display = 'none';

  grid.innerHTML = filtered.map(item => `
    <article class="article-card" id="card-${item.id}">
      <div class="article-thumb" onclick="bacaArtikel('${item.id}')" style="cursor: pointer;">
        <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy" width="400" height="225">
        <span class="article-badge ${item.badgeClass}">${escapeHtml(item.categoryLabel)}</span>
        <span class="article-read-badge">⏱️ ${escapeHtml(item.readTime)}</span>
      </div>
      <div class="article-card-body">
        <div class="article-meta-row">
          <span>📅 ${escapeHtml(item.date)}</span>
          <span class="meta-dot">&bull;</span>
          <span>✍️ ${escapeHtml(item.author)}</span>
        </div>
        <h3 class="article-card-title" onclick="bacaArtikel('${item.id}')" style="cursor: pointer;" title="${escapeHtml(item.title)}">
          ${escapeHtml(item.title)}
        </h3>
        <p class="article-card-excerpt">
          ${escapeHtml(item.excerpt)}
        </p>
        <div class="article-card-footer">
          <button class="btn-read-article" onclick="bacaArtikel('${item.id}')" aria-label="Baca artikel ${escapeHtml(item.title)}">
            Baca Selengkapnya <span>&rarr;</span>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function resetArticleSearch() {
  const searchInput = document.getElementById('articleSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  if (searchInput) searchInput.value = '';
  if (clearSearchBtn) clearSearchBtn.style.display = 'none';
  currentArticleSearch = '';

  const filterButtons = document.querySelectorAll('.art-filter-btn');
  filterButtons.forEach(btn => {
    if (btn.getAttribute('data-category') === 'all') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  currentArticleFilter = 'all';

  renderArticles();
}

/* ==========================================================================
   Article Modal Viewer & Hash Deep Linking
   ========================================================================== */

let currentOpenArticleId = null;

function bacaArtikel(articleId) {
  const article = articlesData.find(a => a.id === articleId);
  if (!article) return;

  currentOpenArticleId = articleId;
  const modal = document.getElementById('articleModal');
  const modalContent = document.getElementById('articleModalContent');

  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="article-modal-hero">
      <img src="${article.image}" alt="${escapeHtml(article.title)}">
    </div>

    <div class="article-modal-inner">
      <div class="article-modal-meta-top">
        <span class="article-badge ${article.badgeClass}">${escapeHtml(article.categoryLabel)}</span>
        <span class="article-read-badge" style="position:static; background:var(--bg-subtle); color:var(--text-body);">⏱️ ${escapeHtml(article.readTime)}</span>
        <span style="font-size:0.84rem; color:var(--text-muted);">📅 ${escapeHtml(article.date)}</span>
      </div>

      <h2 class="article-modal-title">${escapeHtml(article.title)}</h2>

      <div class="article-author-pill">
        <span>✍️ Ditulis oleh: <strong>${escapeHtml(article.author)}</strong></span>
        <span>&bull;</span>
        <span>Dipublikasikan di <strong>GameZone Store Blog</strong></span>
      </div>

      <div class="article-prose">
        ${article.contentHtml}

        <div class="article-cta-box">
          <div class="cta-box-text">
            <h4>🎮 Upgrade Pengalaman Gaming Kamu Bersama GameZone Store!</h4>
            <p>Dapatkan lisensi game PC original termurah dengan pengiriman CD Key kilat dan garansi resmi 100%.</p>
          </div>
          <a href="#game" class="btn btn-primary btn-sm" onclick="tutupModalArtikel()">Lihat Katalog Game</a>
        </div>
      </div>

      <div class="article-modal-footer">
        <div class="article-share-actions">
          <span class="article-share-label">Bagikan Artikel:</span>
          <button class="btn btn-sm btn-secondary" onclick="salinLinkArtikel('${article.id}')" id="copyArticleBtn">
            🔗 Salin Tautan Artikel
          </button>
        </div>
        <button class="btn btn-sm btn-primary" onclick="tutupModalArtikel()">Selesai Membaca</button>
      </div>
    </div>
  `;

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Update hash deep linking without page jump
  if (history.pushState) {
    history.pushState(null, null, `#baca-${article.id}`);
  }
}

function tutupModalArtikel() {
  const modal = document.getElementById('articleModal');
  if (modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  currentOpenArticleId = null;

  if (history.pushState && window.location.hash.startsWith('#baca-art-')) {
    history.pushState(null, null, '#artikel');
  }
}

function salinLinkArtikel(articleId) {
  const url = `${window.location.origin}${window.location.pathname}#baca-${articleId}`;
  const btn = document.getElementById('copyArticleBtn');

  navigator.clipboard.writeText(url).then(() => {
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Tautan Tersalin!';
      btn.style.backgroundColor = '#10b981';
      btn.style.color = '#ffffff';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }, 3000);
    }
  }).catch(() => {
    alert(`Salin tautan ini: ${url}`);
  });
}

function checkUrlHashForArticle() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#baca-art-')) {
    const articleId = hash.replace('#baca-', '');
    setTimeout(() => {
      bacaArtikel(articleId);
    }, 200);
  }
}

/* ==========================================================================
   Global Modal Close Handlers (Click Outside & Escape Key)
   ========================================================================== */

window.addEventListener('click', (event) => {
  const orderModal = document.getElementById('orderModal');
  const articleModal = document.getElementById('articleModal');

  if (event.target === orderModal) {
    tutupModal();
  }
  if (event.target === articleModal) {
    tutupModalArtikel();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    tutupModal();
    tutupModalArtikel();
  }
});

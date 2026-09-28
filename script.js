// ==========================================================================
// KARACA LUX TAŞIMACILIK - CLIENT LOGIC & INTERACTIVITY
// ==========================================================================

const COMPANY_PHONE = "905337054408"; // Karaca Lux WhatsApp / GSM Hattı
const COMPANY_PHONE_2 = "905010834408";
const COMPANY_LANDLINE = "03123354772";

// Distance & Base Route Matrix
const ROUTE_DISTANCES = {
  "Ankara-Diyarbakır": { dist: 980, time: "13-15 Saat", basePrice: 28000 },
  "Diyarbakır-Ankara": { dist: 980, time: "13-15 Saat", basePrice: 26000 },
  "Ankara-Mardin": { dist: 1040, time: "14-16 Saat", basePrice: 30000 },
  "Mardin-Ankara": { dist: 1040, time: "14-16 Saat", basePrice: 28000 },
  "Ankara-Şanlıurfa": { dist: 850, time: "10-12 Saat", basePrice: 25000 },
  "Şanlıurfa-Ankara": { dist: 850, time: "10-12 Saat", basePrice: 23000 },
  "Ankara-Gaziantep": { dist: 700, time: "8-10 Saat", basePrice: 22000 },
  "Gaziantep-Ankara": { dist: 700, time: "8-10 Saat", basePrice: 20000 },
  "Ankara-Malatya": { dist: 660, time: "8-9 Saat", basePrice: 21000 },
  "Malatya-Ankara": { dist: 660, time: "8-9 Saat", basePrice: 19500 },
  "Ankara-Adıyaman": { dist: 780, time: "10-11 Saat", basePrice: 24000 },
  "Adıyaman-Ankara": { dist: 780, time: "10-11 Saat", basePrice: 22000 },
  "Ankara-Batman": { dist: 1020, time: "14-15 Saat", basePrice: 29000 },
  "Batman-Ankara": { dist: 1020, time: "14-15 Saat", basePrice: 27000 },
  "Ankara-Elazığ": { dist: 760, time: "9-10 Saat", basePrice: 23000 },
  "Elazığ-Ankara": { dist: 760, time: "9-10 Saat", basePrice: 21500 }
};

// Default Route Data
const DEFAULT_ROUTE = { dist: 850, time: "11-13 Saat", basePrice: 25000 };

// Room multipliers
const ROOM_MULTIPLIERS = {
  "1+1": 0.7,
  "2+1": 0.85,
  "3+1": 1.0,
  "4+1": 1.35,
  "Villa": 1.75,
  "Parça": 0.45
};

// Document Ready Initialization
document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initMobileDrawer();
  initFaqAccordion();
  initHeroSlider();
  calculatePrice();
});

// Hero Background Slider Rotation
let currentHeroSlide = 0;
let heroSlideTimer = null;
const heroSlideCaptions = [
  "1/4: Karaca VIP Tır Filosu (Ankara Otoyolu)",
  "2/4: Karaca VIP Ekspres Tırı",
  "3/4: Ankara Merkez Lojistik Üssü & Araç Filosu",
  "4/4: 15. Kat Hidrolik Mobil Eşya Asansörümüz"
];

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide, .hero-mobile-slide");
  if (!slides || slides.length <= 1) return;

  startHeroSlideTimer();

  const sliderBar = document.querySelector(".hero-slider-bar");
  if (sliderBar) {
    sliderBar.addEventListener("mouseenter", stopHeroSlideTimer);
    sliderBar.addEventListener("mouseleave", startHeroSlideTimer);
  }

  const mobileFrame = document.querySelector(".hero-mobile-slider-box");
  if (mobileFrame) {
    mobileFrame.addEventListener("mouseenter", stopHeroSlideTimer);
    mobileFrame.addEventListener("mouseleave", startHeroSlideTimer);
  }
}

function showHeroSlide(index) {
  const dSlides = document.querySelectorAll(".hero-slide");
  const mSlides = document.querySelectorAll(".hero-mobile-slide");
  const dDots = document.querySelectorAll("#heroSliderDots .slider-dot");
  const mDots = document.querySelectorAll("#heroMobileDots .m-dot");
  const caption = document.getElementById("heroSlideCaption");
  const mBadge = document.getElementById("heroMobileBadge");

  const total = Math.max(dSlides.length, mSlides.length, 4);
  currentHeroSlide = (index + total) % total;

  dSlides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === currentHeroSlide);
  });

  mSlides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === currentHeroSlide);
  });

  dDots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentHeroSlide);
  });

  mDots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentHeroSlide);
  });

  if (caption && heroSlideCaptions[currentHeroSlide]) {
    caption.innerHTML = `<i class="fa-solid fa-truck-moving text-gold"></i> <span>${heroSlideCaptions[currentHeroSlide]}</span>`;
  }
  if (mBadge && heroSlideCaptions[currentHeroSlide]) {
    mBadge.textContent = heroSlideCaptions[currentHeroSlide];
  }
}

function nextHeroSlide() {
  showHeroSlide(currentHeroSlide + 1);
  resetHeroSlideTimer();
}

function prevHeroSlide() {
  showHeroSlide(currentHeroSlide - 1);
  resetHeroSlideTimer();
}

function setHeroSlide(idx) {
  showHeroSlide(idx);
  resetHeroSlideTimer();
}

function startHeroSlideTimer() {
  stopHeroSlideTimer();
  heroSlideTimer = setInterval(() => {
    showHeroSlide(currentHeroSlide + 1);
  }, 5000);
}

function stopHeroSlideTimer() {
  if (heroSlideTimer) {
    clearInterval(heroSlideTimer);
    heroSlideTimer = null;
  }
}

function resetHeroSlideTimer() {
  stopHeroSlideTimer();
  startHeroSlideTimer();
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.getElementById("mainNavbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Mobile drawer toggle
function initMobileDrawer() {
  const openBtn = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("drawerCloseBtn");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("drawerOverlay");
  const drawerNavLinks = document.querySelectorAll("a.drawer-link, a.drawer-sublink");
  const dropdownToggles = document.querySelectorAll(".drawer-dropdown-toggle");

  function openDrawer() {
    drawer.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (openBtn) openBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const parentDropdown = toggle.closest(".drawer-dropdown");
      if (parentDropdown) {
        parentDropdown.classList.toggle("open");
      }
    });
  });

  drawerNavLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach(i => i.classList.remove("active"));
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

// Select route from route cards
function selectRouteForCalc(from, to) {
  const calcFrom = document.getElementById("calcFrom");
  const calcTo = document.getElementById("calcTo");

  if (calcFrom) calcFrom.value = from;
  if (calcTo) calcTo.value = to;

  calculatePrice();

  const calcSection = document.getElementById("fiyat-hesapla");
  if (calcSection) {
    calcSection.scrollIntoView({ behavior: "smooth" });
  }
}

// Dynamic Price Calculation
function calculatePrice() {
  const fromCity = document.getElementById("calcFrom").value;
  const toCity = document.getElementById("calcTo").value;
  const selectedRoomInput = document.querySelector('input[name="calcRoom"]:checked');
  const roomType = selectedRoomInput ? selectedRoomInput.value : "3+1";

  const fromFloor = document.getElementById("calcFromFloor").value;
  const toFloor = document.getElementById("calcToFloor").value;

  const vipPack = document.getElementById("addonVipPack").checked;
  const carpenter = document.getElementById("addonCarpenter").checked;
  const insurance = document.getElementById("addonInsurance").checked;

  // Key lookup
  const routeKey = `${fromCity}-${toCity}`;
  const routeData = ROUTE_DISTANCES[routeKey] || DEFAULT_ROUTE;

  let base = routeData.basePrice;
  let mult = ROOM_MULTIPLIERS[roomType] || 1.0;
  let estimatedBase = base * mult;

  // Floor / Lift addition
  let liftCost = 0;
  if (fromFloor === "4" || fromFloor === "8") liftCost += 2000;
  if (toFloor === "4" || toFloor === "8") liftCost += 2000;
  if (fromFloor === "8" || toFloor === "8") liftCost += 1000;

  // Addons
  let packCost = vipPack ? 2500 : 0;
  let carpenterCost = carpenter ? 1500 : 0;
  let insuranceCost = insurance ? 1000 : 0;

  let totalEstimate = estimatedBase + liftCost + packCost + carpenterCost + insuranceCost;
  let minPrice = Math.round(totalEstimate * 0.92 / 500) * 500;
  let maxPrice = Math.round(totalEstimate * 1.15 / 500) * 500;

  // Update Summary UI
  const dispFrom = document.getElementById("summaryFrom");
  const dispTo = document.getElementById("summaryTo");
  const dispDist = document.getElementById("summaryDistance");
  const dispMin = document.getElementById("displayPriceMin");
  const dispMax = document.getElementById("displayPriceMax");
  const dispRoom = document.getElementById("summaryRoom");
  const dispElevator = document.getElementById("summaryElevator");
  const dispPack = document.getElementById("summaryPack");

  if (dispFrom) dispFrom.textContent = fromCity;
  if (dispTo) dispTo.textContent = toCity;
  if (dispDist) dispDist.textContent = `Mesafe: ~${routeData.dist} Km | Ortalama ${routeData.time}`;
  if (dispMin) dispMin.textContent = minPrice.toLocaleString("tr-TR");
  if (dispMax) dispMax.textContent = maxPrice.toLocaleString("tr-TR");
  if (dispRoom) dispRoom.textContent = `${roomType} Konut`;

  if (dispElevator) {
    if (fromFloor === "4" || toFloor === "4" || fromFloor === "8" || toFloor === "8") {
      dispElevator.textContent = "Dış Cephe Asansörlü";
    } else {
      dispElevator.textContent = "Standart / Bina İçi";
    }
  }

  if (dispPack) {
    if (vipPack && carpenter) {
      dispPack.textContent = "VIP Full Paket + Marangoz";
    } else if (vipPack) {
      dispPack.textContent = "VIP Paketleme Dahil";
    } else if (carpenter) {
      dispPack.textContent = "Marangoz Montaj Dahil";
    } else {
      dispPack.textContent = "Standart Taşıma";
    }
  }
}

// Send Calculator Quote directly to WhatsApp
function sendCalculatedQuoteToWhatsApp() {
  const fromCity = document.getElementById("calcFrom").value;
  const toCity = document.getElementById("calcTo").value;
  const selectedRoom = document.querySelector('input[name="calcRoom"]:checked')?.value || "3+1";
  const fromFloor = document.getElementById("calcFromFloor").options[document.getElementById("calcFromFloor").selectedIndex].text;
  const toFloor = document.getElementById("calcToFloor").options[document.getElementById("calcToFloor").selectedIndex].text;
  const name = document.getElementById("calcName")?.value || "Belirtilmedi";
  const phone = document.getElementById("calcPhone")?.value || "Belirtilmedi";
  const minP = document.getElementById("displayPriceMin").textContent;
  const maxP = document.getElementById("displayPriceMax").textContent;

  const msg = `*KARACA LUX TAŞIMACILIK - FİYAT TEKLİF TALEBİ*%0A%0A` +
              `*Müşteri:* ${name}%0A` +
              `*Telefon:* ${phone}%0A` +
              `*Güzergah:* ${fromCity} ➔ ${toCity}%0A` +
              `*Ev Tipi:* ${selectedRoom}%0A` +
              `*Yükleme Katı:* ${fromFloor}%0A` +
              `*Boşaltma Katı:* ${toFloor}%0A` +
              `*Hesaplanan Tahmini Fiyat:* ${minP} - ${maxP} TL%0A%0A` +
              `Detaylı resmi teklif ve müsaitlik durumu hakkında bilgi alabilir miyim?`;

  window.open(`https://wa.me/${COMPANY_PHONE}?text=${msg}`, "_blank");
  showToast("Teklif detaylarınız WhatsApp'a aktarıldı!");
}

function submitCalculatorToWhatsApp(e) {
  e.preventDefault();
  sendCalculatedQuoteToWhatsApp();
}

// Handle Hero Quick Quote Form
function handleQuickQuote(e) {
  e.preventDefault();
  const name = document.getElementById("quickName")?.value.trim() || "Değerli Müşteri";
  const phone = document.getElementById("quickPhone")?.value.trim() || "Belirtilmedi";
  const from = document.getElementById("quickFrom")?.value || "Ankara";
  const to = document.getElementById("quickTo")?.value || "Diyarbakır";
  const type = document.getElementById("quickType")?.value || "3+1 Daire";
  const lift = document.getElementById("quickLift")?.value || "Belirtilmedi";

  const msg = 
    `🚚 *KARACA LUX TAŞIMACILIK - HIZLI SEFER & EKSPERTİZ TALEBİ*\n\n` +
    `👤 *Müşteri:* ${name}\n` +
    `📞 *Telefon:* ${phone}\n` +
    `📍 *Nereden (Çıkış):* ${from}\n` +
    `🏁 *Nereye (Varış):* ${to}\n` +
    `🏠 *Konut / Eşya Tipi:* ${type}\n` +
    `🏗️ *Asansör Tercihi:* ${lift}\n\n` +
    `Merhaba, sitemizdeki Hızlı Sefer ve Ekspertiz Talep Formu üzerinden ulaşıyorum. Belirttiğim kriterlere göre en uygun sefer saati, asansörlü taşıma ve indirimli ekspertiz fiyat teklifinizi iletebilir misiniz?`;

  const waUrl = `https://wa.me/${COMPANY_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
  showToast("Bilgileriniz WhatsApp'a aktarıldı! Müşteri temsilcimiz hemen yanıt veriyor.");
  e.target.reset();
}

// Handle Contact Page Form
function submitContactForm() {
  const name = document.getElementById("cName")?.value.trim() || "Belirtilmedi";
  const phone = document.getElementById("cPhone")?.value.trim() || "Belirtilmedi";
  const from = document.getElementById("cFromCity")?.value.trim() || "Ankara";
  const to = document.getElementById("cToCity")?.value.trim() || "Güneydoğu";
  const house = document.getElementById("cHouse")?.value || "3+1 Standart Ev";

  const msg = 
    `🚚 *KARACA LUX - İLETİŞİM SAYFASI TEKLİF FORMU*\n\n` +
    `👤 *Ad Soyad:* ${name}\n` +
    `📞 *Telefon:* ${phone}\n` +
    `📍 *Nereden:* ${from}\n` +
    `🏁 *Nereye:* ${to}\n` +
    `🏠 *Eşya Tipi:* ${house}\n\n` +
    `Merhaba, nakliyat teklifi ve müsaitlik hakkında bilgi almak istiyorum.`;

  const waUrl = `https://wa.me/${COMPANY_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
  showToast("Teklif talebiniz WhatsApp'a aktarıldı!");
}

// Handle Main Contact Form (Homepage)
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("cName")?.value.trim() || "Belirtilmedi";
  const phone = document.getElementById("cPhone")?.value.trim() || "Belirtilmedi";
  const from = document.getElementById("cFrom")?.value.trim() || "Ankara";
  const to = document.getElementById("cTo")?.value.trim() || "Belirtilmedi";
  const date = document.getElementById("cDate")?.value || "En Kısa Sürede";
  const type = document.getElementById("cType")?.value || "Evden Eve Nakliyat";
  const note = document.getElementById("cNote")?.value.trim() || "Ek not yok";

  const msg = 
    `🚚 *KARACA LUX - DETAYLI REZERVASYON & EKSPERTİZ TALEBİ*\n\n` +
    `👤 *Ad Soyad:* ${name}\n` +
    `📞 *Telefon:* ${phone}\n` +
    `📍 *Çıkış Yeri:* ${from}\n` +
    `🏁 *Varış Yeri:* ${to}\n` +
    `📅 *Taşınma Tarihi:* ${date}\n` +
    `🏠 *Hizmet / Eşya Tipi:* ${type}\n` +
    `📝 *Ek Notlar:* ${note}\n\n` +
    `Detaylı ekspertiz ve rezervasyon planlaması için bilgi alabilir miyim?`;

  const waUrl = `https://wa.me/${COMPANY_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
  showToast("Rezervasyon talebiniz WhatsApp'a aktarıldı!");
  e.target.reset();
}

// Toast notification display
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-gold"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

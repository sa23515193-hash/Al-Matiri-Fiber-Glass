// Language Selection (runs once)
window.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("langModal");
  const savedLang = localStorage.getItem("selectedLang");

  if (!savedLang) {
    modal.style.display = "flex";
  } else {
    applyLanguage(savedLang);
  }
});

function selectLanguage(lang) {
  localStorage.setItem("selectedLang", lang);
  applyLanguage(lang);
  document.getElementById("langModal").style.display = "none";
}

function applyLanguage(lang) {
  const isArabic = lang === "ar";

  document.body.dir = isArabic ? "rtl" : "ltr";

  document.getElementById("heroTitle").textContent = isArabic
    ? "مرحباً بكم في المطيري للفيبر جلاس"
    : "Welcome to Al-Mutairi Fiberglass";

  document.getElementById("heroDesc").textContent = isArabic
    ? "نحن متخصصون في منتجات الفيبر جلاس بجدة منذ عام 1990."
    : "Specialists in fiberglass products in Jeddah since 1990.";

  document.getElementById("galleryTitle").textContent = isArabic
    ? "أعمالنا"
    : "Our Work";

  document.getElementById("galleryDesc").textContent = isArabic
    ? "بعض من مشاريعنا الحديثة."
    : "Some of our recent projects.";

  document.getElementById("contactTitle").textContent = isArabic
    ? "اتصل بنا"
    : "Contact Us";
}

// ----- GALLERY LIGHTBOX -----
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lbImage = document.getElementById("lb-image");

  const btnClose = document.querySelector(".lb-close");
  const btnNext = document.querySelector(".lb-next");
  const btnPrev = document.querySelector(".lb-prev");

  let currentIndex = 0;

  // Open Lightbox
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      showImage();
      lightbox.style.display = "flex";
    });
  });

  // Show selected image
  function showImage() {
    lbImage.src = images[currentIndex].src;
  }

  // Next image
  btnNext.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  });

  // Previous image
  btnPrev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  });

  // Close lightbox
  btnClose.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  // Keyboard controls
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") btnNext.click();
      if (e.key === "ArrowLeft") btnPrev.click();
      if (e.key === "Escape") btnClose.click();
    }
  });
});

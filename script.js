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

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // 🌍 SELECT ALL SECTIONS
  // =========================
  const sections = document.querySelectorAll("h2, p, .highlight");

  // =========================
  // ✨ SCROLL FADE-IN
  // =========================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.15
  });

  sections.forEach(el => {
    el.classList.add("fade");
    observer.observe(el);
  });

  // =========================
  // ⬆️ BACK TO TOP BUTTON
  // =========================
  const btn = document.createElement("button");
  btn.innerText = "⬆️ Naar boven";
  btn.style.position = "fixed";
  btn.style.bottom = "25px";
  btn.style.right = "25px";
  btn.style.padding = "12px 16px";
  btn.style.borderRadius = "12px";
  btn.style.border = "none";
  btn.style.cursor = "pointer";
  btn.style.background = "rgba(255,255,255,0.12)";
  btn.style.color = "white";
  btn.style.backdropFilter = "blur(10px)";
  btn.style.display = "none";
  btn.style.zIndex = "999";

  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });

});

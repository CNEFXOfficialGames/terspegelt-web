document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ✨ FADE IN TIMELINE ITEMS
  // =========================
  const items = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.2
  });

  items.forEach(item => {
    observer.observe(item);
  });

  // =========================
  // 🔵 DOT HIGHLIGHT ON SCROLL
  // =========================
  const dots = document.querySelectorAll(".dot");

  window.addEventListener("scroll", () => {
    items.forEach((item, i) => {
      const rect = item.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.6 && rect.bottom > 0) {
        dots[i].style.transform = "translateX(-50%) scale(1.2)";
        dots[i].style.boxShadow = "0 0 20px rgba(255,255,255,0.3)";
      } else {
        dots[i].style.transform = "translateX(-50%) scale(1)";
        dots[i].style.boxShadow = "none";
      }
    });
  });

  // =========================
  // ⬆️ BACK TO TOP BUTTON
  // =========================
  const btn = document.createElement("button");
  btn.innerText = "⬆️ Naar boven";

  Object.assign(btn.style, {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "rgba(255,255,255,0.12)",
    color: "white",
    backdropFilter: "blur(10px)",
    display: "none",
    zIndex: "999"
  });

  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  });

});

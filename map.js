function startMap() {
  const intro = document.getElementById("intro");
  const mapSection = document.getElementById("mapSection");

  // safety check (prevents errors if elements missing)
  if (!intro || !mapSection) return;

  // fade out intro smoothly
  intro.classList.add("fade-out");

  // wait for animation, then switch views
  setTimeout(() => {
    intro.style.display = "none";
    mapSection.classList.add("show");
  }, 400);
}

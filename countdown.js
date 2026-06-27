const targetDate = new Date("2026-07-03T15:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("dagen").innerText = 0;
    document.getElementById("uren").innerText = 0;
    document.getElementById("minuten").innerText = 0;
    document.getElementById("seconden").innerText = 0;
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);

  const dagen = Math.floor(totalSeconds / (60 * 60 * 24));
  const uren = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minuten = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconden = totalSeconds % 60;

  document.getElementById("dagen").innerText = dagen;
  document.getElementById("uren").innerText = uren;
  document.getElementById("minuten").innerText = minuten;
  document.getElementById("seconden").innerText = seconden;
}

updateCountdown();
setInterval(updateCountdown, 1000);

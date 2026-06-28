// 🌍 LOCATION (TerSpegelt area approx)
const lat = 51.37;
const lon = 5.25;

// 🌐 API
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,weathercode,precipitation_probability_max,windspeed_10m_max&timezone=auto`;

// ☀️ WEATHER TEXT
function getWeatherText(code) {
  if (code === 0) return "Helder ☀️";
  if (code <= 3) return "Gedeeltelijk bewolkt ⛅";
  if (code <= 48) return "Mistig 🌫️";
  if (code <= 67) return "Regenachtig 🌧️";
  if (code <= 77) return "Sneeuw ❄️";
  if (code <= 82) return "Buien 🌦️";
  return "Onweer ⛈️";
}

// 🌧️ FORMAT
function rainText(value) {
  return `${Math.round(value)}% kans op regen 🌧️`;
}

// 🔥 ACTIVITY SCORES
function calcScores(temp, rain, wind) {

  let swim = 0;
  if (temp >= 28) swim += 10;
  else if (temp >= 24) swim += 8;
  else if (temp >= 20) swim += 6;
  else swim += 2;

  swim -= rain / 10;
  swim -= wind / 15;
  swim = Math.max(0, Math.min(10, Math.round(swim)));

  let outside = 10;
  outside -= rain / 10;
  outside -= wind / 20;
  if (temp < 15) outside -= 3;
  outside = Math.max(0, Math.min(10, Math.round(outside)));

  let indoor = 10 - outside;
  indoor = Math.max(0, Math.min(10, indoor));

  return { swim, outside, indoor };
}

// 🧠 VIBE SYSTEM
function getVibe(score) {
  if (score >= 8) return "🔥 Perfecte dag!";
  if (score >= 6) return "😊 Goede dag";
  if (score >= 4) return "😐 Prima dag";
  return "🌧️ Niet ideaal vandaag";
}

// 🚀 FETCH WEATHER
fetch(url)
  .then(res => res.json())
  .then(data => {

    const days = data.daily.time;
    const temps = data.daily.temperature_2m_max;
    const rain = data.daily.precipitation_probability_max;
    const codes = data.daily.weathercode;
    const wind = data.daily.windspeed_10m_max;

    // ======================
    // 🌤️ TODAY
    // ======================
    const tTemp = Math.round(temps[0]);
    const tRain = rain[0];
    const tWind = wind[0];
    const tCode = codes[0];

    const scores = calcScores(tTemp, tRain, tWind);
    const vibeScore = Math.round((scores.swim + scores.outside) / 2);

    document.getElementById("temp").innerText = `${tTemp}°C`;

    document.getElementById("weatherInfo").innerText =
      `${getWeatherText(tCode)} — ${rainText(tRain)} — 💨 ${Math.round(tWind)} km/h wind`;

    document.getElementById("activityAdvice").innerText =
`🏊 Zwemmen: ${scores.swim}/10
⚽ Buiten: ${scores.outside}/10
🏠 Binnen: ${scores.indoor}/10
🔥 Vibe: ${getVibe(vibeScore)}`;

    // ======================
    // 📅 BEST DAY FINDER
    // ======================
    let bestDayIndex = 0;
    let bestScore = -1;

    for (let i = 0; i < 7; i++) {
      const s = calcScores(temps[i], rain[i], wind[i]);
      const score = s.swim + s.outside;

      if (score > bestScore) {
        bestScore = score;
        bestDayIndex = i;
      }
    }

    // ======================
    // 📅 FORECAST
    // ======================
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    for (let i = 0; i < 7; i++) {

      const date = new Date(days[i]);
      const weekday = date.toLocaleDateString("nl-NL", { weekday: "short" });
      const day = date.getDate();
      const month = date.toLocaleDateString("nl-NL", { month: "long" });

      const s = calcScores(temps[i], rain[i], wind[i]);
      const isBest = i === bestDayIndex;

      const el = document.createElement("div");
      el.className = "day";

      el.innerHTML = `
        <div>${weekday}. ${day} ${month}</div>
        <div>${getWeatherText(codes[i])}</div>
        <div class="day-temp">${Math.round(temps[i])}°C</div>
        <div>${rainText(rain[i])}</div>
        <div style="font-size:0.8rem; opacity:0.85; margin-top:6px;">
          🏊 ${s.swim}/10 ⚽ ${s.outside}/10
        </div>
        ${isBest ? `<div style="margin-top:6px; font-weight:700;">🏆 BESTE DAG</div>` : ""}
      `;

      forecastDiv.appendChild(el);
    }

  })
  .catch(err => {
    console.error("Weather error:", err);
    document.getElementById("weatherInfo").innerText =
      "Kon weerdata niet laden 😢";
  });

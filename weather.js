// 🌍 LOCATION (TerSpegelt area approx)
const lat = 51.37;
const lon = 5.25;

// 🌐 API URL (Open-Meteo)
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,weathercode,precipitation_probability_max&timezone=auto`;

// ☀️ WEATHER CODE TRANSLATOR
function getWeatherText(code) {
  if (code === 0) return "Helder ☀️";
  if (code <= 3) return "Gedeeltelijk bewolkt ⛅";
  if (code <= 48) return "Mistig 🌫️";
  if (code <= 67) return "Regenachtig 🌧️";
  if (code <= 77) return "Sneeuw ❄️";
  if (code <= 82) return "Buien 🌦️";
  return "Onweer ⛈️";
}

// 🏊 / ⚽ ACTIVITY ENGINE (YOUR IDEA 🔥)
function getActivityAdvice(temp, rain, wind) {

  if (rain > 70 || wind > 40) {
    return "🌧️ Beter binnen blijven vandaag (spelletjes / chillen / indoor zwemmen)";
  }

  if (temp >= 24 && rain < 30 && wind < 25) {
    return "☀️ Perfect om buiten te spelen én te zwemmen!";
  }

  if (temp >= 20 && rain < 40) {
    return "⚽ Goed weer om buiten te spelen / wandelen / chillen";
  }

  if (rain < 20) {
    return "🏊 Goed zwemweer en prima buiten om te spelen";
  }

  return "🏠 Binnen is ook een goede optie vandaag";
}

// 🌧️ RAIN TEXT FORMAT
function rainText(value) {
  return `${value}% kans op regen 🌧️`;
}

// 🚀 FETCH WEATHER
fetch(url)
  .then(res => res.json())
  .then(data => {

    const days = data.daily.time;
    const temps = data.daily.temperature_2m_max;
    const rain = data.daily.precipitation_probability_max;
    const codes = data.daily.weathercode;

    // =========================
    // 🌤️ TODAY (DAY 0)
    // =========================
    const todayTemp = temps[0];
    const todayRain = rain[0];
    const todayCode = codes[0];

    document.getElementById("temp").innerText = `${todayTemp}°C`;

    document.getElementById("weatherInfo").innerText =
      `${getWeatherText(todayCode)} • ${rainText(todayRain)}`;

    document.getElementById("activityAdvice").innerText =
      getActivityAdvice(todayTemp, todayRain, 20);

    // =========================
    // 📅 7 DAY FORECAST
    // =========================
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    for (let i = 0; i < 7; i++) {

      const date = new Date(days[i]);
      const dayName = date.toLocaleDateString("nl-NL", { weekday: "short" });

      const el = document.createElement("div");
      el.className = "day";

      el.innerHTML = `
        <div>${dayName}</div>
        <div>${getWeatherText(codes[i])}</div>
        <div class="day-temp">${temps[i]}°C</div>
        <div style="font-size:0.8rem; opacity:0.8;">
          ${rainText(rain[i])}
        </div>
      `;

      forecastDiv.appendChild(el);
    }

  })
  .catch(err => {
    console.error("Weather error:", err);

    document.getElementById("weatherInfo").innerText =
      "Kon weerdata niet laden 😢";
  });

// =========================
// 🕒 OPENINGSTIJDEN DATA
// =========================

const openingData = {
  juni: {
    receptie: {
      name: "☎️ Receptie",
      schedule: [
        { days: "Ma - Zo", open: "09:00", close: "18:00" }
      ]
    },

    zwembad: {
      name: "🏊 Zwembad & SterrenStrand",
      schedule: [
        { days: "Ma - Do", open: "10:00", close: "18:00" },
        { days: "Vr - Zo", open: "10:00", close: "20:00" }
      ],
      exception: "24-27 juni: 10:00 - 15:00 (hitte)"
    },

    bowling: {
      name: "🎳 Bowling",
      schedule: [
        { days: "Ma - Zo", open: "13:00", close: "21:00" }
      ]
    },

    supermarkt: {
      name: "🏪 Supermarkt",
      schedule: [
        { days: "Ma - Do", open: "08:00", close: "18:00" },
        { days: "Vrij", open: "08:00", close: "19:00" },
        { days: "Za", open: "08:00", close: "18:00" },
        { days: "Zo", open: "08:00", close: "17:00" }
      ]
    },

    wijdeBlick: {
      name: "🍽️ De Wijde Blick",
      schedule: [
        { days: "Ma - Do", open: "12:00", close: "20:30" },
        { days: "Vrij - Za", open: "12:00", close: "21:00" },
        { days: "Zo", open: "12:00", close: "20:30" }
      ]
    },

    keukenBlick: {
      name: "🍳 Keuken De Wijde Blick",
      schedule: [
        { days: "Ma - Do", open: "12:00", close: "20:00" },
        { days: "Vrij - Za", open: "12:00", close: "20:30" },
        { days: "Zo", open: "12:00", close: "20:00" }
      ]
    },

    keizer: {
      name: "🍔 De Keizer",
      schedule: [
        { days: "Wo - Do", open: "11:00", close: "22:00" },
        { days: "Vrij - Za", open: "11:00", close: "23:00" },
        { days: "Zo", open: "11:00", close: "22:00" }
      ],
      closedDays: "Ma & Di"
    },

    pizza: {
      name: "🍕 LekkerMakkelijk Pizza",
      schedule: [
        { days: "Ma - Do", open: "12:00", close: "20:00" },
        { days: "Vrij - Za", open: "12:00", close: "20:30" },
        { days: "Zo", open: "12:00", close: "20:00" }
      ]
    },

    ijs: {
      name: "🍦 LekkerMakkelijk IJs",
      schedule: [
        { days: "Ma - Zo", open: "12:00", close: "20:30" }
      ]
    },

    snacken: {
      name: "🍟 LekkerSnacken",
      schedule: [
        { days: "Vrij", open: "16:00", close: "21:00" },
        { days: "Za - Zo", open: "12:00", close: "20:30" }
      ]
    }
  },

  juli: {
    receptie: {
      name: "☎️ Receptie",
      schedule: [
        { days: "Ma - Zo", open: "09:00", close: "20:00" }
      ]
    },

    zwembad: {
      name: "🏊 Zwembad & SterrenStrand",
      schedule: [
        { days: "Ma - Zo", open: "10:00", close: "20:00" }
      ]
    },

    supermarkt: {
      name: "🏪 Supermarkt",
      schedule: [
        { days: "Ma - Zo", open: "08:00", close: "19:00" }
      ]
    },

    wijdeBlick: {
      name: "🍽️ De Wijde Blick",
      schedule: [
        { days: "Ma - Zo", open: "11:00", close: "21:30" }
      ]
    },

    keukenBlick: {
      name: "🍳 Keuken De Wijde Blick",
      schedule: [
        { days: "Ma - Zo", open: "12:00", close: "20:30" }
      ]
    },

    keizer: {
      name: "🍔 De Keizer",
      schedule: [
        { days: "Wo - Zo", open: "11:00", close: "23:00" }
      ],
      closedDays: "Ma & Di"
    },

    pizza: {
      name: "🍕 LekkerMakkelijk Pizza",
      schedule: [
        { days: "Ma - Zo", open: "12:00", close: "20:30" }
      ]
    },

    ijs: {
      name: "🍦 LekkerMakkelijk IJs",
      schedule: [
        { days: "Ma - Zo", open: "12:00", close: "20:30" }
      ]
    }
  }
};

// =========================
// ⏰ TIME HELPERS
// =========================

function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function getCurrentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

// =========================
// 🟢 LIVE STATUS CHECK
// =========================

function isOpenNow(open, close) {
  const now = getCurrentMinutes();
  return now >= timeToMinutes(open) && now <= timeToMinutes(close);
}

// =========================
// 📅 GET SELECTED MONTH
// =========================

let currentMonth = "juni";

// =========================
// PART 2 STARTS BELOW
// =========================
// =========================
// 🟦 FACILITY LIST (ORDER)
// =========================

const facilitiesOrder = [
  "receptie",
  "zwembad",
  "supermarkt",
  "wijdeBlick",
  "keukenBlick",
  "keizer",
  "bowling",
  "pizza",
  "ijs",
  "snacken"
];

// =========================
// 📍 RENDER "VANDAAG" CARDS
// =========================

function renderToday() {
  const grid = document.getElementById("todayGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const data = openingData[currentMonth];

  facilitiesOrder.forEach(key => {
    const facility = data[key];
    if (!facility) return;

    let openNow = false;

    // check first matching schedule rule
    if (facility.schedule && facility.schedule.length > 0) {
      const rule = facility.schedule[0];
      openNow = isOpenNow(rule.open, rule.close);
    }

    const card = document.createElement("div");
    card.className = "mini-card " + (openNow ? "open" : "closed");

    card.innerHTML = `
      <div class="status">
        ${openNow ? "🟢 NU GEOPEND" : "🔴 NU GESLOTEN"}
      </div>
      <div class="name">${facility.name}</div>
      <div class="hours">
        ${facility.schedule?.map(s => `${s.days}: ${s.open} - ${s.close}`).join("<br>") || ""}
      </div>
    `;

    grid.appendChild(card);
  });
}

// =========================
// 📅 RENDER 7 DAY GRID
// =========================

function renderWeek() {
  const grid = document.getElementById("weekGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const days = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

  days.forEach(day => {
    const card = document.createElement("div");
    card.className = "week-card";

    card.innerHTML = `
      <div class="day">${day}</div>
      <div class="hint">Klik om details te zien</div>
    `;

    card.addEventListener("click", () => {
      renderDayDetails(day);
    });

    grid.appendChild(card);
  });
}

// =========================
// 📆 RENDER DAY DETAILS
// =========================

function renderDayDetails(day) {
  const title = document.getElementById("selectedDay");
  const grid = document.getElementById("detailsGrid");

  if (!grid || !title) return;

  title.textContent = day;

  const data = openingData[currentMonth];
  grid.innerHTML = "";

  facilitiesOrder.forEach(key => {
    const facility = data[key];
    if (!facility) return;

    let match = facility.schedule?.find(s => s.days.includes(day));

    const card = document.createElement("div");
    card.className = "card";

    if (match) {
      const openNow = isOpenNow(match.open, match.close);

      card.innerHTML = `
        <h3>${facility.name}</h3>
        <p>${openNow ? "🟢 NU GEOPEND" : "🔴 NU GESLOTEN"}</p>
        <p>${match.open} - ${match.close}</p>
      `;
    } else {
      card.innerHTML = `
        <h3>${facility.name}</h3>
        <p>Niet geopend op ${day}</p>
      `;
    }

    grid.appendChild(card);
  });
}

// =========================
// 📅 MONTH SWITCH
// =========================

function setupMonthSwitch() {
  const buttons = document.querySelectorAll(".month");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      currentMonth = btn.dataset.month;

      renderToday();
      renderWeek();
      clearDetails();
    });
  });
}

// =========================
// 🧹 CLEAR DETAILS
// =========================

function clearDetails() {
  const grid = document.getElementById("detailsGrid");
  const title = document.getElementById("selectedDay");

  if (grid) grid.innerHTML = "";
  if (title) title.textContent = "Selecteer een dag";
}

// =========================
// 🚀 INIT
// =========================

document.addEventListener("DOMContentLoaded", () => {
  setupMonthSwitch();
  renderToday();
  renderWeek();
  clearDetails();

  // auto refresh every hour
  setInterval(() => {
    renderToday();
    renderWeek();
  }, 3600000);
});

// =========================
// PART 3 STARTS BELOW
// =========================

// =========================
// 🧠 BETTER OPEN LOGIC (FIXED)
// =========================

// fixes issue where only first schedule rule was used
function isOpenNowAdvanced(scheduleArray) {
  const now = getCurrentMinutes();

  if (!scheduleArray) return false;

  return scheduleArray.some(rule => {
    const open = timeToMinutes(rule.open);
    const close = timeToMinutes(rule.close);
    return now >= open && now <= close;
  });
}

// =========================
// 🟦 UPDATE TODAY (FIXED VERSION)
// =========================

function renderToday() {
  const grid = document.getElementById("todayGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const data = openingData[currentMonth];

  facilitiesOrder.forEach(key => {
    const facility = data[key];
    if (!facility) return;

    const openNow = isOpenNowAdvanced(facility.schedule);

    const card = document.createElement("div");
    card.className = "mini-card " + (openNow ? "open" : "closed");

    let scheduleText = "";

    if (facility.schedule) {
      scheduleText = facility.schedule
        .map(s => `${s.days}: ${s.open} - ${s.close}`)
        .join("<br>");
    }

    card.innerHTML = `
      <div class="status">
        ${openNow ? "🟢 NU GEOPEND" : "🔴 NU GESLOTEN"}
      </div>

      <div class="name">
        ${facility.name}
      </div>

      <div class="hours">
        ${scheduleText}
      </div>
    `;

    grid.appendChild(card);
  });
}

// =========================
// 📅 HIGHLIGHT TODAY IN WEEK
// =========================

function getTodayShort() {
  const days = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
  return days[new Date().getDay()];
}

function renderWeek() {
  const grid = document.getElementById("weekGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const days = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
  const today = getTodayShort();

  days.forEach(day => {
    const card = document.createElement("div");

    let isToday = day === today;

    card.className = "week-card" + (isToday ? " today" : "");

    card.innerHTML = `
      <div class="day">${day}</div>
      <div class="hint">${isToday ? "Vandaag" : "Klik voor details"}</div>
    `;

    card.addEventListener("click", () => {
      renderDayDetails(day);
    });

    grid.appendChild(card);
  });
}

// =========================
// 📆 IMPROVED DAY DETAILS
// =========================

function renderDayDetails(day) {
  const title = document.getElementById("selectedDay");
  const grid = document.getElementById("detailsGrid");

  if (!grid || !title) return;

  title.textContent = `📅 ${day}`;

  const data = openingData[currentMonth];
  grid.innerHTML = "";

  facilitiesOrder.forEach(key => {
    const facility = data[key];
    if (!facility) return;

    const match = facility.schedule?.find(s => s.days.includes(day));

    const card = document.createElement("div");
    card.className = "card";

    if (match) {
      const openNow = isOpenNow(match.open, match.close);

      card.innerHTML = `
        <h3>${facility.name}</h3>

        <p>
          ${openNow ? "🟢 Nu geopend" : "🔴 Gesloten"}
        </p>

        <p class="hours">
          Vandaag: ${match.open} - ${match.close}
        </p>
      `;
    } else {
      card.innerHTML = `
        <h3>${facility.name}</h3>
        <p>Niet geopend op deze dag</p>
      `;
    }

    grid.appendChild(card);
  });
}

// =========================
// 🔄 SAFETY RE-INIT FIX
// =========================

function refreshAll() {
  renderToday();
  renderWeek();
  clearDetails();
}

// =========================
// 🚀 FINAL INIT
// =========================

document.addEventListener("DOMContentLoaded", () => {
  setupMonthSwitch();

  renderToday();
  renderWeek();
  clearDetails();

  // hourly refresh (keeps "Nu geopend" correct)
  setInterval(() => {
    renderToday();
  }, 3600000);
});

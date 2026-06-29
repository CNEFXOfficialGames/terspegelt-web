
// =========================
// 🧠 WEEK SYSTEM (FIXED RANGE LOGIC)
// =========================

const week = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

function expandDays(range) {
  if (!range) return [];

  range = range.trim();

  // single day fixes
  if (!range.includes("-")) {
    if (range === "Vrij") return ["Vr"];
    if (range === "Zaterdag") return ["Za"];
    if (range === "Zondag") return ["Zo"];
    return [range];
  }

  const [start, end] = range.split("-").map(s => s.trim());

  const startIndex = week.indexOf(start);
  const endIndex = week.indexOf(end);

  if (startIndex === -1 || endIndex === -1) return [];

  const result = [];

  for (let i = startIndex; i <= endIndex; i++) {
    result.push(week[i]);
  }

  return result;
}

// =========================
// 🕒 OPENINGSTIJDEN DATA
// =========================

const openingData = {
  juni: {
    receptie: {
      name: "☎️ Receptie",
      schedule: [{ days: "Ma - Zo", open: "09:00", close: "18:00" }]
    },

    zwembad: {
      name: "🏊 Zwembad & SterrenStrand",
      schedule: [
        { days: "Ma - Do", open: "10:00", close: "18:00" },
        { days: "Vr - Zo", open: "10:00", close: "20:00" }
      ]
    },

    bowling: {
      name: "🎳 Bowling",
      schedule: [{ days: "Ma - Zo", open: "13:00", close: "21:00" }]
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
      ]
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
      schedule: [{ days: "Ma - Zo", open: "12:00", close: "20:30" }]
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
      schedule: [{ days: "Ma - Zo", open: "09:00", close: "20:00" }]
    },

    zwembad: {
      name: "🏊 Zwembad & SterrenStrand",
      schedule: [{ days: "Ma - Zo", open: "10:00", close: "20:00" }]
    },

    supermarkt: {
      name: "🏪 Supermarkt",
      schedule: [{ days: "Ma - Zo", open: "08:00", close: "19:00" }]
    },

    wijdeBlick: {
      name: "🍽️ De Wijde Blick",
      schedule: [{ days: "Ma - Zo", open: "11:00", close: "21:30" }]
    },

    keukenBlick: {
      name: "🍳 Keuken De Wijde Blick",
      schedule: [{ days: "Ma - Zo", open: "12:00", close: "20:30" }]
    },

    keizer: {
      name: "🍔 De Keizer",
      schedule: [{ days: "Wo - Zo", open: "11:00", close: "23:00" }]
    },

    pizza: {
      name: "🍕 LekkerMakkelijk Pizza",
      schedule: [{ days: "Ma - Zo", open: "12:00", close: "20:30" }]
    },

    ijs: {
      name: "🍦 LekkerMakkelijk IJs",
      schedule: [{ days: "Ma - Zo", open: "12:00", close: "20:30" }]
    }
  }
};

// =========================
// ⏰ TIME HELPERS
// =========================

function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function nowMinutes() {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
}

function isOpen(open, close) {
  const now = nowMinutes();
  return now >= timeToMinutes(open) && now <= timeToMinutes(close);
}

function isOpenAdvanced(schedule) {
  if (!schedule) return false;

  return schedule.some(s => isOpen(s.open, s.close));
}

// =========================
// 🌍 STATE
// =========================

let currentMonth = "juni";

// =========================
// 🧩 FACILITY ORDER
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
// 🟢 TODAY CARDS
// =========================

function renderToday() {
  const grid = document.getElementById("todayGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const data = openingData[currentMonth];

  facilitiesOrder.forEach(key => {
    const f = data[key];
    if (!f) return;

    const openNow = isOpenAdvanced(f.schedule);

    const scheduleText = f.schedule
      .map(s => `${s.days}: ${s.open} - ${s.close}`)
      .join("<br>");

    const card = document.createElement("div");
    card.className = "mini-card " + (openNow ? "open" : "closed");

    card.innerHTML = `
      <div class="status">
        ${openNow ? "🟢 GEOPEND" : "🔴 GESLOTEN"}
      </div>
      <div class="name">${f.name}</div>
      <div class="hours">${scheduleText}</div>
    `;

    grid.appendChild(card);
  });
}

// =========================
// 📅 WEEK VIEW
// =========================

function renderWeek() {
  const grid = document.getElementById("weekGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const days = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
  const today = days[new Date().getDay() - 1] || "Ma";

  days.forEach(d => {
    const card = document.createElement("div");

    const isToday = d === today;

    card.className = "week-card" + (isToday ? " today" : "");

    card.innerHTML = `
      <div class="day">${d}</div>
      <div class="hint">${isToday ? "Vandaag" : "Klik voor details"}</div>
    `;

    card.onclick = () => renderDayDetails(d);

    grid.appendChild(card);
  });
}

// =========================
// 📆 DAY DETAILS
// =========================

function renderDayDetails(day) {
  const title = document.getElementById("selectedDay");
  const grid = document.getElementById("detailsGrid");

  if (!grid || !title) return;

  title.textContent = `📅 ${day}`;

  const data = openingData[currentMonth];

  grid.innerHTML = "";

  facilitiesOrder.forEach(key => {
    const f = data[key];
    if (!f) return;

    const match = f.schedule.find(s =>
      expandDays(s.days).includes(day)
    );

    const card = document.createElement("div");
    card.className = "card";

    if (match) {
      card.innerHTML = `
        <h3>${f.name}</h3>
        <p>${match.open} - ${match.close}</p>
      `;
    } else {
      card.innerHTML = `
        <h3>${f.name}</h3>
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
    btn.onclick = () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      currentMonth = btn.dataset.month || "juni";

      renderToday();
      renderWeek();
    };
  });
}

// =========================
// 🚀 INIT
// =========================

document.addEventListener("DOMContentLoaded", () => {
  setupMonthSwitch();
  renderToday();
  renderWeek();

  setInterval(renderToday, 3600000);
});

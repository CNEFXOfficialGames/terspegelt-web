// =========================
// 🧠 OPENINGSTIJDEN DATA
// =========================

const data = {
  juni: {
    zwembad: {
      name: "🏊 Zwembad & SterrenStrand",
      schedule: {
        mon: [10, 18],
        tue: [10, 18],
        wed: [10, 18],
        thu: [10, 18],
        fri: [10, 20],
        sat: [10, 20],
        sun: [10, 20],
      }
    },

    supermarkt: {
      name: "🏪 Supermarkt",
      schedule: {
        mon: [8, 18],
        tue: [8, 18],
        wed: [8, 18],
        thu: [8, 18],
        fri: [8, 19],
        sat: [8, 18],
        sun: [8, 17],
      }
    },

    bowling: {
      name: "🎳 Bowling",
      schedule: {
        mon: [13, 21],
        tue: [13, 21],
        wed: [13, 21],
        thu: [13, 21],
        fri: [13, 21],
        sat: [13, 21],
        sun: [13, 21],
      }
    },

    receptie: {
      name: "☎️ Receptie",
      schedule: {
        mon: [9, 18],
        tue: [9, 18],
        wed: [9, 18],
        thu: [9, 18],
        fri: [9, 18],
        sat: [9, 18],
        sun: [9, 18],
      }
    }
  },

  juli: {
    zwembad: {
      name: "🏊 Zwembad & SterrenStrand",
      schedule: {
        mon: [10, 20],
        tue: [10, 20],
        wed: [10, 20],
        thu: [10, 20],
        fri: [10, 20],
        sat: [10, 20],
        sun: [10, 20],
      }
    },

    supermarkt: {
      name: "🏪 Supermarkt",
      schedule: {
        mon: [8, 19],
        tue: [8, 19],
        wed: [8, 19],
        thu: [8, 19],
        fri: [8, 19],
        sat: [8, 19],
        sun: [8, 19],
      }
    },

    bowling: {
      name: "🎳 Bowling",
      schedule: {
        mon: [13, 21],
        tue: [13, 21],
        wed: [13, 21],
        thu: [13, 21],
        fri: [13, 21],
        sat: [13, 21],
        sun: [13, 21],
      }
    },

    receptie: {
      name: "☎️ Receptie",
      schedule: {
        mon: [9, 20],
        tue: [9, 20],
        wed: [9, 20],
        thu: [9, 20],
        fri: [9, 20],
        sat: [9, 20],
        sun: [9, 20],
      }
    }
  }
};

// =========================
// ⏰ TIME HELPERS
// =========================

function getDayKey(date = new Date()) {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[date.getDay()];
}

function getHour(date = new Date()) {
  return date.getHours();
}

// =========================
// 🟢 STATUS CHECK
// =========================

function isOpen(schedule, now = new Date()) {
  const day = getDayKey(now);
  const hour = getHour(now);

  const today = schedule[day];

  if (!today) return false;

  const [open, close] = today;

  return hour >= open && hour < close;
}

// =========================
// 🧩 BUILD TODAY CARDS
// =========================

function buildToday(monthKey = "juni") {
  const container = document.querySelector(".mini-grid");
  if (!container) return;

  container.innerHTML = "";

  const places = data[monthKey];

  Object.values(places).forEach(place => {
    const open = isOpen(place.schedule);

    const card = document.createElement("div");
    card.className = `mini-card ${open ? "open" : "closed"}`;

    const now = new Date();
    const day = getDayKey(now);
    const todaySchedule = place.schedule[day];

    let text = "";

    if (open) {
      text = `🟢 open tot ${todaySchedule[1]}:00`;
    } else {
      text = `🔴 gesloten`;
    }

    card.innerHTML = `
      <strong>${place.name}</strong><br>
      <small>${text}</small>
    `;

    container.appendChild(card);
  });
}

// =========================
// 📅 MONTH SWITCH
// =========================

let currentMonth = "juni";

function switchMonth(month) {
  currentMonth = month;
  buildToday(month);
}

// =========================
// 🔄 AUTO UPDATE (EVERY 1H)
// =========================

function startAutoUpdate() {
  buildToday(currentMonth);

  setInterval(() => {
    buildToday(currentMonth);
  }, 60 * 60 * 1000);
}

// =========================
// 🚀 INIT
// =========================

document.addEventListener("DOMContentLoaded", () => {
  startAutoUpdate();

  // optional: hook buttons if you add them
  document.querySelectorAll(".month").forEach(btn => {
    btn.addEventListener("click", () => {
      const month = btn.textContent.includes("Juli") ? "juli" : "juni";
      switchMonth(month);
    });
  });
});
